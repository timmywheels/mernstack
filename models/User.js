"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    email: { type: String, unique: true, required: true }
});
mongoose.model('users', userSchema);
