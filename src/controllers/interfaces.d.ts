interface IClientRequest {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

interface IUpdateClientRequest {
  fullName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
}
