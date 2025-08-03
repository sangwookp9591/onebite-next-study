import SearchableLayout from '@/components/searchable-layout';
import styles from './index.module.css';
import books from '@/mock/books.json';
import BookItem from '@/components/book-item';

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
