require('dotenv').config({
  path: require('path').resolve(__dirname, '.env')
});

const app = require('./src/app')
const connectToDB = require('./src/config/database')

connectToDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`[INFO] Server is locally running on ${PORT}`)
})