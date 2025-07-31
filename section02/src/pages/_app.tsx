import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
//페이지의 역할을 하진않지만 공통 로직 및 레이아웃을 다루는 페이지

//root component 모든 페이지를 하는 컴포넌트의 부모 컴포넌트

/**
 *
 * @param param0
 * @returns
 *
 * component -> Page역할하는 컴포넌트
 * pageProps -> page전달할 props
 */
export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    //link가아닌 프로그래매틱한 페이지 이동(Programmatic Navigation)
    //csr
    const onClickButton = () => {
        router.push('/test');
    };

    useEffect(() => {
        router.prefetch('/test');
    }, []);
    return (
        <>
            <header>
                {/* a tag는 csr방식이아닌 페이지를 이동시키는 방법임 서버에서 매번 새로운 페이지를 요청함 그래서 자체 LInk component를 사용 */}
                {/* Link는 csr를 사용 */}
                {/* LInk컴포넌트와 프로그래매틱한 페이지 이동의 차이는 pre-fetching 차이 */}
                <Link href={'/'}>index</Link>
                &nbsp;
                <Link href={'/search'}>search</Link>
                &nbsp;
                <Link href={'/book/1'}>book-1</Link>
                <div>
                    <button onClick={onClickButton}>/test 페이지로 이동</button>
                </div>
            </header>
            <Component {...pageProps} />
        </>
    );
}
