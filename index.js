
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const port = 4000;

const authRoute = require('./routes/auth');
const dataRoute = require('./routes/data');

const connectToDB = async (req, res) => {
    try {
        await mongoose.connect('mongodb+srv://siddhantydhyani99:uGR5yGoKKRkauor4@cluster0.td9vvlt.mongodb.net/QuantumIt');
        console.log('Connected to QuantumIt');
    } catch (error) {
        console.log('Error connecting to atlas');
    }
}
connectToDB();

app.use('/api/auth', authRoute);
app.use('/api/data', dataRoute);

app.get('/', (req, res) => {
    res.send('Backend is live!!');
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

