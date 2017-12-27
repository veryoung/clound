export class Auxiliary<T> {
    private ids: T[] = [];

    public insertId(id: T) {
        let flag = true;
        this.ids.map((item, $index) => {
            if (id === item) {
                flag = false;
            }
        });
        if (flag) {
            this.ids.push(id);
        }
    }

    public getIds(): T[] {
        return this.ids;
    }
}