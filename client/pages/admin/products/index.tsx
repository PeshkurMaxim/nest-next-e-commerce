import axios from "axios";
import Layout from "@/components/admin/layout";
import { Product } from "@/interfaces/product/product";
import List from "@/components/admin/List/list";
import Head from "next/head";
import Breadcrumbs from "@/components/breadcrumbs/breadcrumbs";
import CreateButton from "@/components/buttons/create/createButton";
import { useEffect, useState, useTransition } from "react";
import Pagination from "@/components/pagination/pagination";
import Loader from "@/components/loader/loader";
import { deleteProduct, getProducts, getProductsCount } from "@/modules/products/product";
import Filter from "@/components/admin/filter/filter";
import { VariableTypes } from "@/interfaces/variableTypes/variableTypes";

const PAGE_SIZE = 20;

export default function Products({ data }: { data: Product[]}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentTableData, setCurrentTableData] = useState(data);
    const [totalProductsCount, setTotalProductsCount] = useState(0)
    const [isPending, startTransition] = useTransition();
    const [sortField, setSortField] = useState("id");
    const [order, setOrder] = useState("ASC");

    useEffect(() => {
        startTransition(() => {
            getProductsCount()
            .then((data) => {
                setTotalProductsCount(data);
            })
        });        
    }, [])

    const pageChangeHandler = (page: number) => {
        startTransition(() => {
            getProducts(page, PAGE_SIZE).then( (newData) => {
                setCurrentTableData(newData);
                setCurrentPage(page);
            })
        });        
    }

    const onDelete = (id: number) => {
        deleteProduct(id).then( () => {
            startTransition(() => {
                getProducts(currentPage, PAGE_SIZE).then( (newData) => {                    
                    setCurrentTableData(newData);
                })
            }); 
        })
    }

    const onSort = (key: string) => {
        const sortOrder = key === sortField && order === "ASC" ? "DESC" : "ASC";
        setSortField(key);
        setOrder(sortOrder);
        startTransition(() => {
            getProducts(currentPage, PAGE_SIZE, key, sortOrder).then( (newData) => {                    
                setCurrentTableData(newData);
            })
        }); 
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

    const filterCollumns : { 
        key: keyof Product,
        title: string,
        type: VariableTypes
    }[] = [
        { key: 'id', title: 'ID', type: VariableTypes.STRING},
        { key: 'name', title: 'Название', type: VariableTypes.STRING},
        { key: 'created_at', title: 'Дата создания', type: VariableTypes.STRING},
        { key: 'updated_at', title: 'Дата редактирования', type: VariableTypes.STRING},
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
            <Filter collumns={filterCollumns}></Filter>
            <div className='mt-3'>
                <Loader active={isPending}>
                    <List 
                        data={currentTableData} 
                        collumns={collumns} 
                        actions={true} 
                        editLink={'/admin/products/'} 
                        onDelete={onDelete} 
                        onSort={onSort}
                        currentSortField={sortField}
                        currentOrder={order}
                    />
                    <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={totalProductsCount}
                        pageSize={PAGE_SIZE}
                        onPageChange={(page: number) => pageChangeHandler(page)} 
                        siblingCount={1}
                    />
                </Loader>
            </div>
        </Layout>
    )
}

export async function getServerSideProps() {
    const res = await axios.get("http://localhost:3001/products", { params: {limit: PAGE_SIZE, offset: 0, sort: 'ID', order: 'ASC'}, withCredentials: true});
    const data =  res.data;
    
    
    return { props: { data } }
}
  