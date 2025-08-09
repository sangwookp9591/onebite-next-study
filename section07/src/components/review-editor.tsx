'use client';

import styles from './review-editor.module.css';
import { createReviewAction } from '@/actions/create-review.action';

/**
 * Server Action으로는 ,loading, button Disable등 어떤 기능도 제공되고 있지 않기때문에 답답할 수 있다.
 * 큰문제는 버튼 click후 form 중복 호출도 방지가 되어 있지 않다.
 */
export default function ReviewEditor({ bookId }: { bookId: string }) {
    return (
        <section>
            <form className={styles.form_container} action={createReviewAction}>
                <input name="bookId" value={bookId} hidden readOnly />
                <textarea required name="content" placeholder="리뷰 내용" />
                <div className={styles.submit_container}>
                    <input required name="author" placeholder="작성자" />
                    <button type="submit">작성하기</button>
                </div>
            </form>
        </section>
    );
}
