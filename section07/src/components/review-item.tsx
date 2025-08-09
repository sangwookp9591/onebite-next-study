import { ReviewData } from '@/types';
import styles from './review-item.module.css';
import ReviewItemDeleteButton from './review-item-delete-button';

export default function ReviewItem({ id, content, author, createdAt, bookId }: ReviewData) {
    // container전체를 form으로 감싸이 컴포넌트를 클라이언트 컴포넌트로 전환해서 로딩 상태나 에러 핸들링 등등을 처리하게 해도 상관없지만

    //굳이 그렇게 할 필요는없다. 우리가 만드려는 기능은 삭제하기 버튼 기능만 만들면되기 때문임.
    //author, content등은 상호작용이없기 때문에 굳이안해줘도 됨그래서 delete btn만 따로 분리해서 client컴포넌트로 만들어줄거임
    return (
        <div className={styles.container}>
            <div className={styles.author}>{author}</div>
            <div className={styles.content}>{content}</div>
            <div className={styles.bottom_container}>
                <div className={styles.date}>{new Date(createdAt).toLocaleString()}</div>
                <div className={styles.delete_btn}>
                    <ReviewItemDeleteButton bookId={bookId} />
                </div>
            </div>
        </div>
    );
}
