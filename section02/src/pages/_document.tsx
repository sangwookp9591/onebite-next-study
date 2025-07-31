import { Html, Head, Main, NextScript } from 'next/document';

//페이지의 역할을 하진않지만 공통 로직 및 레이아웃을 다루는 페이지
export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
