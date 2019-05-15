const express=require('express');
const app=express();
const bodyParser = require("body-parser");

const mongoose=require('mongoose');


const authRoutes=require("./routes/auth");
const receptionistRoutes=require("./routes/receptionist");
const adminRoutes=require("./routes/admin");
const doctorRoutes=require("./routes/doctor");

mongoose
  .connect(
    'mongodb://localhost:27017/hospital_management_system', {useNewUrlParser: true}
    ).then(() => {
      console.log("Connected to database!");
    })
    .catch(() => {
      console.log("Connection failed!");
    });



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(authRoutes);
app.use(receptionistRoutes);
app.use(adminRoutes);
app.use(doctorRoutes);
module.exports = app;
