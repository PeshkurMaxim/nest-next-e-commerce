import LeftMenu from "@/components/admin/leftMenu";
import Head from "next/head";
import { ReactNode } from 'react';

export default function Layout({ children }: { children?: ReactNode}) {
    return (
        <>
            <Head>
                <title>Административная панель</title>
                <meta name="description" content="Административная панель" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='flex align-middle'>
                <LeftMenu/>
                <div className='w-full px-3 pt-3'>{children}</div>
            </div>
        </>
    )
}