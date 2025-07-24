export class ApiResponse {
  constructor(data = null, message = "Success", success = true) {
    this.data = data;
    this.message = message;
    this.success = success;
  }
}
