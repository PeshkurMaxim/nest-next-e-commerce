import { CheckCircle, ExclamationCircle, ExclamationTriangle, Info } from "@styled-icons/bootstrap";
import { ReactNode } from "react";
import styles from './alert.module.css';

interface ListProps {
    title: string,
    children?: ReactNode,
    severity: 'error' | 'warning' | 'info' | 'success',
}

export default function Alert({ title, children, severity }: ListProps) {
    let alertStyles;
    let svg;

    switch (severity) {
        case 'success': {
            alertStyles = styles.success;
            svg = <CheckCircle size='30' color="#fff"></CheckCircle>;
            break;
        }
        case 'info': {
            alertStyles = styles.info;
            svg = <Info size='30' color="#fff"></Info>;
            break;
        }
        case 'warning': {
            alertStyles = styles.warning;
            svg = <ExclamationTriangle size='30' color="#fff"></ExclamationTriangle>;
            break;
        }
        case 'error': {
            alertStyles = styles.error;
            svg = <ExclamationCircle size='30' color="#fff"></ExclamationCircle>;
            break;
        }   
        default:
            break;
    }

    return (
        <div className={alertStyles}>
            {svg}
            <div>
                <div className={styles.title}>{title}</div>
                {children}
            </div>
        </div>
    );
}