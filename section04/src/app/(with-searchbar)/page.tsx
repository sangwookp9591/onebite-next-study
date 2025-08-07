import BookItem from '@/components/book-item';
import style from './page.module.css';
import { BookData } from '@/types';

async function AllBooks() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, { cache: 'no-store' });
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`, { cache: 'force-cache' });
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

export default async function Home() {
    // 이제 여기서 추천도서까지 가져 오려면 fetch 를 두번 사용해야하고 예외 처리를 두번해줘야하기때문에
    // 내부코드가 길어져서 불러와야하는 데이터에따라서 컴포넌트를 나눠서 사용

    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천하는 도서</h3>
                <RecoBooks />
            </section>
            <section>
                <h3>등록된 모든 도서</h3>
                <AllBooks />
            </section>
        </div>
    );
}
