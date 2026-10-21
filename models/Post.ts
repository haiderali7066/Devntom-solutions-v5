
import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      maxlength: 120,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 320,
    },
    content: {
      type: String,
      required: true,
    },
    coverImage: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
      alt: { type: String, default: "", maxlength: 160 },
    },
    category: {
      type: String,
      default: "General",
      trim: true,
      maxlength: 60,
    },
    tags: {
      type: [String],
      default: [],
    },
    author: {
      type: String,
      default: "Devntom Solutions",
      trim: true,
      maxlength: 80,
    },
    seoTitle: {
      type: String,
      default: "",
      trim: true,
      maxlength: 70,
    },
    seoDescription: {
      type: String,
      default: "",
      trim: true,
      maxlength: 170,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    readingTime: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true },
);

postSchema.index({ status: 1, publishedAt: -1 });

// Keep readingTime and publishedAt consistent on every document save.
postSchema.pre("save", function () {
  const words = this.content
    .replace(/<[^>]*>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  this.readingTime = Math.max(1, Math.round(words / 200));

  if (this.status === "published" && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  if (this.status === "draft") {
    this.publishedAt = null;
  }
});

export type PostDoc = InferSchemaType<typeof postSchema>;

export const Post: Model<PostDoc> =
  (mongoose.models.Post as Model<PostDoc>) ||
  mongoose.model<PostDoc>("Post", postSchema);
