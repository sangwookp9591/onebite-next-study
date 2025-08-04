export default async function fetchBooks() {
    const url = `http://localhost:12345/book`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error();
        }
    } catch (err) {
        console.log(err);
        return [];
    }
}
