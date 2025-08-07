import { ReactNode, Suspense } from 'react';
import Searchbar from '../../components/searchbar';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div>
            {/* Client측에서만 실행이 되도록 React Suspense 컴포넌트로 감싸고
            fallback으로 대체 ui설정

            이렇게하면 사전렌더링과정에서는 배제되고 오직 클라이언트 측에서만 렌더링된다.ㄴ
            Suspense -> 미완성이라는 의미임, 
            서버측에서 사전 렌더링을 할때 이 Suspense로 묶여있는 컴포넌트는 미완성상태로 남겨짐

            곧바로 렌더링하지않고 대체 UI가렌더링이되고 
            비동기 작업이 종료가되면 즉 Searchbar로 치면 useSearchParams() 호출이 끝날때 (query string을 불러왔을때 , 브라우저에 마운트가 됐을때) 종료가됨
            */}

            <Suspense fallback={<div>Loading....</div>}>
                <Searchbar />
            </Suspense>
            {children}
        </div>
    );
}
