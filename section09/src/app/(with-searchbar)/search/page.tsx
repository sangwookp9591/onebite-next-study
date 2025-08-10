import BookItem from '@/components/book-item';
import { BookData } from '@/types';
import { delay } from '@/util/delay';
import { Metadata } from 'next';
import { Suspense } from 'react';

//비동기 부분을 Component로 분리
async function SearchResult({ q }: { q?: string }) {
    await delay(3000);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`, {
        cache: 'force-cache',
    });
    if (!res.ok) {
        return <div>오류가 발생했습니다.</div>;
    }
    const books: BookData[] = await res.json();

    return (
        <div>
            {books.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    );
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q?: string }> }): Promise<Metadata> {
    //현재 페이지 메타 데이터를 동적으로 생성하는 역할을 한다.
    //페이지 컴포넌트가 전달받는 페이지의 매개변수도 받을 수있다.

    const { q } = await searchParams;
    return {
        title: `${q} : 한입북스 검색`,
        description: `${q}의 검색 결과입니다 `,
        openGraph: {
            title: `${q} : 한입북스 검색`,
            description: `${q}의 검색 결과입니다 `,
            images: ['/thumbnail.png'], //썸네일 /->는 Pulbic폴더를 가르킨다.
        },
    };
}
// 15.1버전부터는 async를 붙여야함 searchParams와 params는 Promise객체를 붙여줘야한다.
export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const { q } = await searchParams;
    return (
        <Suspense key={q} fallback={<div>Loading...</div>}>
            <SearchResult q={q} />
        </Suspense>
    );
}
