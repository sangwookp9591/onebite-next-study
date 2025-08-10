import BookItem from '@/components/book-item';
import style from './page.module.css';
import { BookData } from '@/types';
import { delay } from '@/util/delay';
import { Suspense } from 'react';
import BookListSkeleton from '@/components/skeleton/book-list-skeleton';
import { Metadata } from 'next';

async function AllBooks() {
    await delay(2000);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, { cache: 'force-cache' });
    // 요청 할때마다 매번 새롭게 발생
    if (!res.ok) {
        return <div>오류가 발생했습니다.</div>;
    }
    const allBooks: BookData[] = await res.json();

    return (
        <div>
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

export const metadata: Metadata = {
    title: '합입 북스',
    description: '한입 북스에 등록된 도서를 만나보세요',
    openGraph: {
        title: '한입 북스',
        description: '한입 북스에 등록된 도서를 만나보세요',
        images: ['/thumbnail.png'], //썸네일 /->는 Pulbic폴더를 가르킨다.
    },
};

export default function Home() {
    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천하는 도서</h3>

                <Suspense
                    fallback={
                        <>
                            <BookListSkeleton count={3} />
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
                            <BookListSkeleton count={3} />
                        </>
                    }
                >
                    <AllBooks />
                </Suspense>
            </section>
        </div>
    );
}
