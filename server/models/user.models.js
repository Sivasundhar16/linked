import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: Sting,
      require: true,
      unique: true,
    },

    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: Sting,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    profilePicture: {
      type: Sting,
      default: "",
    },
    bannerIma: {
      type: Sting,
      default: "",
    },
    headline: {
      type: Sting,
      default: "LinkedIn User",
    },
    locatin: {
      type: Sting,
      default: "Earth",
    },
    about: {
      type: Sting,
      default: "",
    },
    skills: [Sting],
    experience: [
      {
        type: Sting,
        company: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],
    edication: [
      {
        school: Sting,
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
