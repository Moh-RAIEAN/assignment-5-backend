import mongoose from "mongoose";
import { z } from "zod";

const getUserZodValidationSchema = z.object({
  params: z.object({
    userId: z.custom<string>((value) => {
      if (!mongoose.Types.ObjectId.isValid(value as string)) {
        throw new z.ZodError([
          { path: ["userId"], code: "custom", message: "invalid userId" },
        ]);
      }
      return value;
    }),
  }),
});

export const UsersValidations = {
  getUserZodValidationSchema,
};
