import BookItem from '@/components/book-item';
import { BookData } from '@/types';
import { delay } from '@/util/delay';
import { Suspense } from 'react';

//비동기 부분을 Component로 분리
async function SearchResult({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const { q } = await searchParams;
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

//이제 이 Page Component는 어떠한 비동기 작업도 처리하지 않기 때문에 async 제거
export default function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    //검색이 늦어질경우 전체 페이지가 지체되지 않도록 설정

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {/* 이렇게 Suspense로 비동기 함수를 감싸지면 Streaming이 된다. Suspense는 미완성상태로 남겨놓기때문에  */}
            <SearchResult searchParams={searchParams} />
        </Suspense>
    );
}
