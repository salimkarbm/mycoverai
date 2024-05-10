export class OkResponse {
  status: boolean;
  message: string;
  data?: any;
  result: number | undefined;

  constructor(message: string, data?: any) {
    this.status = true;
    this.message = message;

    // Check if data is defined and not empty
    if (data && data.length !== undefined) {
      this.result = data.length;
      this.data = data;
    } else {
      this.result = undefined;
      this.data = data || undefined;
    }
  }
}
