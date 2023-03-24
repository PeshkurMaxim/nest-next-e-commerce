import { ReactNode } from "react";
import styles from './loader.module.css';

export default function Loader({ children, active }: { children?: ReactNode, active: boolean}) {
    return (
        <div className='relative'>
            {active ? <div className={styles.loader}><span className={styles.span}></span></div> : ''}
            <div className={active ? styles.active : ''}>{children}</div>
        </div>
    )
}