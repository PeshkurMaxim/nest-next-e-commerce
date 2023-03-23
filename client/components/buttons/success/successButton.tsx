interface ListProps {
    text: string,
    type?: "button" | "submit" | "reset", 
}

export default function SuccessButton({ text, type }: ListProps) {
    return (
        <button className='default-btn btn-success' type={type ? type : 'button'}>{text}</button>
    );
}