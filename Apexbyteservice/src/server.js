const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

//inject dependencies
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');

// activate routers
const entryRouter = require('./routes/entry.route');
const productRouter = require('./routes/product.route');

//init server
const app = express();

//init config env
dotenv.config();

//express setup
app.use(express.json());
app.use(cors());
app.options("*", cors());

//configure port
const port = Number(process.env.port || 3331);

// setup routes
app.use(`/api/v1/entry`, entryRouter);
app.use(`/api/v1/product`, productRouter);

// 404 error
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

// Error middleware
app.use(errorMiddleware);

// starting the server
app.listen(port, () =>
    console.log(`Server running on port ${port}!`));


module.exports = app;