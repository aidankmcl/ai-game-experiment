type APIError = { error: { message: string } };

export type APIResponse<T> = { data: T } | APIError;

export type ClientsideResponse<T extends APIResponse<unknown>> = Promise<Exclude<T, APIError>['data']>;

export enum ActionType {
  USER = "USER",
  GENERATED = "GENERATED"
}
