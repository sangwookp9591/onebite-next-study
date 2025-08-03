import SearchableLayout from '@/components/searchable-layout';
import styles from './index.module.css';
import books from '@/mock/books.json';
import BookItem from '@/components/book-item';
import { useEffect } from 'react';
import { InferGetServerSidePropsType } from 'next';

/**  이렇게하면 이 index.tsx페이지는 ssr방식으로 사전렌더링이 이루어진다.
왜그런가? getServerSideProps 라는 약속된 이름의 함수를 만들어서
 export 하게되면 해당페이지는 SSR로 동작하도록 자동으로 설정됨

 1. localhost:3000의 index페이지로 요청하면
 2. getServerSideProps 함수가 동작해서 데이터를 패칭해서 가져오거나하는 역할을 수행함
 3. 페이지 컴포넌트가 동작함.
 */
export const getServerSideProps = () => {
    //컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터 불러오는 함수

    console.log('서버사이드프롭스 입니다.');

    //만약 브라우저 환경에서만 이용할 수 있는 예를 들면 이런 윈도우 객체의
    // window.location 이렇게하면 에러가 발생함, 자바스크립트의 윈도우는 브라우저를 의미함,
    // 서버에서실행되는 ServerSideProps 에선 window는 undefined가됨 window객체의 locaiton, confirm, alert다 사용불가
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

//페이지 역할을 하는 이 컴포넌트 또한 사실은 서버에서 한번 먼저 실행이 된 다음에 그다음에 브라우저에서 한번더 실행됨.
/**
 * 1. 브라우저로 부터 접속 요청을 받았을 때 사전 렌더링을 위해서 먼저 서버 측에서 한번 Home Component실행
 * 2. 브라우저에서 자바스크립트 번들 형태로 전달이 되어서 브라우저 측에서 실행이 될 때
 *    즉 하이드레이션 과정이 진행이 될 때 한번 더 실행이 됨
 *
 *서버 한번  브라우저 한번
 */

// props타입
//InferGetServerSidePropsType 는 serverSideProps의 반환값 타입을 자동으로 추론해주는 그런 기능을 하는 타입
//제네릭으로 getServerSideProps함수를 넣어주면 자동으로 함수의 반환값 타입이 추론이되어 매개변수 넣어짐
export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    //기존 react app에서하듯이 똑같이 props를 받아올수 있음.

    // 그래서 Home component가 1,2에서 두번 싫행되기때문에 log가 두번 호출될거임 (서버 쪽에서 log, 브라우저 쪽에서 log)
    console.log('data : ', props.data);

    //컴포넌트들 또한 서버에서 1번 실행이되기 때문에 아무런 조건없이 window객체 이런 것을 사용하면 오류가 발생함
    //서버에서실행하면 window가 undefined니깐 undefined를 호출하는꼴이되어버림 console.log(window)
    //window같은 객체를 쓰고싶으면 useEffect같이 브라우저에서만 실행되고싶은거랑 같기 때문에 컴포넌트 마운트 이후에 실행됨
    useEffect(() => {
        console.log(window);
    }, []);
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
