/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { IJwtPayload } from "../../helpers/jwtHelpers/jwt.helpers.interface";

declare global {
  namespace Express {
    interface Request {
      user: IJwtPayload | null;
    }
  }
}
