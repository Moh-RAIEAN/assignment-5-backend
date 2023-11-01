import { Secret, SignOptions, sign, verify } from "jsonwebtoken";
import { IJwtPayload } from "./jwt.helpers.interface";

const createToken = (
  payload: IJwtPayload,
  secret: Secret,
  options: SignOptions,
) => {
  const token = sign(payload, secret, options);
  return token;
};

const verifyToken = (token: string, secret: Secret) => {
  return verify(token, secret);
};

export const JwtHelpers = { createToken, verifyToken };
