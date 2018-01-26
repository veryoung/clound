import { EventType } from "@store/store";


export const LOGSADUITEVENT: EventType = {
    GETLISTMESSAGE: "获取日志审计列表数据",
    GETLOGSADUITCONFIG: "获取日志审计列表配置信息",
};

export interface LogsAduitType {
    tableData: LogsAduitTableType;
    logsaduitConfig: LogsAduitConfig;
}

//  表格段
export interface LogsAduitTableType {
    [extra: string]: TableCloums[];
}

interface TableCloums {
    email: string;
    ip: string;
    op_detail: string;
    op_ret: string;
    op_time: string;
    op_type: string;
    user: string;
}

// 列表配置
export interface LogsAduitConfig {
    [extra: string]: LogsAduitConfigType;
}

interface LogsAduitConfigType {
    email: string;
    ip: string;
    op_detail: string;
    op_ret: string;
    op_time: string;
    op_type: string;
    user: string;
}