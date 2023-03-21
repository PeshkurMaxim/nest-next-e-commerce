import { ReactNode } from "react";

export interface AlertType {
    title: string,
    children?: ReactNode,
    text?: string,
    severity: 'error' | 'warning' | 'info' | 'success',
}