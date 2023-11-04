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

const getBookReviewsZodValitaionSchema = z.object({
  params: z.object({
    bookId: z.custom<string>((value) => {
      if (!mongoose.Types.ObjectId.isValid(value as string)) {
        throw new z.ZodError([
          { path: ["bookId"], code: "custom", message: "invalid bookId" },
        ]);
      }
      return value;
    }),
  }),
});

const updateBookReviewsZodValitaionSchema = z.object({
  params: z.object({
    reviewId: z.custom<string>((value) => {
      if (!mongoose.Types.ObjectId.isValid(value as string)) {
        throw new z.ZodError([
          { path: ["reviewId"], code: "custom", message: "invalid reviewId" },
        ]);
      }
      return value;
    }),
  }),
  body: z
    .object({
      title: z.string().trim().optional(),
    })
    .strict({ message: "please provide only title filed!" }),
});

const deleteBookReviewsZodValitaionSchema = z.object({
  params: z.object({
    reviewId: z.custom<string>((value) => {
      if (!mongoose.Types.ObjectId.isValid(value as string)) {
        throw new z.ZodError([
          { path: ["reviewId"], code: "custom", message: "invalid reviewId" },
        ]);
      }
      return value;
    }),
  }),
});
export const reviewValidations = {
  createReviewZodValitaionSchema,
  getBookReviewsZodValitaionSchema,
  updateBookReviewsZodValitaionSchema,
  deleteBookReviewsZodValitaionSchema,
};
