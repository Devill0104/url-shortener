import mongoose from 'mongoose';

// const connectDb = async ()=>{
//     try{
//         const conn = await mongoose.connect(process.env.MONGO_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         })
//         console.log("connected to database successfully")
//     }
//     catch(e){
//         console.log("error while connecting to db", e.message);
//         process.exit(1);
//     }
// }


const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to database successfully');
  } catch (err) {
    console.error('❌ Error while connecting to DB:', err.message);
    process.exit(1);  // Don't start the server if DB connection fails
  }
};

export default connectDb