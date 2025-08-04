import BookItem from '@/components/book-item';
import SearchableLayout from '@/components/searchable-layout';
import fetchBooks from '@/lib/fetch-books';
import { BookData } from '@/types';
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
        <div>
            {books.map((book) => (
                <BookItem key={book?.id} {...book} />
            ))}
        </div>
    );
}

Page.getLayout = (page: React.ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>;
};
