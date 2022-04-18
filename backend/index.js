const connectToMongo = require('./db');
const express = require('express');
const authRouter = require('./routes/auth');
const notesRouter = require('./routes/notes');

//mongo db connection
connectToMongo();

const port = process.env.PORT || 80;
const app = express();

app.use(express.json())
//available routes
app.use('/api/auth',authRouter);
app.use('/api/notes',notesRouter);

app.get('/', function(req, res){
   res.send("Hello world!");
});

app.use((err, req, res, next) => {
    const status = err.name && err.name === 'ValidationError' ? 400 : 500;
    res.status(status).send({ message: err.message });
  });
app.listen(port,()=>{
    console.log(`Notes App app listening at http://localhost:${port}`);
});