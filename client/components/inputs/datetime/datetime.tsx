import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';

interface ListProps {
    name: string,
    value: string,
    placeholder: string,
    onChange: Function, 
}

export default function DateTimeInput(props: ListProps) {

    const handleChange = (date: Date | null) => {
        props.onChange({
            target: { 
                name: props.name,
                value: date,
            },   
        });
    }

    return (
        <DatePicker placeholderText={props.placeholder} className='input-datetime' showTimeInput selected={props.value ? new Date(props.value) : null} onChange={(date) => handleChange(date)} dateFormat="Pp" timeFormat="p" locale={ru} title={props.placeholder} name={props.name}/>
    );
}