class Exception extends Error {
    public statusCode: number;
    public errorCode: string;
  
    constructor({
      message,
      errorCode,
      statusCode,
    }: {
      message: string;
      statusCode: number;
      errorCode: number;
    }) {
      super(message);
      this.statusCode = statusCode;
      this.errorCode = errorCode.toString();
  
      Object.setPrototypeOf(this, Exception.prototype);
    }
  }
  
  export default Exception;
  