import SearchableLayout from '@/components/searchable-layout';
import styles from './index.module.css';
import books from '@/mock/books.json';
import BookItem from '@/components/book-item';

/**  이렇게하면 이 index.tsx페이지는 ssr방식으로 사전렌더링이 이루어진다.
왜그런가? getServerSideProps 라는 약속된 이름의 함수를 만들어서
 export 하게되면 해당페이지는 SSR로 동작하도록 자동으로 설정됨

 1. localhost:3000의 index페이지로 요청하면
 2. getServerSideProps 함수가 동작해서 데이터를 패칭해서 가져오거나하는 역할을 수행함
 3. 페이지 컴포넌트가 동작함.
 */
export const getServerSideProps = () => {
    //컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터 불러오는 함수

    const data = 'hello';

    //return 안에 props라는 프로퍼티로 객체로 넣어줘서 home Component에 전달하도록함.
    // getServerSideProps는 반드시 return  {props : }
    // 이렇게 props라는 객체 프로퍼티를 포함하는 단 하나의 객체여야한다
    return {
        props: {
            data,
        },
    };
};
export default function Home() {
    return (
        <div className={styles.container}>
            <section>
                <h3>지금 추천하는 도서</h3>
                {books.map((book) => (
                    <BookItem key={book?.id} {...book} />
                ))}
            </section>
            <section>
                <h3>등록된 모든 도서 </h3>
                {books.map((book) => (
                    <BookItem key={book?.id} {...book} />
                ))}
            </section>
        </div>
    );
}

//Home은 함수인데 ? 어떻게 함수에다가 getLayout method를 추가할수있는거지?
//  -> js의 모든함수는 객체이기 때문임.
Home.getLayout = (page: React.ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>;
};
