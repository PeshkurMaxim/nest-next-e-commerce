import axios, { AxiosError, AxiosResponse } from "axios";
import Layout from "@/components/admin/layout";
import { Product } from "@/interfaces/product/product";
import Head from "next/head";
import EditForm from "@/components/admin/editForm/editForm";
import { useState } from "react";
import Alert from "@/components/alert/alert";
import { AlertType } from "@/interfaces/alert/alert";
import Breadcrumbs from "@/components/breadcrumbs/breadcrumbs";
import { Tab } from "@/interfaces/tab/tab";
import { VariableTypes } from "@/interfaces/variableTypes/variableTypes";
import { Category } from "@/interfaces/category/category";

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
        title: 'SEO',
        items: [
            { name: 'path', title: 'url', type: VariableTypes.STRING},
            { name: 'h1', title: 'h1', type: VariableTypes.EDITOR},
            { name: 'title', title: 'title', type: VariableTypes.EDITOR},
            { name: 'description', title: 'description', type: VariableTypes.EDITOR},
        ],
    }
]

export default function Products({ data }: { data: { product: Product, categories: Category[]}}) {
    const { product, categories } = data;
    const [formData, setformData] = useState(product);
    const [resultAlert, setResultAlert] = useState<AlertType>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {                
        setformData({
          ...formData,
          [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const res: AxiosResponse<any, any> = await axios.patch(`/api/products/${product.id}`, formData, {withCredentials: true});

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
    )
}

export async function getServerSideProps({ params } : { params ?: any }) {
    const id = params.id;
    let data = {
        product: {},
        categories: [], 
    };    

    const product = axios.get(`http://localhost:3001/products/${id}`, {withCredentials: true});
    const categories = axios.get(`http://localhost:3001/categories`, {withCredentials: true});

    try {
        const values = await Promise.all([product, categories])
        data['product'] = values[0].data;
        data['categories'] = values[1].data;
    } catch (error: any | AxiosError) {
        if (error instanceof AxiosError) {
            const { response } = error;
            console.log(response?.data.message);
        }            
    }

    return { props: { data } }
}
  