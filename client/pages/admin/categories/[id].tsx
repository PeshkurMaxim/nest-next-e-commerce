import axios, { AxiosError, AxiosResponse } from "axios";
import Layout from "@/components/admin/layout";
import Head from "next/head";
import EditForm from "@/components/admin/editForm/editForm";
import { useState } from "react";
import Alert from "@/components/alert/alert";
import { AlertType } from "@/interfaces/alert/alert";
import Breadcrumbs from "@/components/breadcrumbs/breadcrumbs";
import { Tab } from "@/interfaces/tab/tab";
import { VariableTypes } from "@/interfaces/variableTypes/variableTypes";
import { Category } from "@/interfaces/category/category";
import Select from "react-select";
import { theme } from "@/components/inputs/react-select/theme";
import { useMounted } from "@/hooks/useMounted";
import { createOptionsFromArray } from "@/modules/categories/category";

export default function CategoryEdit({ data }: { data: { category: Category, categories: Category[]}}) {
    const { category, categories } = data;
    const [formData, setformData] = useState(category);
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
            const res: AxiosResponse<any, any> = await axios.patch(`/api/categories/${category.id}`, formData, {withCredentials: true});

            if (res.status >= 200 && res.status < 300) {
                setResultAlert({
                    title: 'Success',
                    text: res.statusText,
                    severity: 'success',
                });
            }
        } catch (error: any | AxiosError) {        
            setResultAlert({
                title: 'Error',
                text: error?.message,
                severity: 'error',
            });
        }
    };
    
    const categoriesForSelect = createOptionsFromArray(categories);
    const parent = hasMounted ? <Select  
        name="parent" 
        placeholder='Родительская категория' 
        className='w-[46rem] text-sm' 
        isSearchable 
        isClearable 
        options={categoriesForSelect}
        theme={theme}
        onChange={(value) => setformData({
            ...formData,
            ['parent']: value?.value ?? null
        })}
        value= { categoriesForSelect.filter(category => category.value == formData.parent )[0] }
    ></Select> : <></>;

    const tabs:Tab<Category>[] = [
        {
            title: 'Основные',
            items: [
                { name: 'id', title:'ID', type: VariableTypes.READONLY },
                { name: 'active', title:'Активность', type: VariableTypes.CHECKBOX },
                { name: 'created_at', title:'Дата создания', type: VariableTypes.READONLYDATETIME },
                { name: 'updated_at', title:'Дата обновления', type: VariableTypes.READONLYDATETIME },
                { name: 'name', title: 'Название', type: VariableTypes.STRING},
                { name: 'parent', title: 'Родительская категория', type: VariableTypes.CUSTOM, component: parent},
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
    ]

    return (
        <Layout>
            <Head>
                <title>{'Административная панель: Редактирование ' + category.name}</title>
                <meta name="description" content={"Административная панель: Редактирование " + category.name} />
            </Head>
            <h1>{'Редактирование ' + category.name}</h1>
            <Breadcrumbs></Breadcrumbs>
            { resultAlert ? <div className='mt-3'><Alert severity={resultAlert.severity} title={resultAlert.title}>{resultAlert.text}</Alert></div>  : ''}
            <div className='border mt-3 border-solid border-[#d8d8d8] rounded'>
                <EditForm onSubmit={handleSubmit} tabs={tabs} formData={formData} onChange={handleChange} />
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ params } : { params ?: any }) {
    const id = params.id;
    let data = {
        category: {},
        categories: [], 
    };    

    const category = axios.get(`http://localhost:3001/categories/${id}`, {withCredentials: true});
    const categories = axios.get(`http://localhost:3001/categories/all`, {withCredentials: true});

    try {
        const values = await Promise.all([category, categories])
        data['category'] = values[0].data;
        data['categories'] = values[1].data;
    } catch (error: any | AxiosError) {        
        if (error instanceof AxiosError) {
            const { response } = error;
            console.log(response?.data.message);
        }            
    }
    
    return { props: { data } }
}
  