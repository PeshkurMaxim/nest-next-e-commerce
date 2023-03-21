
import styles from './successButton.module.css';

interface ListProps {
    text: string,
    type?: "button" | "submit" | "reset", 
}

export default function SuccessButton({ text, type }: ListProps) {
    return (
        <button className={styles.button} type={type ? type : 'button'}>{text}</button>
    );
}