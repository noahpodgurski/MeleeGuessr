export type ApiResponse = {
  statusCode: number;
  body: {
    message: string;
    data: any;
  };
};
