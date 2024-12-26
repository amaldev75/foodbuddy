// import mongoose from "mongoose";

import { model, Schema } from "mongoose";

//Dataschema
const dataSchema = new Schema(
  {
    title: { type: String, required: true },
    imgsrc: { type: String, required: true },
    content: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: false },
    timestamps: true,
  }
);

export const Datamodel = model("Data", dataSchema);
