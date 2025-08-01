import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

export default function SearchableLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [search, setSearch] = useState<string>('');

    //최초이렇게 하면 queystring이 여러 개일 수도 있기 때문에 , string, String arr이나, undefined가 올 수 도있기때문임
    // const q = router.query.q;
    const q = router.query.q as string;

    useEffect(() => {
        setSearch(q || '');
    }, [q]);

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target?.value);
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
        <div>
            <div>
                <input
                    type="text"
                    placeholder="검색어를 입력하세요 ..."
                    value={search}
                    onChange={onChangeSearch}
                    onKeyDown={onKeyDown}
                />
                <button onClick={onSubmit}>검색</button>
            </div>
            {children}
        </div>
    );
}
