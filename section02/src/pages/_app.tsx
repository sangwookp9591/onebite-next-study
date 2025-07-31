import '@/styles/globals.css';
import type { AppProps } from 'next/app';
//페이지의 역할을 하진않지만 공통 로직 및 레이아웃을 다루는 페이지
export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
