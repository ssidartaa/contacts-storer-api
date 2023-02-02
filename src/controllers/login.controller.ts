import { Request, Response } from "express";
import loginService from "../services/login.service";

const LoginController = async (req: Request, res: Response) => {
  const client: ILoginRequest = req.body;

  const token = await loginService(client);

  return res.status(200).json(token);
};

export default LoginController;
