export enum ResponseTypes {
  success = 'success',
  error = 'error',
  warning = 'warning',
}
export enum ResponseActions {
  create = "create",
  get = "get",
  getAll = "getAll",
  edit = "edit",
  delete = "delete",
}
export interface ResponseCrudDescription {
  create: string;
  get: string;
  getAll: string;
  edit: string;
  delete: string;
}