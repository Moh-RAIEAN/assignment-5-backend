import mongoose from "mongoose";
import { z } from "zod";

const createReviewZodValitaionSchema = z.object({
  body: z
    .object({
      title: z.string(),
      bookId: z.custom<string>((value) => {
        if (!value) {
          throw new z.ZodError([
            {
              path: ["bookId"],
              code: "custom",
              message: "booKId field is required!",
            },
          ]);
        } else if (!mongoose.Types.ObjectId.isValid(value as string)) {
          throw new z.ZodError([
            { path: ["bookId"], code: "custom", message: "invalid bookId" },
          ]);
        }
        return value;
      }),
    })
    .strict({ message: "please provide only title and bookId fileds" }),
});

export const reviewValidations = { createReviewZodValitaionSchema };
