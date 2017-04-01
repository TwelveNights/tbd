const API_URL = "/api/v1";

export default {
    get: (url) => {
        return fetch(API_URL + url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((result) => {
            return result.json()
                .then((res) => {
                    return result.ok ? res : Promise.reject(res);
                }).catch((res) => {
                    return Promise.reject(res);
                });
        });
    },

    put: (url, data) => {
        return fetch(API_URL + url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)
        }).then((result) => {
            return result.json()
                .then((res) => {
                    return result.ok ? res : Promise.reject(res);
                }).catch((res) => {
                    return Promise.reject(res);
                });
        });
    },

    post: (url, data) => {
        return fetch(API_URL + url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)
        }).then((result) => {
            return result.json()
                .then((res) => {
                    return result.ok ? res : Promise.reject(res);
                }).catch((res) => {
                    return Promise.reject(res);
                });
        });
    },

    delete: (url, data) => {
        return fetch(API_URL + url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)
        }).then((result) => {
            return result.json()
                .then((res) => {
                    return result.ok ? res : Promise.reject(res);
                }).catch((res) => {
                    return Promise.reject(res);
                });
        });
    }
}
