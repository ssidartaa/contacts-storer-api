export type ILoginRequest = Pick<IClientRequest, "email" | "password">;

export interface IClientRequest {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export type IUpdateClientRequest = Partial<IClientRequest>;

export type IContactRequest = Pick<
  IClientRequest,
  "email" | "fullName" | "phoneNumber"
>;

export type IUpdateContactRequest = Partial<IContactRequest>;
