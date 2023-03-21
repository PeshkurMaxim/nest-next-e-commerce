import Tooltip from '@/components/tooltip/tooltip';
import { Pencil } from '@styled-icons/bootstrap/Pencil';
import { Trash } from '@styled-icons/bootstrap/Trash';
import Link from 'next/link';
import styles from './list.module.css';

interface ListProps<T> {
    data: T[],
    collumns: { 
        key: keyof T,
        title: string,
    }[],
    actions: boolean,
    editLink: string,
    deleteLink: string,
}

export default function List<T extends { id: number }>({ data, collumns, actions, editLink, deleteLink }: ListProps<T>) {
    
    const drawActions = (id: number) => {
        if (actions) {
            return (
                <td className={styles.drawActions}>
                    <Tooltip text='Редактировать'>
                        <Link href={editLink + id} className="bg-main block rounded-lg p-2 cursor-pointer group relative hover:opacity-90"><Pencil size='30' color='#fff'/></Link>
                    </Tooltip>
                    <Tooltip text='Удалить'>
                        <span className='bg-red-600 block rounded-lg p-2 cursor-pointer group relative hover:opacity-90'><Trash size='30' color='#fff'/></span>
                    </Tooltip>
                </td>
            )
        }
    }
    const drawActionHeader = () => {
        if (actions) {
            return (
                <td>Действия</td>
                
            )
        }
    }
    
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    {collumns.map( (col, key) => (
                        <td key={key}>{col.title}</td>
                    ))}
                    { drawActionHeader() }
                </tr>
            </thead>
            <tbody>
                {data?.map( product => (
                    <tr key={product.id}>
                        { 
                            collumns.map( (col, index) => {
                                let value = `${product[col.key]}`;                                                                
                                value = (value.toString().includes('T') && !isNaN(Date.parse(value))) ? new Date(value).toLocaleString() : value;
                                return ( <td key={index}>{ value }</td> )
                            })
                        }
                        {drawActions(product.id)}  
                    </tr>
                ))}
            </tbody>
        </table>
    );
}