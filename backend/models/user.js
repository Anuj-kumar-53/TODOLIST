import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,   // ✅ corrected
    },
    email: {
      type: String,
      unique: true,
      required: true,   // ✅ corrected
    },
    password: {
      type: String,
      required: true,   // ✅ corrected
    },
    profileImg: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
