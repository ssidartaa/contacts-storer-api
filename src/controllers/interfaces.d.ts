interface IClientRequest {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

type ILoginRequest = Pick<IClientRequest, "email" | "password">;

type IUpdateClientRequest = Partial<IClientRequest>;
