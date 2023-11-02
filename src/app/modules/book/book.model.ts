import { Schema, Types, model } from "mongoose";
import { IBook, IBookModel } from "./book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: { type: String, required: true },
    publicationYear: { type: String, required: true },
    image: { type: String, required: true },
    user: { type: Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
      },
    },
  },
);

const Book = model<IBook, IBookModel>("Book", bookSchema);

export default Book;
