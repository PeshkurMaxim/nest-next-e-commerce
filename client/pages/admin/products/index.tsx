import axios from "axios";
import Layout from "@/components/admin/layout";
import { Product } from "@/interfaces/product/product";
import List from "@/components/admin/List/list";

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
            <List data={data} collumns={collumns} actions={true} editLink={'/admin/products/'} deleteLink={'test'}></List>
        </Layout>
    )
}

export async function getServerSideProps() {
    const res = await axios.get("http://localhost:3001/products", {withCredentials: true});
    const data = await res.data;
    
    return { props: { data } }
}
  