import styles from './[id].module.css';
import {
    // GetServerSidePropsContext,
    GetStaticPropsContext,
    // InferGetServerSidePropsType,
    InferGetStaticPropsType,
} from 'next';
import fetchOneBooks from '@/lib/fetch-one-book';

// export const getServerSideProps = async (context: GetServerSidePropsContext) => {
//     //url parameter를 불러오기윟
//     const id = context.params!.id;
//     //type에러를 막기위해 무조건 !.id 라는id값이 있을거다라는 형식을 쓴이유는
//     //이페이지 자체가 [id]로 되어있어 id가 있어야지만 접근이 가능하기 때문이다.

//     const book = await fetchOneBooks(Number(id)); // 기본적으로 String타입을 가짐
//     return { props: { book } };
// };

export const getStaticPaths = () => {
    //어떤한 경로들이 존재할 수 있는지 배열로 반환해 줘야함.

    // 임시로 1,2,3번이있다고했을때
    return {
        // paths 배열안에 하나의 경로 아이템을 객체로 설정해줘야한다.
        // 객체 안에는 url 파라미터를 의미하는 params라는 값으로 id는 문자열 1번 이런식으로 해줘야함
        // (파라미터값은 반드시 문자열로만 그래야 Next가 경로를 제대로 읽어옴)
        paths: [
            {
                params: { id: '1' },
            },
            {
                params: { id: '2' },
            },
            {
                params: { id: '3' },
            },
        ],
        //대첵, 대비책, 보험 ,
        //paths값에 존재하지 않는 경로로 요청했을때 대비책
        // false -> 1,2,3이 아닌존재하지 않는 페이지는 Not found
        fallback: 'blocking',
    };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const id = context.params!.id;
    const book = await fetchOneBooks(Number(id));

    return {
        props: {
            book,
        },
    };
};

export default function Page({ book }: InferGetStaticPropsType<typeof getStaticProps>) {
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
