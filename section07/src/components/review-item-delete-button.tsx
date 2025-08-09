'use client';

import { deleteReviewAction } from '@/actions/delete-review.action';
import { useActionState, useRef } from 'react';

export default function ReviewItemDeleteButton({ bookId }: { bookId: number }) {
    const [state, formAction, isPending] = useActionState(deleteReviewAction, null);

    return (
        <form action={formAction}>
            <input name="bookId" type="text" value={bookId} hidden />
            <div>{isPending ? '...' : '삭제하기'}</div>
        </form>
    );
}
