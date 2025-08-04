import styles from './[id].module.css';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import fetchOneBooks from '@/lib/fetch-one-book';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    //url parameter를 불러오기윟
    const id = context.params!.id;
    //type에러를 막기위해 무조건 !.id 라는id값이 있을거다라는 형식을 쓴이유는
    //이페이지 자체가 [id]로 되어있어 id가 있어야지만 접근이 가능하기 때문이다.

    const book = await fetchOneBooks(Number(id)); // 기본적으로 String타입을 가짐
    return { props: { book } };
};

export default function Page({ book }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    if (!book) return '문제가 발생했습니다 다시 실행해주세요.';

    // const router = useRouter();

    // console.log('router : ', router);

    // const { id } = router.query;

    const { title, subTitle, description, author, publisher, coverImgUrl } = book;

    return (
        <div className={styles.container}>
            <div className={styles.cover_img_container} style={{ backgroundImage: `url('${coverImgUrl}')` }}>
                <img src={coverImgUrl} />
            </div>
            <div className={styles.title}>{title}</div>
            <div className={styles.subTitle}>{subTitle}</div>
            <div className={styles.author}>
                {author} | {publisher}
            </div>
            <div>{description}</div>
        </div>
    );
}
