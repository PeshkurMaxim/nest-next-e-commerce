import axios, { AxiosError, AxiosResponse } from "axios";
import Layout from "@/components/admin/layout";
import { Product } from "@/interfaces/product/product";
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

export default function Products({ data }: { data: Product}) {
    const [activeTab, setActiveTab] = useState('1');
    const [resultAlert, setResultAlert] = useState<AlertType>();

    const [formData, setformData] = useState(data);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {        
        setformData({
          ...formData,
          [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const res: AxiosResponse<any, any> = await axios.patch(`/api/products/${data.id}`, formData, {withCredentials: true});
            const resultData = await res.data;

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
                <title>{'Административная панель: Редактирование' + data.name}</title>
                <meta name="description" content={"Административная панель: Редактирование " + data.name} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            { resultAlert ? <div className='mb-3'><Alert severity={resultAlert.severity} title={resultAlert.title}>{resultAlert.text}</Alert></div>  : ''}
            <div className='border border-solid border-[#d8d8d8] rounded'>
                <EditForm onSubmit={handleSubmit} >
                    <ul>
                        <TabNavItem title="Основные" id="1" activeTab={activeTab} setActiveTab={setActiveTab} />
                        <TabNavItem title="SEO" id="2" activeTab={activeTab} setActiveTab={setActiveTab} />
                    </ul>
                    <TabItem id="1" activeTab={activeTab}>
                        <EditRow title="ID:">
                            {formData.id}
                        </EditRow>
                        <EditRow title="Дата создания:">
                            {new Date(formData.created_at).toLocaleString()}
                        </EditRow>
                        <EditRow title="Дата обновления:">
                            {new Date(formData.updated_at).toLocaleString()}
                        </EditRow>
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

export async function getServerSideProps<GetServerSideProps>({ params } : { params ?: any }) {
    const id = params.id;
    const res = await axios.get(`http://localhost:3001/products/${id}`, {withCredentials: true});
    const data = await res.data;
    
    return { props: { data } }
}
  