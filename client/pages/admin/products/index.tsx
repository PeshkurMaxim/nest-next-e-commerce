import axios from "axios";
import Layout from "@/components/admin/layout";
import { Product } from "@/interfaces/product/product";
import List from "@/components/admin/List/list";
import Head from "next/head";
import Breadcrumbs from "@/components/breadcrumbs/breadcrumbs";
import CreateButton from "@/components/buttons/create/createButton";

export default function Products({ data }: { data: Product[]}) {
    const collumns : { 
        key: keyof Product,
        title: string,
    }[] = [
        { key: 'id', title: 'ID'},
        { key: 'name', title: 'Название'},
        { key: 'created_at', title: 'Дата создания'},
        { key: 'updated_at', title: 'Дата редактирования'},
    ];
    return (
        <Layout>
            <Head>
                <title>{'Административная панель: Товары'}</title>
                <meta name="description" content={"Административная панель: Товары"} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>Товары</h1>
            <div className='flex justify-between'><Breadcrumbs></Breadcrumbs><CreateButton href='/admin/products/add' text='Создать'></CreateButton></div>
            <div className='mt-3'>
                <List data={data} collumns={collumns} actions={true} editLink={'/admin/products/'} deleteLink={'/api/products/'}></List>
            </div>
        </Layout>
    )
}

export async function getServerSideProps() {
    const res = await axios.get("http://localhost:3001/products", {withCredentials: true});
    const data = await res.data;
    
    return { props: { data } }
}
  