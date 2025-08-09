'use client';

import { deleteReviewAction } from '@/actions/delete-review.action';
import { useActionState, useRef } from 'react';

export default function ReviewItemDeleteButton({ reviewId, bookId }: { reviewId: number; bookId: number }) {
    const formRef = useRef<HTMLFormElement>(null); //div를 button submit처럼 사용하기 위해
    const [state, formAction, isPending] = useActionState(deleteReviewAction, null);

    return (
        <form action={formAction} ref={formRef}>
            <input name="reviewId" type="text" value={reviewId} hidden />
            <input name="bookId" type="text" value={bookId} hidden />
            {/*  formRef?.current?. 의 submit을 안쓰고 requestSubmit을 사용하는이유
            submit은 유효성 검사나 이벤트 핸들러 등을 다 무시하고 그냥 무조건 강제로 폼의 제출을
            
            */}
            {isPending ? <div>...</div> : <div onClick={() => formRef?.current?.requestSubmit()}>{'삭제하기'}</div>}
        </form>
    );
}
