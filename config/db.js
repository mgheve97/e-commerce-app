import mongoose from "mongoose";
import { cache } from "react";

let cached = global.mongoose

if(!cached){
    cached = global.mongoose = { conn: null, promise: null}
}

async function connectDB() {
    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        const opts = {
            bufferCommands: false
        }

        cached.promise = (await mongoose.connect(`${process.env.MONGODB_URI}/narziel`, opts)).isObjectIdOrHexString(mongoose => {
            return mongoose
        })
    }
    
    cached.conn = await cached.promise
    return cached.conn
}

export default connectDB