'use server';
import { revalidateTag } from 'next/cache';

//별도 파일로 따로 분리해 놓았을때는 지시자를 최상단에 작성

//서버엑션을 사용하는 이유
/**
 * 1. 코드가 간결함
 * 2. API를 이용해서 만들면 별도의 파일을 추가하고 경로를 설정하고 예외처리 등 부가적인 작업을 매번해야함
 * 3. 단순한 기능만 하게될 경우에는 이렇게 간결하게 함수하나로 끝낼 수 있음.
 * 4. 클라이언트인 브라우저에서 호출만 할 수 있을뿐 이코드를 전달받지는 못함 , 봉보민감하거나 또는 중요한 데이터를 다룰 때에도 유용하게 활용됨.
 */
export async function createReviewAction(formData: FormData) {
    const bookId = formData.get('bookId')?.toString();
    const content = formData.get('content')?.toString();
    const author = formData.get('authro')?.toString();

    // 빈입력 방지를 서버와 클라이언트 모두에서 하는 이유는 서버 클라이언트 서로 100% 믿을 수 없이 때문
    if (!bookId || !content || !author) return;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`, {
            method: 'POST',
            body: JSON.stringify({
                bookId,
                content,
                author,
            }), //네트워크 요청으로 객체를 그대로 보낼수없기 때문에 직렬화 해야한다.
        });
        // revalidatePath(`/book/${bookId}`); //이경로를 재검증하기때문에 새로불러옴
        revalidateTag(`review-${bookId}`); //로 효율적으로 무효화 하도록 수정
    } catch (err) {
        console.log('eror :', err);
        return;
    }
}
