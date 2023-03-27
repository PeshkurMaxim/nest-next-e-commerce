
import styles from './checkbox.module.css';

interface ListProps {
    value: string,
    name: string,
    onChange: Function,
}

export default function CheckboxInput(props: ListProps) {

    const handleChange = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        props.onChange({
            target: {
                name: props.name,
                value: props.value == 'true' ? false : true,
            }
        });
    }

    return (
        <button type='button' className={`${styles.button} ${props.value == 'true' ? styles.checked : ''}`} value={props.value ? 'true' : 'false'} onClick={handleChange} ></button>
    );
}