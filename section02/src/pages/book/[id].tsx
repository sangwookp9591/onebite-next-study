import styles from './[id].module.css';
import {
    // GetServerSidePropsContext,
    GetStaticPropsContext,
    // InferGetServerSidePropsType,
    InferGetStaticPropsType,
} from 'next';
import fetchOneBooks from '@/lib/fetch-one-book';
import { useRouter } from 'next/router';
import Head from 'next/head';

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

        /*
         * fallback: false -> 1,2,3이 아닌존재하지 않는 페이지는 Not found
         */
        /**
         * fallback: 'blocking'  SSR방식
         * build time이후에 생성된 이런 페이지들은 처음 요청할 때에는 즉각적으로 생성이 되어야 되기 때문에 SSR방식으로 동작해서
         * 비교적 느리기게 페이지가 렌더링 될 수 있지만 한 번만 만들면 넥스트 서버에 저장이 되기 때문에 그 이후 요청은 페이지를 새롭게 생성할 필요가 없다.
         */
        /**
         * fallbakc: true  SSR방식
         * - 페이지는 즉각적으로 생성을하고 props(data)가 없는 빈 페이지를 반환하고 props를 계산해서 데이터가 있는 상태의 페이지를 렌더링함
         *
         */
        fallback: true,
    };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const id = context.params!.id;
    const book = await fetchOneBooks(Number(id));

    if (!book) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            book,
        },
    };
};

export default function Page({ book }: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter();

    // if (router.isFallback) return '로딩중입니다.';
    // 여기서 걸려버리면 metatag가 안나오기때문에 추가

    if (router.isFallback) {
        return (
            <Head>
                <title>한입 북스</title>
                <meta property="og:image" content="/thumbnail.png" />
                {/* og:image 로 썸네일을 설정할거라고 알림 / 는  project의 public 경로를 나타내는 거임 */}
                <meta property="og:title" content="한입 북스" />
                <meta property="og:description" content="한입북스에 등록된 도서들을 만나보세요" />
            </Head>
        );
    }
    if (!book) return '문제가 발생했습니다 다시 실행해주세요.';

    // console.log('router : ', router);

    // const { id } = router.query;

    const { title, subTitle, description, author, publisher, coverImgUrl } = book;

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:image" content={coverImgUrl} />
                {/* og:image 로 썸네일을 설정할거라고 알림 / 는  project의 public 경로를 나타내는 거임 */}
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
            </Head>
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
        </>
    );
}
