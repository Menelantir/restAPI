const express   = require('express');
const connectDB = require('./Config/db')
require('dotenv').config()
const User   = require('./Model/User');
const router = express.Router();


const app = express();


// Connecting db
connectDB()

// Middlewares
app.use(express.json())
// Routes 
app.use('/users',router)

//       GET :  RETURN ALL USERS 
router.get('/',async(req,res)=>{
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        res.status(500).send('server error')
    }
})

// POST :  ADD A NEW USER TO THE DATABASE 
router.post('/', async(req,res)=>{
    const {name,age,email} = req.body
    try {
        const user = new User({
            name,age,email
        })
        await user.save()
        res.send({Message:'User added', user})
    } catch (error) {
        res.status(500).send('server error')
    }
    
})

//        PUT : EDIT A USER BY ID 
router.put('/:id', async(req,res)=>{
    const {id} = req.params
    try {
        const user = await User.findByIdAndUpdate(id, {$set:{...req.body}})
        res.send({Message:"User updated", user})
    } catch (error) {
        res.status(500).send("server error");
    }
})

//        DELETE : REMOVE A USER BY ID 
router.delete('/:id', async(req,res)=>{
    const {id} = req.params
    try {
        await User.findByIdAndDelete(id)
        res.send("User deleted")
    } catch (error) {
        res.status(500).send("server error")
    }
})


app.listen(process.env.port, function(err){
    console.log(`server is running on port ${process.env.port}`)
})