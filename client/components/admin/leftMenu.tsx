import Link from "next/link";
import Image from 'next/image';

export default function LeftMenu() {
    return (
        <nav className='overflow-auto w-1/12 h-screen bg-main text-white'>
            {/* <div className='w-full flex items-center justify-center'>
                <Image
                    src="/vercel.svg"
                    alt="Vercel Logo"
                    width={100}
                    height={24}
                    priority
                />
                <span className='text-lg'>Shop</span>
            </div> */}
            <ul className='list-none p-0 m-0'>
                <li className='list-none p-0 m-0'><Link className='text-sm border-b border-solid border-white w-full block p-2.5 hover:bg-white hover:text-main transition duration-300' href="/admin/products">Товары</Link></li>
                <li className='list-none p-0 m-0'><Link className='text-sm border-b border-solid border-white w-full block p-2.5 hover:bg-white hover:text-main transition duration-300' href="/admin/categories">Категории</Link></li>
            </ul>


        </nav>
        
    )
}