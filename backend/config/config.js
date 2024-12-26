import mongoose from "mongoose";
// import dotenv from "dotenv";
import { Data } from "../Data.js";
import { Datamodel } from "../model/Datamodel.js";
// dotenv.config();
// import { Sample_users } from "../Data.js";
// import { UserModel } from "../model/user.js";

const MONGO_URL = "mongodb://localhost:27017/data_DB";

export const dbconnect = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected successfully to MongoDB");
    await seedData();
    // await seedUsers();
  } catch (error) {
    console.error("Database connection error :", error.message);
  }
};

async function seedData() {
  try {
    const dataCount = await Datamodel.countDocuments();
    // console.log(dataCount);
    if (dataCount > 0) {
      console.log("Data seed is already done!");
      return;
    }
    await Datamodel.insertMany(Data);
    console.log("Data seed is done!");
  } catch (error) {
    console.error("Error during data seeding", error.message);
  }
}

// async function seedUsers() {
//   try {
//     const userCount = await UserModel.countDocuments();
//     if (userCount > 0) {
//       console.log("Data seed for User is already done!");
//       return;
//     }
//     await UserModel.insertMany(Sample_users);
//     console.log("Data seed for User is done!");
//   } catch (error) {
//     console.error("Error during User seeding:", error.message);
//   }
// }
