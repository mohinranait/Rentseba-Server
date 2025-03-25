const { default: mongoose } = require("mongoose");
const { DATABASE } = require("./accessEnv");

/**
 * Connect to MongoDB database
*/
const connectMongoDB = async () => {
    try {
        await mongoose.connect(DATABASE)
        console.log("Connect Database");
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    connectMongoDB,
}