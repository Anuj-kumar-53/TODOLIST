import mongoose from "mongoose";
const todo = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
        
    },
title:{
    required: true,
    type: String
},
desc: {
    type: String,
    required: true
},
status:{
    type: Boolean,
    default: false
},
date:{
    type:Date,
    required:true,
},
tags:{
    type:String,
    
}



},{timestamps: true});

const Todo = mongoose.model('Todo',todo);
export default Todo;