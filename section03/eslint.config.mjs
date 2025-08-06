/**
 * 2024년 11월 Next.js 15.0.3 버전이 출시 되면서
ESLint 관련 설정이 기존보다 조금 더 엄밀하게 변경되었어요

구체적으로는 any 타입을 명시적으로 지정하거나 또는
사용하지 않는 변수를 선언해 둘 경우 오류가 발생해요
 */

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    {
        // 이 부분이 추가됩니다!
        rules: {
            '@typescript-eslint/no-unused-vars': 'warn', //사용하지 않는 변수가 있을 때 경고로 표시해요
            '@typescript-eslint/no-explicit-any': 'off', //any 타입을 명시적으로 정의할 수 있도록 허용해요
        },
    },
];

export default eslintConfig;
