import { ResType } from "server";
import { AxiosResponse } from "axios";
import { MywebsiteServer } from "@server/mywebsite";
import { TableConfigType } from "@store/table.type";
import { MYWEBSITEEVENT, MyWebsiteType, WebsiteTableType } from "@store/mywebsite.type";
import { CloudTable } from "@components/cloudtable/table";
import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";



import { ModuleTitle } from "@components/title/module.title";
import { SetCol } from "@components/setcol/setcol";
import { EventBus, CONSTANT, vm } from "@utils/event";
import { Auxiliary } from "@utils/auxiliary";
import { WEBSITEANALYSISEVENT } from "@store/website.analysis.type";
import { ListBaseClass } from "@views/base/base.class";



const Aux = new Auxiliary<string>();
require("./website.pandect.styl");
@Component({
    name: "websitepandect",
    template: require("./website.pandect.html"),
    components: {
        ModuleTitle, SetCol, CloudTable
    },
    computed: {
        ...mapGetters([
            "tableConfig",
            "WebsitePandecttableData"
        ])
    }
})
export class WebsitePandect extends ListBaseClass {
    // init computed
    public WebsitePandecttableData: WebsitePandectType;
    public tableConfig: TableConfigType;

    // init data
    public titles: string[] = ["网站分析"];
    public filterData: SearchType = {
        domain: "",
        level: "0",
        name: "",
    };
    public filter: SearchType = (<any>Object).assign({}, this.filterData);
    public WebsitePandectData: WebsitePandectTableType[] = new Array<WebsitePandectTableType>();
    // watch
    public unwatch: Function = () => { };

    // lifecircle hook 
    created() {
        this.$store.dispatch(WEBSITEANALYSISEVENT.GETWEBSITEPANDECTDATA, this.mergeData(this.tableConfig["websitepandecttable"], this.filter));
        let that = this;

        let ListId = EventBus.register(WEBSITEANALYSISEVENT.GETWEBSITEPANDECTDATA, function (event: string, info: any) {
            that.WebsitePandectData = (<any>Object).assign([], that.WebsitePandecttableData[that.tableConfig["websitepandecttable"].page - 1]);
        });
      
    }

    destroyed() {
        // Aux.getIds().map((id, $idnex) => {
        //     EventBus.unRegister(id);
        // });
        // this.unwatch();
    }

    // init method
    search() {
        this.$store.dispatch(WEBSITEANALYSISEVENT.GETWEBSITEPANDECTDATA, this.mergeData(this.tableConfig["websitepandecttable"], this.filter));
    }

    reset() {
        this.filter = (<any>Object).assign({}, this.filterData);
        this.$store.dispatch(WEBSITEANALYSISEVENT.GETWEBSITEPANDECTDATA, this.mergeData(this.tableConfig["websitepandecttable"], this.filter));
    }

    handleSizeChange(val: number) {
        this.tableConfig.websitepandecttable.page_size = val;
        this.$store.dispatch(WEBSITEANALYSISEVENT.GETWEBSITEPANDECTDATA, this.mergeData(this.tableConfig["websitepandecttable"], this.filter));
    }
    handleCurrentChange(val: number) {
        this.tableConfig.websitepandecttable.page = val;
        this.$store.dispatch(WEBSITEANALYSISEVENT.GETWEBSITEPANDECTDATA, this.mergeData(this.tableConfig["websitepandecttable"], this.filter));
    }
    handleSelectionChange() {
        
    }


    handle(opt: any) {
        console.log(opt);
        let id = opt.row.id;
        this.$router.push(`/WebsiteAnalysis/WebsitePandect/look/${id}`);
    }

    sortChange(opt: any) {

    }


}


export interface SearchType {
    domain: string	;
    level: number | string;
    name: string;
}
interface WebsitePandectTableType {
    ads_flux: string;
    ads_req: string;
    cc_attack: string;
    domain: string;
    id: string;
    level: number;
    name: string;
    web_attack: number;
}

export interface WebsitePandectType {
    [extra: string]: WebsitePandectTableType[];
}