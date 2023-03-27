import axios, { AxiosError, AxiosResponse } from "axios";
import Layout from "@/components/admin/layout";
import Head from "next/head";
import EditForm from "@/components/admin/editForm/editForm";
import { useState } from "react";
import Alert from "@/components/alert/alert";
import { AlertType } from "@/interfaces/alert/alert";
import Breadcrumbs from "@/components/breadcrumbs/breadcrumbs";
import { createProductDto } from "@/interfaces/product/createProductDto";
import { useRouter } from 'next/navigation';
import { VariableTypes } from "@/interfaces/variableTypes/variableTypes";
import { Tab } from "@/interfaces/tab/tab";

const tabs:Tab<createProductDto>[] = [
    {
        title: 'Основные',
        items: [
            { name: 'name', title: 'Название', type: VariableTypes.STRING},
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

export default function Products() {
    const [resultAlert, setResultAlert] = useState<AlertType>();
    const router = useRouter()


    const [formData, setformData] = useState<createProductDto>({
        name: '',
        path: '',
        h1: '',
        title: '',
        description: '',
        keywords: ''
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
            const res: AxiosResponse<any, any> = await axios.post(`/api/products/`, formData, {withCredentials: true});
            
            if (res.status >= 200 && res.status < 300) {
                router.push(`/admin/products/${res.data.id}`)
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
    )
}