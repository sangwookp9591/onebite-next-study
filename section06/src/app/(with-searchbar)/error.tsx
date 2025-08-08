'use client';
import { useRouter } from 'next/navigation';
// client component라고 명시하는이유는 오류는 서버든 클라이언트든 발생할 수 있기 때문이다.
import { useEffect } from 'react';

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
                    router.refresh();
                    reset();
                }}
            >
                다시 시도
            </button>
        </div>
    );
}
