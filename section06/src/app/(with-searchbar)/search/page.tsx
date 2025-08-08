import BookItem from '@/components/book-item';
import { BookData } from '@/types';
import { delay } from '@/util/delay';

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const { q } = await searchParams;

    //검색이 늦어질경우 전체 페이지가 지체되지 않도록 설정

    // await delay(3000);
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
