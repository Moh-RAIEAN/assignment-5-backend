import { z } from "zod";

const registerValidationZodSchema = z.object({
  body: z
    .object({
      email: z.string(),
      password: z.string(),
      profileImage: z.string(),
    })
    .strict({
      message: "please provide only email, password and profileImage",
    }),
});

const loginValidationZodSchema = z.object({
  body: z
    .object({ email: z.string(), password: z.string() })
    .strict({ message: "please provide only email and password" }),
});

const refreshTokenValidationZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string(),
  }),
});

export const AuthValidations = {
  loginValidationZodSchema,
  registerValidationZodSchema,
  refreshTokenValidationZodSchema,
};
