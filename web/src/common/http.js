export default {
    get: (urls) => {
        fetch("api/v1/parse", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ urls })
        })
        .then((result) => result.json());
    }
}