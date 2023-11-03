import mongoose from "mongoose";
import { z } from "zod";

const createBookZodValitaionSchema = z.object({
  body: z
    .object({
      title: z.string().trim().toLowerCase(),
      author: z.string().trim().toLowerCase(),
      genre: z.string().trim().toLowerCase(),
      publicationYear: z.string().trim().toLowerCase(),
      image: z.string(),
      user: z.custom<string>((value) => {
        if (!value) {
          throw new z.ZodError([
            {
              path: ["userId"],
              code: "custom",
              message: "user field is required!",
            },
          ]);
        } else if (!mongoose.Types.ObjectId.isValid(value as string)) {
          throw new z.ZodError([
            { path: ["userId"], code: "custom", message: "invalid user" },
          ]);
        }
        return value;
      }),
    })
    .strict({
      message:
        "please provide only title, author, genre, publicationYear, user fileds only!",
    }),
});

const getBookZodValitaionSchema = z.object({
  params: z.object({
    bookId: z.custom<string>((value) => {
      if (!mongoose.Types.ObjectId.isValid(value as string)) {
        throw new z.ZodError([
          { path: ["userId"], code: "custom", message: "invalid book id" },
        ]);
      }
      return value;
    }),
  }),
});
const updateBookZodValitaionSchema = z.object({
  params: z.object({
    bookId: z.custom<string>((value) => {
      if (!value) {
        throw new z.ZodError([
          {
            path: ["userId"],
            code: "custom",
            message: "bookId is required!",
          },
        ]);
      } else if (!mongoose.Types.ObjectId.isValid(value as string)) {
        throw new z.ZodError([
          { path: ["userId"], code: "custom", message: "invalid book id" },
        ]);
      }
      return value;
    }),
  }),
  body: z
    .object({
      title: z.string().trim().toLowerCase().optional(),
      author: z.string().trim().toLowerCase().optional(),
      genre: z.string().trim().toLowerCase().optional(),
      publicationYear: z.string().trim().toLowerCase().optional(),
      image: z.string().optional(),
    })
    .strict({
      message:
        "please provide only title, author, genre and publicationYear fileds only!",
    }),
});

export const BookValidations = {
  createBookZodValitaionSchema,
  getBookZodValitaionSchema,
  updateBookZodValitaionSchema,
};
