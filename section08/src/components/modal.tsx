'use client';

import { ReactNode } from 'react';
import styles from './modal.module.css';
import { createPortal } from 'react-dom';

export default function Modal({ children }: { children: ReactNode }) {
    //createPortal
    //첫번째 인수- modal의 렌더링 결과
    //두번째 인수- modal이 렌더링 될 위치인 DOM 요소

    //createPortal을 사용해서 만드는 이유
    //전체화면을 다 뒤덮는 그러한 글로벌한 요소들이 될탠데 특정 페이지 컴포넌트에서 보면<div></div>안에 들어가 있으면 어색하기때문에
    //dom요소안에 modal-root에 고정적으로 모달이 위치하게끔 설정
    return createPortal(<dialog>{children}</dialog>, document.getElementById('modal-root') as HTMLElement);
}
