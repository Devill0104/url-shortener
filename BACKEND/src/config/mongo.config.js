import mongoose from 'mongoose';

const connectDb = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("connected to database successfully")
    }
    catch(e){
        console.log("error while connecting to db", e.message);
        process.exit(1);
    }
}
export default connectDb