import BookItem from '@/components/book-item';
import { BookData } from '@/types';

//query string은 동적 함수 사용하기때문에 dynamic page임

/** search Page처럼 실시간으로 사용자의 검색어를 기반으로 어떤 데이터를  backend로부터 불러와서
 * 렌더링 해줘야하는 페이지는 staic으로 설정할 수 없어서 Full Route Cache는 포기해야하지만
 *
 * 조금이라서 실시간 생성 속도를 최적화하려면 Data cache만 따로 저장할수 있다.
 *
 * cache: 'force-cache', 이렇게 하면 브라우저로부터 접속 요청을 받았을때 페이지는 다시 생성이되지만
 * 결국 검색 결과는 계속 캐싱이 이루어지기때문에 한번 검색이 된 데이터에 대해서는 빠르게 응답
 */
export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const { q } = await searchParams;

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
