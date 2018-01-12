class RoleDict {
    private dict: DictType[] = new Array<DictType>();
    constructor() {
        this.dict = [
            {
                name: "系统管理员",
                ufcode: "sm"
            },
            {
                name: "运营管理员",
                ufcode: "om"
            },
            {
                name: "日志审计员",
                ufcode: "am"
            },
            {
                name: "企业管理员",
                ufcode: "em"
            },
            {
                name: "普通用户",
                ufcode: "um"
            }
        ];
    }

    public turn(value: string): string {
        for (let item of this.dict) {
            if (item.name === value) {
                return item.ufcode;
            }
            if (item.ufcode === value) {
                return item.name;
            }
        }
        return "错误的输入" + value;
    }

    public ufcode(value: string): string {
        for (let item of this.dict) {
            if (item.name === value) {
                return item.ufcode;
            }
            if (item.ufcode === value) {
                return item.ufcode;
            }
        }
        return "错误的输入" + value;
    }
}


interface DictType {
    name: string;
    ufcode: string;
}


export const roleDict = new RoleDict();