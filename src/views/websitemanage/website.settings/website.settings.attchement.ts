export interface FormType {
    ads_enable: string;
    cache_url_black: string;
    cache_urls: Array < string >;
    cdn_enable: string;
    mirror_enable: string;
    mirror_interval: number;
    mirror_urls: Array < string >;
    waf_enable: string;
    waf_hotlink_white: Array < string >;
    waf_ip_black: Array < string >;
    waf_ip_white: Array < string >;
    waf_url_black: Array < string >;
    waf_url_white: Array < string >;
}