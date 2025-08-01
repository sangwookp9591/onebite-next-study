import { ReactNode } from 'react';

export default function SearchableLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <div>임시 서버</div>
            {children}
        </div>
    );
}
