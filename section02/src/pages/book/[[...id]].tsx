import { useRouter } from 'next/router';

export default function Page() {
    const router = useRouter();

    console.log('router : ', router);

    const { id } = router.query;

    //dynamic route도 query property안에 똑같이 들어있음
    //만약 slug를 여러개 하려면 ...id로 만들고 이거의 이름은 catch ALl Segement라고 부른다. 모든 url에 대응하겠다.
    // /book을 하면 404가 ㄷ나오는데 , 이걸 방지하려면 index.tsx로하면되지만
    //[[...id]] -> catch all segment를 대괄호로 한번 더 묶어주면 /book 뒤에 범용성있게 뭐가 오든 상관없으면 대괄호로 만들면된다

    return <h1>book {id}</h1>;
}
