import { ReactNode } from "react";
import styles from './tooltip.module.css';

export default function Tooltip({ children, text }: { children?: ReactNode, text: string}) {
    return (
        <div className={styles.container}>
            <div>{ children }</div>
            <div className={styles.tooltip_container}>
                <span className={styles.tooltip_container__text}>{text}</span>
                <div className={styles.tooltip_container__triangle}></div>
            </div>
        </div>
    )
}