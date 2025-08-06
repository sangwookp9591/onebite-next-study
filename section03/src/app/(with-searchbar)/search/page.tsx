import ClientComponent from '@/components/client-component';

export default function Page({ searchParams }: { searchParams: { q?: string } }) {
    //App라우터에서 query string이나, url parameter와 같은 경로상에 포함되는 값들은 Page Component의 props로 받아온다

    // const { q } = await searchParams;
    return (
        <div>
            Search 페이지 {searchParams?.q}
            <ClientComponent>
                <></>
            </ClientComponent>
        </div>
    );
}
