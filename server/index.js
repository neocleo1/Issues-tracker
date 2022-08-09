//Dependencies
dotenv.config(); //Make sure this is at the top of your file otherwise your app can't access the .env file
import mongoose from 'mongoose';
import Express from 'express';
import dotenv from 'dotenv';
import users from './controllers/user.js';
import authn from './controllers/authn.js';

//Connection to MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to IssueTracker Mongo Database ...'))
    .catch((err) =>
        console.error('Connected to Tracker Mongo Database ...', err.message)
    );

//Variables
const app = Express();

//Controllers
app.get('/', (req, res) => {
    res.send('hello api');
});

//Middleware
app.use(Express.json());
app.use('/api/users', users);
app.use('/api/authn', authn);

//Port
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`server started on port ${port} ...`);
});
