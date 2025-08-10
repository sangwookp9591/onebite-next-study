import BookPage from '@/app/book/[id]/page';
import Modal from '@/components/modal';

// Book Page 인터셉팅
export default function Page(props: any) {
    return (
        <Modal>
            특저 book page 가로채기 성공
            <BookPage {...props} />
        </Modal>
    );
}
