export default function Page({ params }: { params: { id: string | string[] } }) {
    return <div>book/[id] page입니다. : {params?.id}</div>;
}
