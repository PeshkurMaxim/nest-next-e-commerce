
import SuccessButton from '@/components/buttons/success/successButton';
import { ReactNode } from 'react';
import styles from './editForm.module.css';

interface ListProps {
    onSubmit: Function,
    children?: ReactNode
}

export default function EditForm({ children, onSubmit }: ListProps) {
    
    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        onSubmit(e);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {children}
            <SuccessButton text='Сохранить' type='submit' />
        </form>
    );
}