export class ApiResponse {
    constructor(success, data, meta = null) {
        this.success = success;
        this.data = data;
        if (meta) {
            this.meta = meta;
        }
    }
}
