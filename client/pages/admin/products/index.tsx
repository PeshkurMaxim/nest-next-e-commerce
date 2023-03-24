import axios from "axios";
import Layout from "@/components/admin/layout";
import { Product } from "@/interfaces/product/product";
import List from "@/components/admin/List/list";
import Head from "next/head";
import Breadcrumbs from "@/components/breadcrumbs/breadcrumbs";
import CreateButton from "@/components/buttons/create/createButton";
import { startTransition, useMemo, useState } from "react";
import Pagination from "@/components/pagination/pagination";

const PAGE_SIZE = 5;

const getProducts = async (page: number) => {
    try {
        const offset = (page - 1) * PAGE_SIZE;
        const res = await axios.get("/api/products", { params: {limit: PAGE_SIZE, offset}, withCredentials: true});
        
        if (res.status >= 200 && res.status < 300)
            return res.data;   
    } catch (error) {
        console.log(error);
    }

    return [];
}

const deleteProduct = (id: number) => {
    return axios.delete(`/api/products/${id}`, {withCredentials: true})
        .then( data => alert('Элемент удален'))
        .catch( err => alert('Ошибка удаления'))
}

export default function Products({ data }: { data: Product[]}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentTableData, setCurrentTableData] = useState(data);

    const pageChangeHandler = (page: number) => {
        startTransition(() => {
            getProducts(page).then( (newData) => {
                
                setCurrentTableData(newData);
                setCurrentPage(page);
            })
        });        
    }

    const onDelete = (id: number) => {
        deleteProduct(id).then( () => {
            startTransition(() => {
                getProducts(currentPage).then( (newData) => {                    
                    setCurrentTableData(newData);
                })
            }); 
        })
    }

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
                <List data={currentTableData} collumns={collumns} actions={true} editLink={'/admin/products/'} onDelete={onDelete}></List>
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={100}
                    pageSize={PAGE_SIZE}
                    onPageChange={(page: number) => pageChangeHandler(page)} 
                    siblingCount={1}
                />
            </div>
        </Layout>
    )
}

export async function getServerSideProps() {
    const res = await axios.get("http://localhost:3001/products", { params: {limit: PAGE_SIZE, offset: 0}, withCredentials: true});
    const data =  res.data;
    
    
    return { props: { data } }
}
  