const mongoose = require("mongoose");

/*connects to database schedulerDB */
module.exports.connection = function () {
    mongoose.connect((process.env.PRODUCTION_MONGODB_URI ||
      "mongodb://localhost:27017/upgrad_jeet"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    mongoose.connection
      .once("open", function () {
        console.log("Database connection has been made");
      })
      .on("error", function (error) {
        console.log("error is" + error);
      });
  };