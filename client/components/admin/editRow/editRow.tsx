
import { ReactNode } from 'react';
import styles from './editRow.module.css';

interface ListProps {
    title: string,
    children?: ReactNode,
}

export default function EditRow(props: ListProps) {
    return (
        <div className={styles.row}>
            <div className={styles.name}>{props.title}</div>
            <div className={styles.value}>{props.children}</div>
        </div>
    );
}