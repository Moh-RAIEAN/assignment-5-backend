import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const Configs = {
  env: process.env.NODE_ENV,
  dbUrl: process.env.DB_URL,
  port: process.env.PORT,
  bcryptSaltRound: process.env.BCRYPT_SALT_ROUND,
  jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  jwtAccessTokenExpirationDate: process.env.JWT_ACCESS_TOKEN_EXPIRATION_DATE,
  jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  jwtRefreshTokenExpirationDate: process.env.JWT_REFRESH_TOKEN_EXPIRATION_DATE,
};

export default Configs;
