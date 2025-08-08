'use client';
// client component라고 명시하는이유는 오류는 서버든 클라이언트든 발생할 수 있기 때문이다.
import { useEffect } from 'react';

//파일과 같은 경로에 있거나 또는 하위 경로에 있는 페이지에서 오류가 발생하면 에러 컴포넌트가 페이지 컴포넌트 대신에 화면에 노출
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        console.log(error?.message);
    }, [error]);

    return (
        <div>
            <h3>오류가 발생했습니다.</h3>
            {/* 서버가 다시 켜진상태에서 다시시도를 눌러도 똑같음 왜냐하면
            reset 함수는 그냥 브라우저 측에서 즉 clinet 측에서만 
            현재 서버로부터 전달받은 데이터를 이용해서 화면을 다시 한번 렌더링 해보기만하는 method
            이기 때문에 데이터패칭을 다시 수행하는것은 아니기때문임
             */}
            <button onClick={() => window.location.reload()}>다시 시도</button>
        </div>
    );
}
