import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';

export default function SearchableLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [search, setSearch] = useState<string>('');

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target?.value);
    };

    const onSubmit = () => {
        if (!search) return;
        router.push(`/search?q=${search}`);
    };
    return (
        <div>
            <div>
                <input type="text" placeholder="검색어를 입력하세요 ..." value={search} onChange={onChangeSearch} />
                <button onClick={onSubmit}>검색</button>
            </div>
            {children}
        </div>
    );
}
