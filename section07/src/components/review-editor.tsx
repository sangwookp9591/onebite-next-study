'use client';

import { useActionState } from 'react';
import styles from './review-editor.module.css';
import { createReviewAction } from '@/actions/create-review.action';

/**
 * Server Action으로는 ,loading, button Disable등 어떤 기능도 제공되고 있지 않기때문에 답답할 수 있다.
 * 큰문제는 버튼 click후 form 중복 호출도 방지가 되어 있지 않다.
 */
export default function ReviewEditor({ bookId }: { bookId: string }) {
    //큰문제는 버튼 click후 form 중복 호출도 방지가 되어 있지 않음
    // 제를 해결하기 좋은 Hook이 React19에 나옴
    //form테그의 상태를 굉장히 쉽게 핸들링 할 수 있음.
    //첫 번째 인수 - 핸들링하려는 폼에 액션 함수
    //두 번째 인수 - 상태의 초기값
    const [state, formAction, isPending] = useActionState(createReviewAction, null);

    return (
        <section>
            <form className={styles.form_container} action={formAction}>
                <input name="bookId" value={bookId} hidden readOnly />
                <textarea disabled={isPending} required name="content" placeholder="리뷰 내용" />
                <div className={styles.submit_container}>
                    <input disabled={isPending} required name="author" placeholder="작성자" />
                    <button disabled={isPending} type="submit">
                        {isPending ? '...' : '작성하기'}
                    </button>
                </div>
            </form>
        </section>
    );
}
