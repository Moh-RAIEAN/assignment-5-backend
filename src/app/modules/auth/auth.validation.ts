import { z } from "zod";

const loginValidationZodSchema = z.object({
  body: z
    .object({ email: z.string(), password: z.string() })
    .strict({ message: "please provide only email and password" }),
});
export const AuthValidations = { loginValidationZodSchema };
