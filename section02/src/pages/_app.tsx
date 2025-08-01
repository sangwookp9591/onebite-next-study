import GlobalLayout from '@/components/global-layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
    console.log('Component getLayout', Component?.getLayout);

    const getLayout = Component.getLayout ?? ((page: React.ReactNode) => page); //undifined를 함수처럼 호출하려고하니깐 에러

    return (
        <>
            <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>
        </>
    );
}
