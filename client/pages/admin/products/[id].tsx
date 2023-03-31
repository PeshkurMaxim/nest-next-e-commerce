import axios, { AxiosError } from 'axios';
import Layout from '@/components/admin/layout';
import { Product } from '@/interfaces/product/product';
import Head from 'next/head';
import EditForm from '@/components/admin/editForm/editForm';
import { useState } from 'react';
import Alert from '@/components/alert/alert';
import { AlertType } from '@/interfaces/alert/alert';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import { Tab } from '@/interfaces/tab/tab';
import { VariableTypes } from '@/interfaces/variableTypes/variableTypes';
import { Category } from '@/interfaces/category/category';
import { useMounted } from '@/hooks/useMounted';
import { createOptionsFromArray } from '@/modules/categories/category';
import Select from 'react-select';
import { theme } from '@/components/inputs/react-select/theme';

export default function Products({ data }: { data: { product: Product, categories: Category[]}}) {
    const { product, categories } = data;
    const [formData, setformData] = useState(product);
    const [resultAlert, setResultAlert] = useState<AlertType>();
    const hasMounted = useMounted();
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {                        
        setformData({
          ...formData,
          [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const res = await axios.patch(`/api/products/${product.id}`, formData, {withCredentials: true});

            if (res.status >= 200 && res.status < 300) {
                setResultAlert({
                    title: 'Success',
                    text: res.statusText,
                    severity: 'success',
                });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setResultAlert({
                    title: 'Error',
                    text: error?.message,
                    severity: 'error',
                });
            }
        }
    };

    const categoriesForSelect = createOptionsFromArray(categories);
    const categoriesSelect = hasMounted ? <Select  
        name="categoriesIds" 
        placeholder='Категории' 
        className='w-[46rem] text-sm' 
        isSearchable 
        isClearable
        isMulti
        options={categoriesForSelect}
        closeMenuOnSelect={false}
        theme={theme}
        onChange={(newValue) =>             
            setformData({
                ...formData,
                ['categoriesIds']: newValue.map(val => val.value),
            })
        }
        value={ categoriesForSelect.filter(category => formData.categoriesIds?.includes(category.value) ) }
    ></Select> : <></>;

    const tabs:Tab<Product>[] = [
        {
            title: 'Основные',
            items: [
                { name: 'id', title:'ID', type: VariableTypes.READONLY },
                { name: 'active', title:'Активность', type: VariableTypes.CHECKBOX },
                { name: 'created_at', title:'Дата создания', type: VariableTypes.READONLYDATETIME },
                { name: 'updated_at', title:'Дата обновления', type: VariableTypes.READONLYDATETIME },
                { name: 'name', title: 'Название', type: VariableTypes.STRING},
            ],
        },
        {
            title: 'Связи',
            items: [
                { name: 'categoriesIds', title: 'Категория', type: VariableTypes.CUSTOM, component: categoriesSelect},
            ],
        },
        {
            title: 'SEO',
            items: [
                { name: 'path', title: 'url', type: VariableTypes.STRING},
                { name: 'h1', title: 'h1', type: VariableTypes.EDITOR},
                { name: 'title', title: 'title', type: VariableTypes.EDITOR},
                { name: 'description', title: 'description', type: VariableTypes.EDITOR},
            ],
        }
    ];

    return (
        <Layout>
            <Head>
                <title>{'Административная панель: Редактирование ' + product.name}</title>
                <meta name="description" content={"Административная панель: Редактирование " + product.name} />
            </Head>
            <h1>{'Редактирование ' + product.name}</h1>
            <Breadcrumbs></Breadcrumbs>
            { resultAlert ? <div className='mt-3'><Alert severity={resultAlert.severity} title={resultAlert.title}>{resultAlert.text}</Alert></div>  : ''}
            <div className='border mt-3 border-solid border-[#d8d8d8] rounded'>
                <EditForm onSubmit={handleSubmit} tabs={tabs} formData={formData} onChange={handleChange} />
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ params } : { params: { id: number } }) {
    const id = params.id;
    const data = {
        product: {},
        categories: [], 
    };    

    const product = axios.get(`http://localhost:3001/products/${id}`, {withCredentials: true});
    const categories = axios.get(`http://localhost:3001/categories/all`, {withCredentials: true});

    try {
        const values = await Promise.all([product, categories]);
        data['product'] = values[0].data;
        data['categories'] = values[1].data;
    } catch (error) {
        if (error instanceof AxiosError) {
            const { response } = error;
            console.log(response?.data.message);
        }            
    }

    return { props: { data } };
}
  