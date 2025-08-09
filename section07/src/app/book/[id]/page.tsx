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
    //서버엑션을 사용하는 이유
    /**
     * 1. 코드가 간결함
     * 2. API를 이용해서 만들면 별도의 파일을 추가하고 경로를 설정하고 예외처리 등 부가적인 작업을 매번해야함
     * 3. 단순한 기능만 하게될 경우에는 이렇게 간결하게 함수하나로 끝낼 수 있음.
     * 4. 클라이언트인 브라우저에서 호출만 할 수 있을뿐 이코드를 전달받지는 못함 , 봉보민감하거나 또는 중요한 데이터를 다룰 때에도 유용하게 활용됨.
     */
    async function createReviewAction(formData: FormData) {
        'use server';

        console.log('server action called');
    }
    return (
        <section>
            <form action={createReviewAction}>
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
