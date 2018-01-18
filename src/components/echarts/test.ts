function gg(val1: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
        let method = descriptor.value;
        descriptor.value = function () {
            console.log(arguments, propertyKey);
            arguments[0] = arguments[0] + "123123";
            method.apply(this, arguments);
        };
    };
}


function classgg(val: string) {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            newProperty = "new property";
            hello = "override";
        };
    };
}


@classgg("666")
export class C {
    public hello: string;

    @gg("23")
    public a(val: string) {
        console.log(arguments);
        console.log(val);
        console.log(this.hello);
    }
}



