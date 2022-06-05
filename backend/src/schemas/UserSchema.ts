import { Schema , Document } from "mongoose"

export interface IUser extends Document
{
  email : string,
  password : string,
  username : string,
  friends : Array<Schema.Types.ObjectId | IUser>,
  friendsRequest : Array<Schema.Types.ObjectId | IUser>,
  friendsPending : Array<Schema.Types.ObjectId | IUser>,
  avatar : string,
  cover : string,
  description : string,
}

const UserSchema = new Schema<IUser>(
  {
    email : {
      type : String,
      unique : true,
      required : true
    },
    password : {
      type : String,
      unique : true,
      required : true
    },
    username : {
      type : String,
      required : true
    },
    friends : [
      {
        type : Schema.Types.ObjectId,
        ref : "users"
      }
    ],
    friendsRequest : [
      {
        type : Schema.Types.ObjectId,
        ref : "users"
      }
    ],
    friendsPending : [
      {
        type : Schema.Types.ObjectId,
        ref : "users"
      }
    ],
    avatar : String,
    cover : String,
    description : String
  },
  {
    timestamps : true
  }
)

export default UserSchema
