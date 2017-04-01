export default {
    get: (urls) => {
        return fetch("api/v1/parse", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ urls })
        }).then((result) => {
            return result.json()
                .then((res) => {
                    return result.ok ? res : Promise.reject(res);
                }).catch((res) => {
                    return Promise.reject({ "message": "JSON is invalid" });
                });
        });
    }
}