export interface IConfigRequest {
  headers: object;
  params: {
    start?: string;
    end?: string;
    fields: string;
  };
}
