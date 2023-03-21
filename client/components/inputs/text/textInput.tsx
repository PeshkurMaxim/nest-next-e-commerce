
import styles from './textInput.module.css';

interface ListProps {
    name: string,
    value: string,
    placeholder: string,
    onChange: Function, 
}

export default function TextInput(props: ListProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(event);
    }

    return (
        <div className='relative'>
            <input type="text" className={styles.input} name={props.name} placeholder=" " value={props.value} onChange={handleChange} />
            <label className={styles.label}>{props.placeholder}</label>
        </div>
    );
}