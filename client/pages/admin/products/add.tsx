import axios, { AxiosError, AxiosResponse } from "axios";
import Layout from "@/components/admin/layout";
import EditRow from "@/components/admin/editRow/editRow";
import Head from "next/head";
import EditForm from "@/components/admin/editForm/editForm";
import { useState } from "react";
import TabNavItem from "@/components/tabs/navItem/navItem";
import TabItem from "@/components/tabs/tabItem/tabItem";
import Alert from "@/components/alert/alert";
import { AlertType } from "@/interfaces/alert/alert";
import TextInput from "@/components/inputs/text/textInput";
import Editor from "@/components/inputs/editor/editor";
import Breadcrumbs from "@/components/breadcrumbs/breadcrumbs";
import { createProductDto } from "@/interfaces/product/createProductDto";
import { useRouter } from 'next/navigation';

export default function Products() {
    const [activeTab, setActiveTab] = useState('1');
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
                <EditForm onSubmit={handleSubmit} >
                    <ul>
                        <TabNavItem title="Основные" id="1" activeTab={activeTab} setActiveTab={setActiveTab} />
                        <TabNavItem title="SEO" id="2" activeTab={activeTab} setActiveTab={setActiveTab} />
                    </ul>
                    <TabItem id="1" activeTab={activeTab}>
                        <EditRow title="Название:">
                            <TextInput name="name" placeholder="Название" value={formData.name} onChange={handleChange} />
                        </EditRow>
                    </TabItem>
                    <TabItem id="2" activeTab={activeTab}>
                        <EditRow title="url:">
                            <TextInput name="path" placeholder="path" value={formData.path} onChange={handleChange} />
                        </EditRow>
                        <EditRow title="h1:">
                            <Editor name="h1" value={formData.h1} onChange={handleChange} />
                        </EditRow>
                        <EditRow title="title:">
                            <Editor name="title" value={formData.title} onChange={handleChange} />
                        </EditRow>
                        <EditRow title="description:">
                            <Editor name="description" value={formData.description} onChange={handleChange} />
                        </EditRow>
                    </TabItem>
                </EditForm>
            </div>
        </Layout>
    )
}