import { BookData } from '@/types';
import style from './page.module.css';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
    return [{ id: '1' }, { id: '2' }, { id: '3' }]; //build타임에 만들어줌
}
//화면에 렌더링하는기능을 별도의 컴포넌트 분리
async function BookDetail({ bookId }: { bookId: string }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`);

    if (!res.ok) {
        if (res.status === 404) {
            notFound(); // 자동으로 404 page로 redirect
        }
        return <div>오류가 발생했습니다.</div>;
    }

    const book: BookData = await res.json();
    const { title, subTitle, description, author, publisher, coverImgUrl } = book;

    return (
        <section>
            <div className={style.cover_img_container} style={{ backgroundImage: `url('${coverImgUrl}')` }}>
                <img src={coverImgUrl} />
            </div>
            <div className={style.title}>{title}</div>
            <div className={style.subTitle}>{subTitle}</div>
            <div className={style.author}>
                {author} | {publisher}
            </div>
            <div className={style.description}>{description}</div>
        </section>
    );
}

function ReviewEditor() {
    return (
        <section>
            <form action="">
                <input type="content" placeholder="리뷰 내용" />
                <input type="author" placeholder="작성자" />
                <button type="submit">작성하기</button>
            </form>
        </section>
    );
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <div className={style.container}>
            <BookDetail bookId={id} />
            <ReviewEditor />
        </div>
    );
}
