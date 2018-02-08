import Vue from "vue";
import { USER } from "@store/user.center.type";
import { TABLECONFIG } from "@store/table.type";
import { ORGANIZATION } from "@store/organization.type";
import { MYWEBSITEEVENT } from "@store/mywebsite.type";
import { NOTICEEVENT } from "@store/notice.type";
import { LOGADUITEVENT } from "@store/log.aduit.type";
import { REPORTEVENT } from "@store/report.type";

export const vm = new Vue({});




interface ListenerType {
    listener: string;
    event: string;
    fn: Function;
}

export const CONSTANT = (<any>Object).assign({}, USER, TABLECONFIG, ORGANIZATION, MYWEBSITEEVENT, NOTICEEVENT, LOGADUITEVENT, REPORTEVENT);
/**
 *Author wjt
 *Date 2017-12-26
 *Note 通知服务
 */
export class Event {
    public listeners: ListenerType[] = new Array<ListenerType>();
    public constant: any = {};

    constructor(constant: any) {
        this.constant = constant;
    }

    public register(event: string, fn: Function): string {
        let listener: string = new Date().getTime() + "WJT";
        if (this.isConstantExist(event)) {
            this.listeners.push({ listener: listener, event: event, fn: fn });
        } else {
            // 事件未定义
            console.error("register event is not exist:" + event);
        }
        return listener;
    }

    unRegister(listener: string) {
        this.listeners.map((item: ListenerType, $index: number) => {
            if (listener === item.listener) {
                this.listeners.splice($index, 1);
            }
        });
        // TODO 打印注册的事件和观注者
        // var result = [];
        // var findstr = "quickEntryController";
        // angular.forEach(listeners,function(item){
        //  if (item.listener.indexOf(findstr) > -1) {
        //    result.push(item);
        //  }
        // });
        // console.log("after unRegister has left****************");
        // console.log(result);
        // TODO END
    }

    doNotify(event: string, info?: any, delay?: number) {
        if (this.isConstantExist(event)) {
            if (typeof delay === "undefined") {
                delay = 0;
            }
            window.setTimeout(
                () => {
                    this.listeners.map((item, $index) => {
                        if (event === item.event) {
                            if (typeof item.fn === "function") {
                                item.fn(event, info);
                            }
                        }
                    });
                },
                delay
            );
        } else {
            // 事件未定义
            console.error("doNotify event is not exist:" + event);
        }
    }


    // 检查常量是否定义
    public isConstantExist(key: string) {
        let isExist = false;
        for (let $index in this.constant) {
            if (key === this.constant[$index]) {
                isExist = true;
            }
        }
        return isExist;
    }
}


export const EventBus = new Event(CONSTANT);







