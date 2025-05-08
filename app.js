const express = require("express")
const app = express()
const port = 3000;
const cors = require("cors");
const { default: mongoose } = require("mongoose");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('dotenv').config();
app.use(cors());


const mongo = process.env.MONGO
mongoose.connect(mongo, {

}).then(() => {
    console.log('db is connected');

})



app.use(
    cors({
        origin: '*',
        credentials: true, // Allow cookies, authentication headers
        methods: "GET,POST,PUT,DELETE", // Allowed request methods
    })
);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
const userRoutes = require("./routes/userRoutes.js");
const ticketRoutes = require("./routes/ticketRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js")
app.use('/auth', userRoutes);
app.use('/api', ticketRoutes);
app.use('/api', adminRoutes);




app.listen(port, () => {
    console.log(`our server is live on ${port}`);

})
