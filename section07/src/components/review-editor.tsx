import styles from './review-editor.module.css';
import { createReviewAction } from '@/actions/create-review.action';

export default function ReviewEditor({ bookId }: { bookId: string }) {
    return (
        <section>
            <form action={createReviewAction}>
                <input name="bookId" value={bookId} hidden readOnly />
                <input required name="content" placeholder="리뷰 내용" />
                <input required name="author" placeholder="작성자" />
                <button type="submit">작성하기</button>
            </form>
        </section>
    );
}
