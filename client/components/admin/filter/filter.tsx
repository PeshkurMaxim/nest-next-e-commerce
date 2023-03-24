import Image from 'next/image'
import Tooltip from '@/components/tooltip/tooltip';
import { Pencil } from '@styled-icons/bootstrap/Pencil';
import { Trash } from '@styled-icons/bootstrap/Trash';
import Link from 'next/link';
import styles from './list.module.css';
import { VariableTypes, VariableTypesToComponent } from '@/interfaces/variableTypes/variableTypes';
import React, { useState } from 'react';

interface ListProps<T> {
    collumns: { 
        key: keyof T,
        title: string,
        type: VariableTypes
    }[],
}

export default function Filter<T extends { id: number }>({ collumns }: ListProps<T>) {
    const [filterData, setFilterData] = useState({} as T);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterData({
            ...filterData,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div>
            {collumns.map( (col, key) => {
                const Component = VariableTypesToComponent[col.type];
                // console.log;
                
                return (<Component key={key} name={col.key.toString()} value={`${filterData[col.key] ?? ''}`} placeholder={col.title} onChange={onChange} />);
            })}
        </div>
    );
}