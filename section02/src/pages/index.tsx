import SearchableLayout from '@/components/searchable-layout';
import styles from './index.module.css';

export default function Home() {
    return (
        <>
            <h1 className={styles.h1}>인덱스</h1>
        </>
    );
}

//Home은 함수인데 ? 어떻게 함수에다가 getLayout method를 추가할수있는거지?
//  -> js의 모든함수는 객체이기 때문임.
Home.getLayout = (page: React.ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>;
};
