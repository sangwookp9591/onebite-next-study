import Link from 'next/link';
import styles from './global-layout.module.css';

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.container}>
            <header>
                <Link href={'/'}>📚 ONEBITE BOOKS</Link>
            </header>
            <main>{children}</main>
            <footer>제작 @Sangwook</footer>
        </div>
    );
}
