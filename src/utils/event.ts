interface Listener {
    id: string;
    event: string;
    fn: Function;
}

interface Constant {
    [extraProps: string]: any;
}

/**
 * author:wjt
 * 事件通知类
 */
class Event {
    private static listeners: Array<Listener> = new Array<Listener>();
    private static constant: Constant = new Object();

    // 检查常量是否定义
    private isConstantExist(key: string) {
        let isExist = false;
        for (let $index in Event.constant) {
            if (key === $index) {
                isExist = true;
            }
        }
        return isExist;
    }

    // 注册
    public register(event: string, fn: Function) {
        let eventId = new Date().getTime() + event;
        Event.listeners.push({
            id: eventId,
            event: event,
            fn: fn
        });
        return eventId;
    }

    // 注销
    public unRegister(eventId: string) {
        Event.listeners.map((item, $index) => {
            if (item.id === eventId) {
                Event.listeners.splice($index, 1);
                return;
            }
        });
        console.error("error eventId:", eventId);
    }

    /**
     * 执行通知
     * 参数:event 事件名   类型:constant常量
     * 参数:info  事件数据 类型:Object
     * 参数:delay 延迟执行时间 类型:int
     * 返回值类型:无
     */
    public doNotify(event: string, info: any, delay?: number) {
        let flag = true;
        if (typeof delay === "undefined") {
            delay = 0;
        }
        setTimeout(
            () => {
                Event.listeners.map((item, $index) => {
                    if (item.event === event) {
                        if (item.fn && typeof item.fn === "function") {
                            if (info) {
                                item.fn(info, event);
                            } else {
                                item.fn(event);
                            }
                            flag = false;
                        }
                    }
                });
                if (flag) {
                    console.error("doNotify event is not exist:", event);
                }
            },
            delay
        );

    }
}


export const EventBus = new Event();