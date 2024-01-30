import mongoose from "mongoose";

export async function connectDB(CONNECTION_URL: string) {
  await mongoose
    .connect(CONNECTION_URL)
    .then(() => console.log("Database connected successfully!"))
    .catch((error) => console.log(`${error} did not connect`));
}
