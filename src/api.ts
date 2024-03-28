class API {
    constructor(private readonly url: string) {
    }

    public async get(path: string) {
        const res = await fetch(this.url + `${path}`, {method: "GET",})
        return res
    }

    public async post<T>(path: string, body: T) {
        const res = await fetch(this.url + `${path}`, {method: "POST", body: JSON.stringify(body)})
        return res
    }
}

//const api = new API("http://26.64.250.196:8080");
const api = new API("http://localhost:8080");

export default api