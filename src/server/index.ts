import axios, { AxiosResponse } from "axios";
import ElementUI from "element-ui";
import { entryRouter } from "@router/index";
import { session } from "@utils/index";

export default axios;


export class Restful {

    constructor() { }

    protected get(opt: GetType) {
        const { url, params } = opt;
        let temps = "?";
        for (let key in params) {
            temps += key + "=" + params[key] + "&";
        }
        temps = temps.substring(0, temps.length - 1);
        return axios.get(`${url}${temps}`);
    }


    protected post(opt: GetType) {
        const { url, params } = opt;
        return axios.post(`${url}`, params);
    }


    protected put(opt: GetType) {
        const { url, params } = opt;
        return axios.put(`${url}`, params);
    }


    protected del(opt: GetType) {
        const { url, params } = opt;
        // let temps = "?";
        // for (let key in params) {
        //     temps += key + "=" + params[key] + "&";
        // }
        // temps = temps.substring(0, temps.length - 1);
        // return axios.delete(`${url}${temps}`);
        return axios.delete(url, {
            data: params
        });
    }

}

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});



// Add a response interceptor
axios.interceptors.response.use((response): AxiosResponse<ResType> => {
    let res: ResType = response.data;
    // Do something with response data
    switch (res.status) {
        // "suc" | "error" | "red"
        case "suc":
            break;
        case "error":
            ElementUI.Notification.error(res.message);
            break;
        case "red":
            if (window.location.hash.indexOf("/login") === -1) {
                window.location.reload();
            }
            entryRouter.push("/login");
            break;
    }
    return response;
}, function (error: any) {
    // Do something with response error
    return Promise.reject(error);
});


/**
 * @param data	成功时取数据字段		默认是字典映射, 如果是数组会特别标注
 * @param message	失败时取错误信息字段		只可能是字符串, 如果后续失败需要回传参数, 考虑放data中
 * @param status	业务状态		suc - 成功 / error - 失败 / red - 跳转
 * @param url	需要跳转时取跳转地址字段		字符串
 */
export interface ResType {
    data?: any;
    message: string;
    status: "suc" | "error" | "red";
    url?: string;
}

export interface ParamsType {
    [extra: string]: any;
}
export interface GetType {
    url: string;
    params: ParamsType;
}