import { BookData } from '@/types';
import style from './page.module.css';

/**
 * 어떤 url parameter가 들어올지 모르는 동적경로를 받는 페이지라서
 * dynamic page이다.
 *
 * Static page로 만들려면 어떤 경로가 존재할수 있는지 알려줘야함
 * - 북페이지에서 어떤한 도서 데이터들이 빌드 타임에 만들어져야 되는지 먼저 알려주면 됨
 * generateStaticParams 함수 생성
 * generateStaticParams는 이름그대로 정적인 params를 생성하는 함수
 */

export function generateStaticParams() {
    return [{ id: '1' }, { id: '2' }, { id: '3' }]; //build타임에 만들어줌
}
export default async function Page({ params }: { params: Promise<{ id: string | string[] }> }) {
    const { id } = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`);

    if (!res.ok) {
        return <div>오류가 발생했습니다.</div>;
    }

    const book: BookData = await res.json();
    const { title, subTitle, description, author, publisher, coverImgUrl } = book;

    return (
        <div className={style.container}>
            <div className={style.cover_img_container} style={{ backgroundImage: `url('${coverImgUrl}')` }}>
                <img src={coverImgUrl} />
            </div>
            <div className={style.title}>{title}</div>
            <div className={style.subTitle}>{subTitle}</div>
            <div className={style.author}>
                {author} | {publisher}
            </div>
            <div className={style.description}>{description}</div>
        </div>
    );
}
