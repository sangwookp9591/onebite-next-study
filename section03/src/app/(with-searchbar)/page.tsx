import ClientComponent from '../../components/client-component';
import styles from './page.module.css';
import ServerComponent from './server-component';

export default function Home() {
    console.log('Home 컴포넌트 실행'); // server component기 때문에 브라우저에서는 log가 남지 않는다.

    const secretKey = 'qwer123';

    return (
        <div>
            인덱스 페이
            <ClientComponent>
                <ServerComponent />
            </ClientComponent>
        </div>
    );
}
