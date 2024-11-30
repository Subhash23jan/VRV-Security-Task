//imports
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const http = require('http');
const appRouter=express.Router();
const server = http.createServer(app);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userAuthentication = require('./middlewares/auth');
const errorHandler = require('./middlewares/error');
const authorisationRoles = require('./middlewares/rolesAuthorization.js');
const user = require('./models/userSchema');
const adminRoutes = require('./routes/adminRoutes');
const vendorRouter = require('./routes/vendorRoutes');
const customerRouter = require('./routes/customerRoutes');
const mongoose = require('mongoose');
dotenv.config({ path: ".env" });
const {register,login,logout} = require('./controllers/authControllers.js');
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;


//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler);

//error handling
if(!MONGO_URI){
    throw new Error('Mongo URI is missing');
}



//connections
app.listen(3000, () => {
    
    console.log('Server is running on port 3000');
});

mongoose.connect(MONGO_URI, {}).then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.log(err);
});
app.get('/',(req, res) => {
    
    res.send('Hello my friend  ');
});

app.post('/register', register);
app.post('/login', login);
app.post('/logout', logout);

app.use('/admin',userAuthentication, adminRoutes);
app.use('/vendor', userAuthentication,vendorRouter);
app.use('/customer',userAuthentication, customerRouter);







