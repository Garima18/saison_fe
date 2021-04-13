// export const baseUrl = "https://ozonicsassets.com/ozonics/";
export const baseUrl = "http://127.0.0.1:8080/card-scheme/";

export const get = (url, options = null) => {
    const response = new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.open("GET", url);
        req.onreadystatechange = result => {
            if (req.readyState === 4) {
                if (req.status === 200) resolve(JSON.parse(req.response));
                else if (req.status === 401 || req.status === 403) {
                    handleReject(reject, "Unauthorised", { refresh: true });
                }
                else {
                    handleReject(reject, "Something went wrong. Code: " + req.status);
                }
            }
        };
        if (options) setRequestProperties(req, options);
        req.send();
    });
    return response;
}

export const post = (url, body, options = null) => {
    const response = new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.open("POST", url);
        req.onreadystatechange = result => {
            if (req.readyState === 4) {
                console.log("stata:"+req.status);
                
                if (req.status === 200) resolve(JSON.parse(req.response));
                else if (req.status === 401 || req.status === 403) {
                    handleReject(reject, "Unauthorised", { refresh: true });
                }
                else {
                    handleReject(reject, "Something went wrong. Code: " + req.status);
                }
            }
        };
        console.log("request"+req);
        
        if (options) setRequestProperties(req, options);
        req.send(JSON.stringify(body));
    });
    return response;
};


function setRequestProperties(req, { headers }) {
    if (headers) {
        req.headers = {
            ...headers
        };
    }
}
function handleReject(reject, msg, { refresh, redirect } = { refresh: false, redirect: false }) {
    reject(msg);
    if (refresh) {
        localStorage.clear();
        window.location.reload();
    } else if (redirect) {
        localStorage.clear();
        window.location.href = redirect;
    }
}