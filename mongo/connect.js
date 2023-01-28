import mongoose from "mongoose";

mongoose.connection.on("error", (error) => {
  throw new Error("There was a problem with the database connection");
});

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    throw new Error("Could not establish a connection to the database");
  }
}

export { mongoose, connect };
