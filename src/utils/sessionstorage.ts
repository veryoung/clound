export class SessionStorage {
    constructor() { }


    public setItem(key: string, opt: any) {
        try {
            let data: string = JSON.stringify(opt);
            window.sessionStorage.setItem(key, data);
        } catch (error) {
            console.warn(error);
        }
    }

    public getItem(key: string) {
        try {
            let data: string | null = window.sessionStorage.getItem(key);
            if (data === null) {
                return data;
            }
            return JSON.parse(data);
        } catch (error) {
            console.warn(error);
        }

    }

    public removeItem(key: string) {
        try {
            window.sessionStorage.removeItem(key);
        } catch (error) {
            console.warn(error, key);
        }
    }
}


export const session = new SessionStorage();