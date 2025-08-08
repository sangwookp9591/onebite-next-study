import BookItem from '@/components/book-item';
import { BookData } from '@/types';
import { delay } from '@/util/delay';
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

// 15.1버전부터는 async를 붙여야함 searchParams와 params는 Promise객체를 붙여줘야한다.
export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const { q } = await searchParams;
    return (
        // 여기까지만해도 Streaming Loading Component와 다를게 없음 다시 검색어입력시 Loading이 안나옴
        // key={q} key값을 이용하여 q가 변경될때마다 다시 상태 로딩
        <Suspense key={q} fallback={<div>Loading...</div>}>
            {/* 이렇게 Suspense로 비동기 함수를 감싸지면 Streaming이 된다. Suspense는 미완성상태로 남겨놓기때문에  */}
            <SearchResult q={q} />
        </Suspense>
    );
}
