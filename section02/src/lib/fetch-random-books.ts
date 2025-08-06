import { BookData } from '@/types';

export default async function fetchRandomBooks(): Promise<BookData[]> {
    const url = `https://onebite-books-server-wine.vercel.app/book/random`;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error();
        }
        //Response 객체의 본문(body)을 JSON으로 파싱하는 작업 이것도 비동기 작업이라 await가 필요하다.

        /**
         * fetch()로 받은 응답은 내부적으로 ReadableStream으로 되어 있어요.
            즉, 데이터를 조금씩 끊어서 받기 때문에 완전히 다 도착할 때까지 기다려야 해요.
         */
        return await res?.json();
    } catch (err) {
        console.log(err);

        return [];
    }
}
