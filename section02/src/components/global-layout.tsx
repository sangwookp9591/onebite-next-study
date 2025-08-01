import Link from 'next/link';

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <header>
                <Link href={'/'}>📚 ONEBITE BOOKS</Link>
            </header>
            <main>{children}</main>
            <footer>제작 @Sangwook</footer>
        </div>
    );
}
