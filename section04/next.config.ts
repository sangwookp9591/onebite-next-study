import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    logging: {
        fetches: {
            fullUrl: true, //Next App에서 발생하는 모든 데이터 패칭이 다 로그로써 자동으로 콘솔에 출력
        },
    },
};

export default nextConfig;
