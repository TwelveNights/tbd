export default {
    get: () => {
        fetch("/query", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.parse({})
        })
        .then((result) => result.json());
    }
}