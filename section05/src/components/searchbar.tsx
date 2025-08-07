'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import style from './serachbar.module.css';

export default function Searchbar() {
    const router = useRouter();
    /*
    SearchBar Component를 실행해 버리면 useSearchParams훅이 호출이 되어야 되기때문에 문제가 발생
    query String은 빌드타임에 존재하지 않는다.
    build 타임에는 절대로 값을 알수없는 이러한 query string같은 값을 불러오는 훅을 실행하려고 하면
    지금 현재는 이값을 절대로 알수없기때문에  
     에러 발생 ⨯ useSearchParams() should be wrapped in a suspense boundary at page "/".

     해결 방법 -> 오직 client에서만 실행되도록 사전 렌더링과정에서는 완전히 배제 시켜야함
     */
    const searchParams = useSearchParams();

    const [search, setSearch] = useState('');

    const q = searchParams.get('q');

    useEffect(() => {
        setSearch(q || '');
    }, [q]);

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const onSubmit = () => {
        if (!search || q === search) return;
        router.push(`/search?q=${search}`);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSubmit();
        }
    };

    return (
        <div className={style.container}>
            <input value={search} onChange={onChangeSearch} onKeyDown={onKeyDown} />
            <button onClick={onSubmit}>검색</button>
        </div>
    );
}
