import { Schema, model, Types } from "mongoose";

const animalSchema = new Schema({
    name: {
        type: String,
        required: [true, "A name is required"],
        minLength: [2, "The animal's name is too short"],
    },
    kind: {
        type: String,
        required: [true, "Kind name is required"],
        minLength: [3, "Kind name is too short"]
    },
    imageUrl: {
        type: String,
        required: [true, "Image Url is required"],
        match: [/^https?:\/\//, "Image Url is invalid"]
    },
    age: {
        type: Number,
        required: [true, "Animal age is required"],
        min: [1, "Animal is too young"],
        max: [100, "Animal is too old"]
    }, 
    need: {
        type: String,
        required: [true, "Animal need is required"],
        minLength: [3, "Animal need is too short"],
        maxLength: [20, "Animal need is too long"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minLength: [5, "Description is too short"],
        maxLength: [50, "Description is too long"]
    },
    location: {
        type: String,
        required: [true, "Location is required"],
        minLength: [5, "Location name is too short"],
        maxLength: [15, "Location name is too long"]
    }, 
    donations: [{
        type: Types.ObjectId,
        ref: "User"
    }],
    ownerId: {
        type: Types.ObjectId,
        ref: "User",
        required: [true, "Owner is required"]
    }
})

const Animal = model("Animal", animalSchema);

export default Animal;