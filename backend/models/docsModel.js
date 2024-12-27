const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://abdul10102001:jixq2alUYX4VHDiP@cluster0.2ha1h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')


const docsSchema = new mongoose.Schema({
    title: String,
    content: {
      type: String,
      default: ""
    },
    uploadedBy: String,
    date: {
      type: Date,
      default: Date.now
    },
    lastUpdate: {
      type: Date,
      default: Date.now
    }
});

module.exports = mongoose.model("Docs", docsSchema);