import { NextApiRequest, NextApiResponse } from 'next';
//api/revalidate 라는 경로로 요청하면 아래의 핸들러를 실행

//revalidate 요청을 처리할 api route
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        //index 페이지를 요청받았을때 revalidate ->재생성시킴
        await res.revalidate('/'); // 어떤경로를 revalidate 할것인지?
        return res.json({ revalidate: true }); //요청이 설공했다는 가정하에 revalidate : true를 반환함
    } catch (err) {
        console.log('revalidate err : ', err);
        res.status(500).send('Revalidation Failded');
    }
}
