
import SuccessButton from '@/components/buttons/success/successButton';
import TabNavItem from '@/components/tabs/navItem/navItem';
import TabItem from '@/components/tabs/tabItem/tabItem';
import { Tab } from '@/interfaces/tab/tab';
import { VariableTypes, VariableTypesToComponent } from '@/interfaces/variableTypes/variableTypes';
import { ReactNode, useState } from 'react';
import EditRow from '../editRow/editRow';
import styles from './editForm.module.css';
interface ListProps<T> {
    onSubmit: Function,
    tabs: Tab<T>[],
    formData : T,
    onChange: Function
}

export default function EditForm<T>({ onSubmit, tabs, formData, onChange }: ListProps<T>) {
    const [activeTab, setActiveTab] = useState('1');

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        onSubmit(e);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <>
                <ul>
                    {tabs.map( (tab, index) => (
                        <TabNavItem key={tab.title} title={tab.title} id={(index + 1).toString()} activeTab={activeTab} setActiveTab={setActiveTab} />
                    ))}
                </ul>
                {tabs.map( (tab, index) => {
                    let content: ReactNode[] = [];
                    
                    tab.items.map( item => {
                        if (item.type == VariableTypes.CUSTOM) {
                            content.push(
                                <EditRow key={item.name.toString()} title={item.title + ':'}>
                                    {item?.component}
                                </EditRow>    
                            )
                        } else {
                            const Component = VariableTypesToComponent[item.type];
                            content.push(
                                <EditRow key={item.name.toString()} title={item.title + ':'}>
                                    <Component name={item.name.toString()} value={`${formData[item.name] ?? ''}`} placeholder={item.title} onChange={onChange} />
                                </EditRow>
                            );
                        }
                    })
                    
                    return (
                        <TabItem key={index} id={(index + 1).toString()} activeTab={activeTab}>
                            {content}
                        </TabItem>
                    )
                })}
                <SuccessButton text='Сохранить' type='submit' />
            </>
        </form>
    );
}