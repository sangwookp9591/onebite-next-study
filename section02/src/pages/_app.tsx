import '@/styles/globals.css';
import type { AppProps } from 'next/app';
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
    return <Component {...pageProps} />;
}
