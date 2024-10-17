const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoutes');
const orgRoutes = require('./routes/orgRoutes');
const authRoutes = require('./routes/authRoutes');


const env = dotenv.config();
const app = express();
const cors = require('cors');

mongoose.connect(process.env.CONNECTION_STRING).then(()=>{console.log("MongoDB Connected ");}).catch((err)=>{console.log(err.message)});

app.use(cors());

const PORT = process.env.PORT || 5001;
app.use(express.json());

app.get('/', (req, res)=>{
    res.send("Hello Bro!!!");
    
});
app.post('/', (req, res)=>{
    console.log(req.body);
    res.status(200).send("Data received!!!");
});

app.use('/api/users', userRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/org', orgRoutes);

app.listen(5000, ()=>{console.log(`server running on port ${PORT}`)});