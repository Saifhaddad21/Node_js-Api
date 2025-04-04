const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "config.env" });
const ApiError = require("./utils/apiError");
const dbConnection = require("./config/database");
const categoryRoutes = require("./routes/categoryRoutes");
const globalError = require("./middlewares/errorMiddlewares");

// Connect with db
dbConnection();

// express app
const app = express();

// middleware
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use("/api/v1/categories", categoryRoutes);

//  i close this because its is not work and when i open it the error is work : and i don't know why
// app.all("*", (req, res, next) => {
//   // creat error and send it to error
//   const err = new Error(`Can't find this route : ${req.originalUrl}`);

//   next(err.message);
// });

// also this gime me an error when i start this
// app.all("*", (req, res, next) => {
//   // creat error and send it to error
//   next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
// });

// also this the global don't work and i don't know what is the reson but don't give me an error
// (( i will remove from here and but in the a new folder that name is middlewares))
// Global error handling middleware
app.use(globalError);

// also this the global don't work and i don't know what is the reson but don't give me an error
// Global error handling midleware
// app.use((err, req, res, next) => {
//   res.status(400).json({ err });
// });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});
