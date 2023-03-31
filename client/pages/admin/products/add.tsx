import axios, { AxiosError } from 'axios';
import Layout from '@/components/admin/layout';
import Head from 'next/head';
import EditForm from '@/components/admin/editForm/editForm';
import { useState } from 'react';
import Alert from '@/components/alert/alert';
import { AlertType } from '@/interfaces/alert/alert';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import { createProductDto } from '@/interfaces/product/createProductDto';
import { useRouter } from 'next/navigation';
import { VariableTypes } from '@/interfaces/variableTypes/variableTypes';
import { Tab } from '@/interfaces/tab/tab';
import { useMounted } from '@/hooks/useMounted';
import Select from 'react-select';
import { theme } from '@/components/inputs/react-select/theme';
import { createOptionsFromArray } from '@/modules/categories/category';
import { Category } from '@/interfaces/category/category';

export default function ProductsAdd({ data }: { data: { categories: Category[] } }) {
    const { categories } = data;
    const [resultAlert, setResultAlert] = useState<AlertType>();
    const router = useRouter();
    const hasMounted = useMounted();

    const [formData, setformData] = useState<createProductDto>({
        name: '',
        active: true,
        path: '',
        h1: '',
        title: '',
        description: '',
        keywords: '',
        categoriesIds: null,
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {        
        setformData({
          ...formData,
          [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const res = await axios.post(`/api/products/`, formData, {withCredentials: true});
            
            if (res.status >= 200 && res.status < 300) {
                router.push(`/admin/products/${res.data.id}`);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                const { response } = error;
            
                setResultAlert({
                    title: 'Error',
                    text: response?.data.message,
                    severity: 'error',
                });
            }            
        }
    };

    const categoriesForSelect = createOptionsFromArray(categories);
    const categoriesSelect = hasMounted ? <Select  
        name="categoriesIds" 
        placeholder='Родительская категория' 
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
    ></Select> : <></>;

    const tabs:Tab<createProductDto>[] = [
        {
            title: 'Основные',
            items: [
                { name: 'active', title:'Активность', type: VariableTypes.CHECKBOX },
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
                <title>{'Административная панель: Создание товара'}</title>
                <meta name="description" content={"Административная панель: Создание товара"} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>{'Создание товара'}</h1>
            <Breadcrumbs></Breadcrumbs>
            { resultAlert ? <div className='mt-3'><Alert severity={resultAlert.severity} title={resultAlert.title}>{resultAlert.text}</Alert></div>  : ''}
            <div className='border mt-3 border-solid border-[#d8d8d8] rounded'>
                <EditForm onSubmit={handleSubmit} tabs={tabs} formData={formData} onChange={handleChange} />
            </div>
        </Layout>
    );
}

export async function getServerSideProps() {
    const res = await axios.get(`http://localhost:3001/categories/all`, {withCredentials: true});
    const data = { categories: res.data };
    
    return { props: { data } };
}