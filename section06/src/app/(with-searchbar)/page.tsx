import BookItem from '@/components/book-item';
import style from './page.module.css';
import { BookData } from '@/types';
import { delay } from '@/util/delay';
import { Suspense } from 'react';
import BookItemSkeleton from '@/components/skeleton/book-item-skeleton';

async function AllBooks() {
    await delay(3000);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, { cache: 'force-cache' });
    // 요청 할때마다 매번 새롭게 발생
    if (!res.ok) {
        return <div>오류가 발생했습니다.</div>;
    }
    const allBooks: BookData[] = await res.json();

    return (
        <div>
            {' '}
            {allBooks.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    );
}

async function RecoBooks() {
    await delay(1500);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`, { next: { revalidate: 3 } });
    if (!res.ok) {
        return <div>오류가 발생했습니다.</div>;
    }
    const recoBooks: BookData[] = await res.json();
    return (
        <div>
            {recoBooks.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    );
}
export const dynamic = 'force-dynamic';

export default function Home() {
    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천하는 도서</h3>

                <Suspense
                    fallback={
                        <>
                            {Array(3)
                                .fill(0)
                                .map((_, idx) => {
                                    return <BookItemSkeleton key={idx} />;
                                })}
                        </>
                    }
                >
                    <RecoBooks />
                </Suspense>
            </section>
            <section>
                <h3>등록된 모든 도서</h3>
                <Suspense
                    fallback={
                        <>
                            {Array(3)
                                .fill(0)
                                .map((_, idx) => {
                                    return <BookItemSkeleton key={idx} />;
                                })}
                        </>
                    }
                >
                    <AllBooks />
                </Suspense>
            </section>
        </div>
    );
}
