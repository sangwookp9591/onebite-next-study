'use client';

import { useState } from 'react';

//App route에서는 파일이름이 page나 layout이 아니면 일반적인 자바스크립트, 타입스크립트로 간주함.
export default function Searchbar() {
    const [search, setSearch] = useState('');

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    return (
        <div>
            <input type="text" name="" id="" value={search} onChange={onChangeSearch} />
            <button>검색</button>
        </div>
    );
}
