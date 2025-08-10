import BookPage from '@/app/book/[id]/page';

// Book Page 인터셉팅
export default function Page(props: any) {
    return (
        <div>
            특저 book page 가로채기 성공
            <BookPage {...props} />
        </div>
    );
}
