import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './breadcrumbs.module.css';

interface Breadcrumb {
    breadcrumb: string,
    href: string,
}

const convertBreadcrumb = (string: string) => {
  return string
    .replace(/-/g, ' ')
    .replace(/oe/g, 'ö')
    .replace(/ae/g, 'ä')
    .replace(/ue/g, 'ü')
    .toUpperCase();
};

const Breadcrumbs = () => {
    const router = useRouter();
    const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>();

    const generateBreadcrumbs = React.useMemo(() => {
        if (router) {
            const linkPath = router.asPath.split('/');
            linkPath.shift();
    
            const pathArray = linkPath.map((path, i) => {
                return { breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/') };
            });
    
            setBreadcrumbs(pathArray);
        }
    }, [router])


    if (!breadcrumbs) {
        return null;
    }

    return (
        <nav className={styles.container}>
            <ol>
                <li key='home'><Link className={styles.link} href="/">HOME</Link><span className={styles.divider}>/</span></li>
                {breadcrumbs.map((breadcrumb, i) => {
                    return (
                        <li key={breadcrumb.href}>
                            <Link className={styles.link} href={breadcrumb.href}>
                                {convertBreadcrumb(breadcrumb.breadcrumb)}
                            </Link>
                            <span className={styles.divider}>/</span>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;