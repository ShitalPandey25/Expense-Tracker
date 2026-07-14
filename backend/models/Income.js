import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

});


export default mongoose.model("Income", incomeSchema);