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

function ReviewEditor({ bookId }: { bookId: string }) {
    //서버엑션을 사용하는 이유
    /**
     * 1. 코드가 간결함
     * 2. API를 이용해서 만들면 별도의 파일을 추가하고 경로를 설정하고 예외처리 등 부가적인 작업을 매번해야함
     * 3. 단순한 기능만 하게될 경우에는 이렇게 간결하게 함수하나로 끝낼 수 있음.
     * 4. 클라이언트인 브라우저에서 호출만 할 수 있을뿐 이코드를 전달받지는 못함 , 봉보민감하거나 또는 중요한 데이터를 다룰 때에도 유용하게 활용됨.
     */
    async function createReviewAction(formData: FormData) {
        'use server';

        const content = formData.get('content')?.toString();
        const author = formData.get('authro')?.toString();

        // 빈입력 방지를 서버와 클라이언트 모두에서 하는 이유는 서버 클라이언트 서로 100% 믿을 수 없이 때문
        if (!content || !author) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`, {
                method: 'POST',
                body: JSON.stringify({
                    bookId,
                    content,
                    author,
                }), //네트워크 요청으로 객체를 그대로 보낼수없기 때문에 직렬화 해야한다.
            });
            console.log(res.status);
        } catch (err) {
            console.log('eror :', err);
            return;
        }
    }
    return (
        <section>
            <form action={createReviewAction}>
                <input required type="content" placeholder="리뷰 내용" />
                <input required type="author" placeholder="작성자" />
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
            <ReviewEditor bookId={id} />
        </div>
    );
}
