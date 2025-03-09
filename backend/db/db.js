import mongoose from "mongoose";

function connect() {
  return mongoose
    .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/senpAI")
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
}
export default connect;
