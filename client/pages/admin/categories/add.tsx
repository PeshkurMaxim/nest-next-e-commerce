import axios, { AxiosError, AxiosResponse } from "axios";
import Layout from "@/components/admin/layout";
import Head from "next/head";
import EditForm from "@/components/admin/editForm/editForm";
import { useState } from "react";
import Alert from "@/components/alert/alert";
import { AlertType } from "@/interfaces/alert/alert";
import Breadcrumbs from "@/components/breadcrumbs/breadcrumbs";
import { useRouter } from 'next/navigation';
import { VariableTypes } from "@/interfaces/variableTypes/variableTypes";
import { Tab } from "@/interfaces/tab/tab";
import { createCategoryDto } from "@/interfaces/category/createCategoryDto";
import { useMounted } from "@/hooks/useMounted";
import { Category } from "@/interfaces/category/category";
import { createOptionsFromArray } from "@/modules/categories/category";
import Select from "react-select";
import { theme } from "@/components/inputs/react-select/theme";

export default function CategoryAdd({ data }: { data: { categories: Category[] } }) {
    const { categories } = data;
    const [resultAlert, setResultAlert] = useState<AlertType>();
    const router = useRouter();
    const hasMounted = useMounted();    

    const [formData, setformData] = useState<createCategoryDto>({
        name: '',
        active: true,
        path: '',
        h1: '',
        title: '',
        description: '',
        keywords: '',
        parent: null,
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
            const res: AxiosResponse<any, any> = await axios.post(`/api/categories/`, formData, {withCredentials: true});
            
            if (res.status >= 200 && res.status < 300) {
                router.push(`/admin/categories/${res.data.id}`)
            }
        } catch (error: any | AxiosError) {
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
    ></Select> : <></>;

    
    const tabs:Tab<createCategoryDto>[] = [
        {
            title: 'Основные',
            items: [
                { name: 'active', title:'Активность', type: VariableTypes.CHECKBOX },
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
                <title>{'Административная панель: Создание категории'}</title>
                <meta name="description" content={"Административная панель: Создание категории"} />
            </Head>
            <h1>{'Создание категории'}</h1>
            <Breadcrumbs></Breadcrumbs>
            { resultAlert ? <div className='mt-3'><Alert severity={resultAlert.severity} title={resultAlert.title}>{resultAlert.text}</Alert></div>  : ''}
            <div className='border mt-3 border-solid border-[#d8d8d8] rounded'>
                <EditForm onSubmit={handleSubmit} tabs={tabs} formData={formData} onChange={handleChange} />
            </div>
        </Layout>
    )
}

export async function getServerSideProps() {
    const res = await axios.get(`http://localhost:3001/categories/all`, {withCredentials: true});
    const data = { categories: res.data };
    
    return { props: { data } }
}