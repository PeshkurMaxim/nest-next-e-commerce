import { ReactNode } from "react";

interface ListProps {
    id: string,
    activeTab: string,
    children?: ReactNode
}

export default function TabItem(props: ListProps) {
    return (
        <div className={props.activeTab == props.id ? '' : 'hidden'}>
            { props.children }
        </div>
    );
}