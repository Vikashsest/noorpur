import mongoose from 'mongoose';


const connectMongo = async () => {

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
   console.log(`✅ Connected to DB "${conn.connection.name}" at "${conn.connection.host || '128.1.1.11'}"`);

    return conn;
  } catch (error) {
    console.log(error);
  }
};

export default connectMongo;
