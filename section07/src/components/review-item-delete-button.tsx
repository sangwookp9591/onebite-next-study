'use client';

import { deleteReviewAction } from '@/actions/delete-review.action';
import { useActionState, useRef } from 'react';

export default function ReviewItemDeleteButton({ bookId }: { bookId: number }) {
    const formRef = useRef<HTMLFormElement>(null); //div를 button submit처럼 사용하기 위해
    const [state, formAction, isPending] = useActionState(deleteReviewAction, null);

    return (
        <form action={formAction} ref={formRef}>
            <input name="bookId" type="text" value={bookId} hidden />
            <div onClick={() => formRef?.current?.requestSubmit()}>{isPending ? '...' : '삭제하기'}</div>
        </form>
    );
}
