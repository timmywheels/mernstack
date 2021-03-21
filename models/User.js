const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    hashedPassword: { type: String, required: true}
});

mongoose.model('users', userSchema);