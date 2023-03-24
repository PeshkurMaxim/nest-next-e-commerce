import axios from "axios";
import Layout from "@/components/admin/layout";
import { Category } from "@/interfaces/category/category";
import List from "@/components/admin/List/list";

export default function Categories({ data }: { data: Category[]}) {
    const collumns : { 
        key: keyof Category,
        title: string,
    }[] = [
        { key: 'id', title: 'ID'},
        { key: 'name', title: 'Название'},
        { key: 'created_at', title: 'Дата создания'},
        { key: 'updated_at', title: 'Дата редактирования'},
    ];
    return (
        <Layout>
            {/* <List data={data} collumns={collumns} actions={true} editLink={'/admin/categories/'} deleteLink={() => {}}></List> */}
        </Layout>
    )
}

export async function getServerSideProps() {
    const res = await axios.get("http://localhost:3001/categories", {withCredentials: true});
    const data = await res.data;
    
    return { props: { data } }
}
  