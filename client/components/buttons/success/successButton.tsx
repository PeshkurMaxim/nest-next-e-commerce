interface ListProps {
    text: string,
    type?: "button" | "submit" | "reset", 
}

export default function SuccessButton({ text, type }: ListProps) {
    return (
        <button className='default-btn btn-success m-3' type={type ? type : 'button'}>{text}</button>
    );
}