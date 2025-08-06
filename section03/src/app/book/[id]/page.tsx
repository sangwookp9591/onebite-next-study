export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    // book/1/1 이런식으로 하고싶으면 catch all segement 방식으로 해야함 [...id]
    // 문제는 url parameter가 아에 존재하지 않는 값에는 대응이 되지 않음. 그럴땐 optional segment [[...id]]로하면된다
    //이러면 book이라는 경로가 만족하면 뒤에 무엇이 나오든 나오지않든 이 page.tsx파일에 작성된 컴포넌트가 화면으로서 렌더링된다.
    //1/2/3일경우 array로 1,2,3
    const { id } = await params;
    return <div>book/[{id}] page입니다.</div>;
}
