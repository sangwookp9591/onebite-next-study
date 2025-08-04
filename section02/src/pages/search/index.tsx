import BookItem from '@/components/book-item';
import SearchableLayout from '@/components/searchable-layout';
import fetchBooks from '@/lib/fetch-books';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    // qeury string을 받아오기 위해
    console.log('context : ', context); //현재 브라우저로부터 받은 모든 정보가 다포함이 되어있음.
    const q = context.query?.q;

    const books = await fetchBooks(q as string);
    return { props: { books } };
};
export default function Page({ books }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    //?q=asdasd
    //query string 가져오는 방법

    // const router = useRouter();
    // console.log('router : ', router);

    // const { q } = router.query;

    //search?q=asdasd
    // 이렇게했을때 Log가 두번찍히는 이유는 querystring 읽는과정중 component를 한번더 렌더링시키기때문

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
