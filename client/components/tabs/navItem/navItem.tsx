
interface ListProps {
    title: string,
    id: string,
    activeTab: string,
    setActiveTab: Function,
}

export default function TabNavItem(props: ListProps) {
    const handleClick = () => {
        props.setActiveTab(props.id);
    };

    return (
        <li onClick={handleClick} className={props.activeTab === props.id ? 'bg-[#d8d8d8]' : ''}>{props.title}</li>
    );
}