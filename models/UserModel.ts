import mongoose, { Model, Document, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  salt: string
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: {type:String, required:true}
},
{
    toJSON:{
        transform:(_doc, ret) => {
 
            delete ret._v;
            delete ret._id;
        },
    },
    timestamps: true
}
);

// Define the model
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export { User as UserModel } ;
