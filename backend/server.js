const express = require('express')
const app = express()
const port = 3000
const userModel = require('../backend/models/userModel')
const docsModel = require('../backend/models/docsModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const http = require("http")
const {Server} = require('socket.io')

const server = http.createServer(app)
const io = new Server(server)

const secret = 'secret';
const bodyParser = require('body-parser')

var cors = require('cors')


app.use(bodyParser.json())
app.use(cors())



app.get('/', (req, res) => {
    res.send('Hello Worlds!!!!')
})

app.post('/signup', async (req, res) => {
    
    let {name, email, password, username } = req.body
    let emailCon = await userModel.findOne({ email: email })

    if (emailCon) {
        return res.json({success: false, message: "email already exists" })
    }
    else {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    throw err
                }
                let user = await userModel.create({
                    name: name,
                    email: email,
                    password: hash,
                    username: username,
                })
                res.json({success: true, message: 'User registered successfully', userID: user._id})
            });
        });
    }
})


app.post('/login', async (req, res) => {
    
    let {email, password } = req.body
    let user = await userModel.findOne({ email: email })

    if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
              var token = jwt.sign({ email: user.email, userId: user._id}, secret);
              res.json({success: true, message: "Login Successful", userId: user._id, token: token})
            }
            else{
              res.json({success: false, message: "Invalid password"})
            }
          });
    } 
    else {
        res.json({success: false, message: "Invalid email"})
    }

})

app.post('/logout', async (req, res) => {
    
    let { userId } = req.body
    let user = await userModel.findById(userId)

    if (user) {
        res.json({success: true, message: "Logout Successful", user: user})
    }
    else {
        res.json({success: false, message: "User does not exists"})
    }
})

app.post('/createDoc', async (req, res) => {
    
    let { title , userId } = req.body
    let user = await userModel.findById(userId)

    if (user) {
        let doc = await  docsModel.create({
            uploadedBy: userId,
            title: title
        })

        res.json({success:true, message:"Document created successfully !", docsId: doc._id})
    } 
    else {
        res.json({success:false, message:"User does not exists"})
    }
    
})

app.post('/uploadDoc', async (req, res) => {
    
    let { userId, docsId, content } = req.body
    let user = await userModel.findById(userId)

    if (user) {
        let doc = await docsModel.findByIdAndUpdate(docsId,{content: content})
        res.json({success: true, message: "Document uploaded successfully !"})
    }
    else {
        res.json({success: false, message: "User does not exists"})
    }
    
})

app.post('/uploadDoc', async (req, res) => {
    
    let { userId, docsId, content } = req.body
    let user = await userModel.findById(userId)

    if (user) {
        let doc = await docsModel.findByIdAndUpdate(docsId,{content: content})
        res.json({success: true, message: "Document uploaded successfully !"})
    }
    else {
        res.json({success: false, message: "User does not exists"})
    }
    
})

app.post('/fetchDoc', async (req, res) => {
    
    let { userId, docsId } = req.body
    let user = await userModel.findById(userId)

    if (user) {
        let doc = await docsModel.findById(docsId)

        if (doc) {
            res.json({success: true, message: "Document fetched successfully", doc: doc})
        } 
        else {
            res.json({success: false, message: "Document does not exists"})
        } 
    }
    else {
        res.json({success: false, message: "User does not exists"})
    }
    
})

app.post('/deleteDoc', async (req, res) => {
    
    let { userId, docsId } = req.body
    let user = await userModel.findById(userId)

    if (user) {
        let doc = await docsModel.findByIdAndDelete(docsId)
        res.json({success: true, message: "Document deleted successfully"})
    }
    else {
        res.json({success: false, message: "User does not exists"})
    }
    
})

app.post('/fetchAllDocs', async (req, res) => {
    
    let { userId } = req.body
    let user = await userModel.findById(userId)

    if (user) {
        let alldocs = await docsModel.find({uploadedBy: userId})
        res.json({success: true, message: "All Documents fetched successfully", alldocs: alldocs})
    }
    else {
        res.json({success: false, message: "User does not exists"})
    }
})


app.post('/fetchUser', async (req, res) => {
    
    let { userId } = req.body
    let user = await userModel.findById(userId)

    if (user) {
        res.json({success: true, message: "User fetched Successfully", user: user})
    }
    else {
        res.json({success: false, message: "User does not exists"})
    }
})



server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})