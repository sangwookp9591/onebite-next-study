import BookItem from '@/components/book-item';
import SearchableLayout from '@/components/searchable-layout';
import fetchBooks from '@/lib/fetch-books';
import { BookData } from '@/types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// 여기에는 getStaticProps를 사용할 수 없다 , context값이 없은 static은 build타임에 딱한번만 실행되는거임
// 검색결과, 리스트 정렬구조 등, 사용자 인터렉션으로 통해지는것은 query String을 꺼내올 방법이 없음
// 이러한 제약사항을 뚫고도하고싶으면 fetchBooks과정을 clinet쪽에서 해줘여함
// export const getServerSideProps = async (context: GetServerSidePropsContext) => {
//     // qeury string을 받아오기 위해
//     console.log('context : ', context); //현재 브라우저로부터 받은 모든 정보가 다포함이 되어있음.
//     const q = context.query?.q;

//     const books = await fetchBooks(q as string);
//     return { props: { books } };
// };
export default function Page() {
    const [books, setBooks] = useState<BookData[]>([]);

    const router = useRouter();
    const { q } = router.query;

    const fetchData = async () => {
        const res = await fetchBooks(q as string);
        setBooks(res);
        return res;
    };
    useEffect(() => {
        if (q) {
            fetchData();
        }
    }, [q]);

    return (
        <>
            <Head>
                <title>한입 북스 - 검색결과</title>
                <meta property="og:image" content="/thumbnail.png" />
                {/* og:image 로 썸네일을 설정할거라고 알림 / 는  project의 public 경로를 나타내는 거임 */}
                <meta property="og:title" content="한입 북스 - 검색결과" />
                <meta property="og:description" content="한입북스에 등록된 도서들을 만나보세요" />
            </Head>

            <div>
                {books.map((book) => (
                    <BookItem key={book?.id} {...book} />
                ))}
            </div>
        </>
    );
}

Page.getLayout = (page: React.ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>;
};
