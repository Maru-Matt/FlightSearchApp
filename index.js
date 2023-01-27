import express from 'express';
import bodyParser from 'body-parser';
import userDataRouter from "./routes/flight.js"

const PORT = 3003;

const app = express();
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get('/', (req, res) => {
    res.render('home');
})


app.use('/flight', userDataRouter);


app.listen(PORT, () => console.log(`listening on port: http://localhost:${PORT}`));