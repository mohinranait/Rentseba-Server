require('dotenv').config();

const PORT = process.env.PORT
const DATABASE = process.env.DATABASE_URL


module.exports = {
    PORT,
    DATABASE
}