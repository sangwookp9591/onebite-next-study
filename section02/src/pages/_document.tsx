import { Html, Head, Main, NextScript } from 'next/document';

//모든 페이지에 공통적으로 적용되어야하는 next app의 html 코드를 설정하는 component
// meta tag섫정, 폰트 불러오기, charator set 설정, 구글 analaytics설정
//기존 react 의 index.html
export default function Document() {
    return (
        <Html lang="kr">
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
