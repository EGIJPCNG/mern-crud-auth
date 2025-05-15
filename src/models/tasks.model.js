import mongoose from "mongoose";

new mongoose.Schema({
title:{
    type: String,
    required: true
},
description:{
    type: String,
    required: true
},
date:{
    type: String,
    default: Date.now,
}
})