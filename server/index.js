const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const helmet = require('helmet');
const { connectToDB } = require("./db/client")
const app = express();              
const port = 5000;      
const rootDirectory =  __dirname

const errorHandler = require('./middleware/errorHandler'); 


app.use(helmet()); // https://expressjs.com/en/advanced/best-practice-security.html#use-helmet
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const linkRoutes = require("./routes/links")
const path = require('path')

// ONLY USED FOR TESTING
app.use(express.static(path.join(rootDirectory, 'public')))

// MAKE ICONS AVAILABLE
app.use('/storage', express.static(path.join(rootDirectory, 'storage')));

// API ENDPOINTS
app.use('/api',linkRoutes)


app.use((req, res, next) => {
    next(createError.NotFound());
});
  

// DB Connection - Checks to see if db connection is possbile before starting server
connectToDB((response)=>{
  if(response){
    let client = response
    app.listen(port, () => {  //server starts listening for any attempts from a client to connect at port: {port}
      console.log(`Now listening on port ${port}`); 
      client.close()
    });
  } 
})

// pass any unhandled errors to the error handler
app.use(errorHandler);
