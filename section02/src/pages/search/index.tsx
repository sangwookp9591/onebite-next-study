import SearchableLayout from '@/components/searchable-layout';
import { useRouter } from 'next/router'; //navigation은 app router에서 사용

export default function Page() {
    //?q=asdasd
    //query string 가져오는 방법

    const router = useRouter();
    console.log('router : ', router);

    const { q } = router.query;

    //search?q=asdasd
    // 이렇게했을때 Log가 두번찍히는 이유는 querystring 읽는과정중 component를 한번더 렌더링시키기때문

    return <h1>search {q}</h1>;
}

Page.getLayout = (page: React.ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>;
};
