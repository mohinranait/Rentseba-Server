const express = require("express");
const { PORT } = require("./config/accessEnv");
const rateLimit = require("express-rate-limit")
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const cors = require("cors")
const { errorResponse } = require("./utils/responseHandler");
const { crmRouter } = require("./routes");
const { connectMongoDB } = require("./config/dbConnect");


const app = express();

connectMongoDB()

// Middlewares
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    limit: 50,
    statusCode: 429,
    message: { message: 'Your request is rich. Try again' }
})
app.use(limiter)
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: ['http://localhost:3000','https://rentsheba.vercel.app'],
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    })
)
app.use(cookieParser())


app.use('/api', crmRouter)



app.get('/', async (req, res) => {
    console.log("Rentsheba Home route")
    res.send("Rentsheba Home Route")
})



// Route not found
app.use((req, res, next) => {
    next( createError(404, "route not found") )
})

// Global error handler
app.use((err, req,res, next) => {
    return errorResponse(res, {
        message: err.message,
        statusCode: err.status
    })
   
})


app.listen(PORT, () => {
    console.log(`Server is running at port http://localhost:${PORT}`);
    
})