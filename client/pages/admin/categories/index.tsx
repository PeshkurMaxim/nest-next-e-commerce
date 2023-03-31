import axios from 'axios';
import Layout from '@/components/admin/layout';
import { Category } from '@/interfaces/category/category';
import List from '@/components/admin/List/list';
import { VariableTypes } from '@/interfaces/variableTypes/variableTypes';
import { Column } from '@/interfaces/column/column';
import { useRouter } from 'next/router';
import { useEffect, useState, useTransition } from 'react';
import { deleteCategory, getCategories, getCategoriesCount } from '@/modules/categories/category';
import { ParsedUrlQuery } from 'querystring';
import Head from 'next/head';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import CreateButton from '@/components/buttons/create/createButton';
import Filter from '@/components/admin/filter/filter';
import Loader from '@/components/loader/loader';
import Pagination from '@/components/pagination/pagination';


const PAGE_SIZE = 20;

const collumns: Column<Category>[] = [
    { key: 'id', title: 'ID', type: VariableTypes.STRING },
    { key: 'active', title: 'Активность', type: VariableTypes.CHECKBOX },
    { key: 'name', title: 'Название', type: VariableTypes.STRING },
    { key: 'created_at', title: 'Дата создания', type: VariableTypes.DATETIME },
    { key: 'updated_at', title: 'Дата редактирования', type: VariableTypes.DATETIME },
];

const filterCollumns: Column<Category>[] = [
    { key: 'id', title: 'ID', type: VariableTypes.STRING},
    { key: 'name', title: 'Название', type: VariableTypes.STRING},
];

export default function Categories({ data }: { data: Category[]}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentTableData, setCurrentTableData] = useState(data);
    const [totalProductsCount, setTotalProductsCount] = useState(0);
    const [isPending, startTransition] = useTransition();
    const [sortField, setSortField] = useState("id");
    const [order, setOrder] = useState("ASC");
    const router = useRouter();
    const { query } = router;
    
    useEffect(() => {
        startTransition(() => {
            getCategoriesCount()
            .then((data) => {
                setTotalProductsCount(data);
            });
        });        
    }, []);

    const pageChangeHandler = (page: number) => {
        startTransition(() => {
            getCategories(currentPage, PAGE_SIZE, sortField, order, query).then( (newData) => {                    
                setCurrentTableData(newData);
                setCurrentPage(page);
            });
        });        
    };

    const onDelete = (id: number) => {
        deleteCategory(id).then( () => {
            startTransition(() => {
                getCategories(currentPage, PAGE_SIZE, sortField, order, query).then( (newData) => {                    
                    setCurrentTableData(newData);
                });
            }); 
        });
    };

    const onSort = (key: string) => {
        const sortOrder = key === sortField && order === "ASC" ? "DESC" : "ASC";
        setSortField(key);
        setOrder(sortOrder);
        startTransition(() => {
            getCategories(currentPage, PAGE_SIZE, key, sortOrder, query).then( (newData) => {                    
                setCurrentTableData(newData);
            });
        }); 
    };

    const onFilter = (newQuery: ParsedUrlQuery) => {        
        startTransition(() => {
            getCategories(currentPage, PAGE_SIZE, sortField, order, newQuery).then( (newData) => {                    
                setCurrentTableData(newData);
            });
        }); 
    };

    return (
        <Layout>
            <Head>
                <title>{'Административная панель: Категории'}</title>
                <meta name="description" content={"Административная панель: Категории"} />
            </Head>
            <h1>Категории</h1>
            <div className='flex justify-between'><Breadcrumbs/><CreateButton href='/admin/categories/add' text='Создать'></CreateButton></div>
            <Filter collumns={filterCollumns} onClick={onFilter}></Filter>
            <div className='mt-3'>
                <Loader active={isPending}>
                    <List 
                        data={currentTableData} 
                        collumns={collumns} 
                        actions={true} 
                        editLink={'/admin/categories/'} 
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
    );
}

export async function getServerSideProps() {
    const res = await axios.get("http://localhost:3001/categories", {withCredentials: true});
    const data = await res.data;
    
    return { props: { data } };
}
  