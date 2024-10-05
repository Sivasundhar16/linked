import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },

    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    bannerIma: {
      type: String,
      default: "",
    },
    headline: {
      type: String,
      default: "LinkedIn User",
    },
    locatin: {
      type: String,
      default: "Earth",
    },
    about: {
      type: String,
      default: "",
    },
    skills: [String],
    experience: [
      {
        type: String,
        company: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],
    edication: [
      {
        school: String,
        filedofStudy: String,
        startYear: Number,
        endYear: Number,
      },
    ],
    connection: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
export default User;
//siva
