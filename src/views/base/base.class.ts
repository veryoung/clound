import Vue from "vue";
import { Config } from "@store/table.type";

export class ListBaseClass extends Vue {
    /**
     * @param href 导出路径
     */
    protected exportFile(href: string) {
        let dom: any = document.createElement("a");
        dom.href = href;
        dom.target = "_blank";
        dom.click();
    }

    /**
     * @param opt 数组对象
     * @param filter 过滤对象
     */
    protected mergeData(opt: Config, ...args: any[]) {
        const { page_size, page } = opt;
        let temp: any = {};
        for (let arg of args) {
            temp = (<any>Object).assign(temp, arg);
        }
        return (<any>Object).assign({}, temp, {
            page: page,
            page_size: page_size,
        });
    }

    /**
     * 
     * @param obj 需要转化的对象
     */
    protected objToUrl(obj: any) {
        let temp: string = "";
        for (let $index in obj) {
            temp += `&${$index}=${obj[$index]}`;
        }
        return temp;
    }
}

