import Image from 'next/image'
import Tooltip from '@/components/tooltip/tooltip';
import { Pencil } from '@styled-icons/bootstrap/Pencil';
import { Trash } from '@styled-icons/bootstrap/Trash';
import Link from 'next/link';
import styles from './filter.module.css';
import { VariableTypes, VariableTypesToComponent } from '@/interfaces/variableTypes/variableTypes';
import React, { useState } from 'react';
import SuccessButton from '@/components/buttons/success/successButton';
import { useRouter } from 'next/router';

interface ListProps<T> {
    collumns: { 
        key: keyof T,
        title: string,
        type: VariableTypes
    }[],
    onClick: Function
}

export default function Filter<T extends { id: number }>({ collumns, onClick }: ListProps<T>) {
    const router = useRouter();
    const { query } = router;
    const [filterData, setFilterData] = useState({} as T);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterData({
            ...filterData,
            [e.target.name]: e.target.value
        });
    }

    const onClickHandler = () => {
        router.push({
                pathname: '/admin/products',
                query: { ...query, ...filterData }
            }, 
            undefined, 
            { shallow: true }
        )
        onClick();
    }

    return (
        <div className={styles.container}>
            {collumns.map( (col, key) => {
                const Component = VariableTypesToComponent[col.type];
                
                return (<div key={key}><Component key={key} name={col.key.toString()} value={`${filterData[col.key] ?? ''}`} placeholder={col.title} onChange={onChange} /></div>);
            })}
            <button type='submit' className='default-btn btn-success' onClick={onClickHandler}>Фильтровать</button>
        </div>
    );
}