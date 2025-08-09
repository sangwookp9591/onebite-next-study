'use client';
import { useRouter } from 'next/navigation';
// client component라고 명시하는이유는 오류는 서버든 클라이언트든 발생할 수 있기 때문이다.
import { startTransition, useEffect } from 'react';

//파일과 같은 경로에 있거나 또는 하위 경로에 있는 페이지에서 오류가 발생하면 에러 컴포넌트가 페이지 컴포넌트 대신에 화면에 노출
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    const router = useRouter();

    useEffect(() => {
        console.log(error?.message);
    }, [error]);

    return (
        <div>
            <h3>오류가 발생했습니다.</h3>
            <button
                onClick={() => {
                    startTransition(() => {
                        router.refresh(); //현재 페이지에 필요한 서버컴포넌트를 업데이트 -> 업데이트 이후에도 Client component인 Error Compoent가 사라지지 않는다.
                        reset(); //그래서 reset을 호출하여 에러 상태를 초기화하고 , 컴포넌트들을 다시 렌더링
                    });
                }}
            >
                다시 시도
            </button>
        </div>
    );
}
