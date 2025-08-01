import GlobalLayout from '@/components/global-layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    console.log('Component getLayout', Component?.getLayout);
    return (
        <>
            <GlobalLayout>
                <Component {...pageProps} />
            </GlobalLayout>
        </>
    );
}
