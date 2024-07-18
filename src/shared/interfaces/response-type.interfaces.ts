export enum ResponseTypes {
  success = 'success',
  error = 'error',
  warning = 'warning',
}
export enum ResponseActions {
  create = 'create',
  get = 'get',
  getAll = 'getAll',
  edit = 'edit',
  delete = 'delete',
  update = 'update',
}
export interface ResponseCrudDescriptionAction {
  create: string;
  get: string;
  getAll: string;
  edit: string;
  delete: string;
  update: string;
}

export interface ResponseDescriptions {
  cruds: {
    error: ResponseCrudDescriptionAction;
    warning: ResponseCrudDescriptionAction;
    success: ResponseCrudDescriptionAction;
  };
}
