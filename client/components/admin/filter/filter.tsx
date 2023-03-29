import styles from './filter.module.css';
import { VariableTypes, VariableTypesToComponent } from '@/interfaces/variableTypes/variableTypes';
import React, { useState } from 'react';
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
    const { query, pathname } = router;
    const [filterData, setFilterData] = useState({} as T);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterData({
            ...filterData,
            [e.target.name]: e.target.value
        });
    }

    const onClickHandler = () => {
        const newQuery = { ...query, ...filterData };
        router.push({
                pathname: pathname,
                query: newQuery
            }, 
            undefined, 
            { shallow: true }
        ).then(() => onClick(newQuery))
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