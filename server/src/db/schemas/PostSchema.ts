import { Schema } from 'mongoose';

const CommentSchema = new Schema(
  {
    content: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  {
    timestamps: true,
  }
);

const TagSchema = new Schema({
  tag_name: {
    type: String,
  },
});

const PostSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    contents: {
      type: String,
      required: true,
    },
    post_image: {
      type: [String],
    },
    priate: {
      type: Boolean,
      default: false,
    },
    tag_list: {
      type: [TagSchema],
    },
    like: {
      type: Number,
      default: 0,
    },
    comments: {
      type: [CommentSchema],
    },
    meal: {
      type: Schema.Types.ObjectId,
    },
    routine: {
      type: Schema.Types.ObjectId,
    },
  },
  {
    collection: 'posts',
    timestamps: true,
  }
);
export { PostSchema };
