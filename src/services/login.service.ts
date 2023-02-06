import { compareSync } from "bcryptjs";

import jwt from "jsonwebtoken";

import { clientRepository } from "../utils/getRepositories.utils";

import AppError from "../errors/appError";

import { ILoginRequest } from "../interfaces";

import { loginSerializer } from "../serializers/login.serializer";

const loginService = async ({
  email,
  password,
}: ILoginRequest): Promise<string> => {
  await loginSerializer.validate(
    { email, password },
    {
      stripUnknown: true,
      abortEarly: true,
    }
  );

  const client = await clientRepository.findOneBy({ email: email });

  if (!client) {
    throw new AppError("Wrong email/password", 403);
  }

  const checkedPassword = compareSync(password, client.password);

  if (!checkedPassword) {
    throw new AppError("Wrong email/password", 403);
  }

  const token = jwt.sign({}, String(process.env.SECRET_KEY), {
    expiresIn: "1d",
    subject: client.id,
  });

  return token;
};

export default loginService;
