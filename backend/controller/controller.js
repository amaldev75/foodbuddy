import { Datamodel } from "../model/Datamodel.js";

export const Homepage = (req, res) => {
  res.send("Welcome");
};

export const getData = async (req, res) => {
  try {
    const data = await Datamodel.find();
    res.json(data);
  } catch (error) {
    res.status(500).send("Error retrieving data from database");
  }
};
