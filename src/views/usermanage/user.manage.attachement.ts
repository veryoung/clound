import { ColumnType } from "@components/cloudtable/table.attachment";

export const testfn = (len: number) => {
    let temp = [];
    for (let i = 0; i < len; i++) {
        temp.push({
            date: new Date().getTime(),
            name: "王小虎" + i,
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1518 弄",
            zip: 200333
        });
    }
    return temp;
};

export const test: any = testfn(20);

export const columns: ColumnType[] = [
    {
        prop: "date",
        label: "序号",
        sortable: true,
        show: true
    },
    {
        prop: "name",
        label: "用户名",
        show: true
    },
    {
        prop: "province",
        label: "用户角色",
        show: true
    },
    {
        prop: "city",
        label: "创建人",
        show: true
    },
    {
        prop: "address",
        label: "企业名称",
        show: true
    },
    {
        prop: "zip",
        label: "手机号码",
        show: true
    },
    {
        prop: "zip",
        label: "邮箱",
        show: true
    },
    {
        prop: "zip",
        label: "创建时间",
        show: true
    },
    {
        prop: "zip",
        label: "到期时间",
        show: true
    },
    {
        prop: "zip",
        label: "状态",
        show: true
    },
];