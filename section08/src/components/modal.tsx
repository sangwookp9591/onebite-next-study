'use client';

import { ReactNode, useEffect, useRef } from 'react';
import styles from './modal.module.css';
import { createPortal } from 'react-dom';

export default function Modal({ children }: { children: ReactNode }) {
    //createPortal
    //첫번째 인수- modal의 렌더링 결과
    //두번째 인수- modal이 렌더링 될 위치인 DOM 요소

    //createPortal을 사용해서 만드는 이유
    //1.  DOM 계층 구조에서 독립적으로 동작하도록 하기 위해
    //2.  1. CSS z-index 및 레이아웃 제약 해소 모달을 부모 컴포넌트 안에서 렌더링하면, 부모의 overflow: hidden, z-index 값, position 등에 영향을 받아서 화면 전체에 제대로 떠야 하는 모달이 잘리거나 가려질 수 있어요.
    // createPortal을 사용하면 <body>나 별도 의 상위 DOM 노드에 모달을 직접 렌더링해서 이런 스타일 제약을 피할 수 있습니다.

    //전체화면을 다 뒤덮는 그러한 글로벌한 요소들이 될탠데 특정 페이지 컴포넌트에서 보면<div></div>안에 들어가 있으면 어색하기때문에
    //dom요소안에 modal-root에 고정적으로 모달이 위치하게끔 설정

    //dialog tag는 기본적으로 modal의 역할을 하기때문에 처음 렌더링되었을때 modal이 꺼져있는 상태이다.
    const dialogRef = useRef<HTMLDialogElement>(null);

    //modal component가 처음 마운트 되었을때
    useEffect(() => {
        if (!dialogRef.current?.open) {
            //모달이 꺼져있으면
            dialogRef.current?.showModal(); //모달 보이게
            dialogRef.current?.scrollTo({
                top: 0,
            }); //스크롤 위치가 최상단으로 고정
        }
    }, []);
    return createPortal(
        <dialog ref={dialogRef}>{children}</dialog>,
        document.getElementById('modal-root') as HTMLElement
    );
}
