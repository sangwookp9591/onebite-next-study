import { ReactNode, Suspense } from 'react';
import Searchbar from '../../components/searchbar';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div>
            {/* Client측에서만 실행이 되도록 React Suspense 컴포넌트로 감싸고
            fallback으로 대체 ui설정

            이렇게하면 사전렌더링과정에서는 배제되고 오직 클라이언트 측에서만 렌더링된다.ㄴ
            */}
            <Suspense fallback={<div>Loading....</div>}>
                <Searchbar />
            </Suspense>
            {children}
        </div>
    );
}
