import { Schema, Types, model } from "mongoose";
import { IReview, IReviewModel } from "./review.interface";

const reviewSchema = new Schema<IReview>(
  {
    title: {
      type: String,
      required: true,
    },
    bookId: { type: Types.ObjectId, ref: "Book", required: true },
    user: { type: Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.updatedAt;
        delete ret.__v;
      },
    },
  },
);

const Review = model<IReview, IReviewModel>("Review", reviewSchema);

export default Review;
