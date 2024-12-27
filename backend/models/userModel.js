const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://abdul10102001:jixq2alUYX4VHDiP@cluster0.2ha1h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    username: String,
    isBlocked: {
      type: Boolean,
      default: false
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    date: {
      type: Date,
      default: Date.now
    }
});

module.exports = mongoose.model("User", userSchema);