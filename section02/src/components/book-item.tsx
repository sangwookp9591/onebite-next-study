import { BookData } from '@/types';
import Link from 'next/link';
import styles from './book-item.module.css';

export default function BookItem({ id, title, subTitle, description, author, publisher, coverImgUrl }: BookData) {
    return (
        <Link href={`/book/${id}`} className={styles.container}>
            <img src={coverImgUrl} />
            <div>
                <div>{title}</div>
                <div>{subTitle}</div>
                <br />
                <div>
                    {author} | {publisher}
                </div>
            </div>
        </Link>
    );
}
