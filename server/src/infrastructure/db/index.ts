import mongoose from 'mongoose'
import 'dotenv/config.js'

export function dbConnect(): void {
  const dbUri = process.env.MONGO_URL
  mongoose.set("strictQuery", false);
  mongoose.connection.on("reconnected", () => {
    console.log({ msg: "mongoDb.reconnected" });
  });

  mongoose.connection.on("disconnected", () => {
    console.log({ msg: "mongoDb.disconnected" });
  });

  mongoose.connection.on("open", () => {
    console.log({ msg: "mongoDb.connected", data: { uri: dbUri } });
  });

  try {
    mongoose.connect(dbUri);
  } catch (err) {
    console.log({ msg: "mongoDb.failed", err });
  }
}
