import './globals.css';
import Link from 'next/link';
import style from './layout.module.css';
import { BookData } from '@/types';

async function Footer() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`);
    if (!res.ok) return <footer>제작 @winterlood</footer>;
    const allBooks: BookData[] = await res.json();
    const bookCount = allBooks?.length;
    return (
        <footer>
            <div>제작 @winterlood</div>
            <div>{bookCount}개의 도서과 등록되어 있습니다.</div>
        </footer>
    );
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <div className={style.container}>
                    <header>
                        <Link href={'/'}>📚 ONEBITE BOOKS</Link>
                    </header>
                    <main>{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
