import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", (next) => {
  console.log("Saving user");
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
