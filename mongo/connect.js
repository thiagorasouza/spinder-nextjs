import mongoose from "mongoose";

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    mongoose.connection.on("error", (error) => {
      console.log(error);
      throw new Error("There was a problem with the database connection");
    });
  } catch (error) {
    console.log(error);
    throw new Error("Could not establish a connection to the database");
  }
}

export { mongoose, connect };
