const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    hashedPassword: { type: String, required: true},
    accountRegistered: { type: Boolean, default: false },
    emailConfirmationToken: { type: String, default: null },
    passwordResetToken: { type: String, default: null },
});

mongoose.model('users', userSchema);
