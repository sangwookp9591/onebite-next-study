import GlobalLayout from '@/components/global-layout';
import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import React from 'react';

type NextPageWithLayout = NextPage & {
    getLayout?: (page: React.ReactNode) => React.ReactNode;
};
//  getLayout?는 없는 페이지가 있을 수도 있으니깐
export default function App({
    Component,
    pageProps,
}: AppProps & {
    Component: NextPageWithLayout;
}) {
    console.log('Component getLayout', Component?.getLayout);

    const getLayout = Component.getLayout ?? ((page: React.ReactNode) => page); //undifined를 함수처럼 호출하려고하니깐 에러

    return (
        <>
            <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>
        </>
    );
}
