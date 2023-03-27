
import Link from 'next/link';

interface ListProps {
    text: string,
    href: string,
}

export default function CreateButton({ text, href }: ListProps) {
    return (
        <Link href={href} className='default-btn btn-success m-3' >{text}</Link>
    );
}