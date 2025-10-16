import cookieParser from 'cookie-parser';
import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import router from './routes.js';
import authMiddleware from './middlewares/authMiddleware.js';

const app = express();

const url = 'mongodb://localhost:27017/';

try {
    await mongoose.connect(url, {
        dbName: "animal-donations-2025"
    })
    console.log('Succesfully connected to database');
} catch (error) {
    console.log('Could not connect to database', error.message);
}

app.engine('hbs', handlebars.engine({
    extname: "hbs",
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
    }
}))

app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.use(express.static('src/public'));
app.use(express.urlencoded());
app.use(cookieParser());
app.use(authMiddleware);

app.use(router);


app.listen(3000, () => {console.log('Server is listening on port http://localhost:3000....')});