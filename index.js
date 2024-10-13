import express, { response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

//import {userModel}  from './models/User.js';
import bcrypt from "bcrypt";
import cors from "cors";
import dotenv from "dotenv";
//import helmet from helmet;
import morgan from "morgan";
import clientRoutes from "./routers/client.js";
import generalRoutes from "./routers/general.js";
import managmentRoutes from "./routers/managment.js";
import salesRoutes from "./routers/sales.js";
// import jwt from "jsonwebtoken";
// import 'dotenv/config';

// data imports
// import { userModel } from "./models/User.js";
// import { Product } from "./models/Product.js";
// import { dataProductStat } from "./models/ProductStat.js";
// import { Transaction } from "./models/Transaction.js";
// import { OverallStat }from "./models/OverallStat.js";
// import { AffiliateStat } from "./models/AffiliateStat.js";
// import {
//   dataUser,
//   dataProduct,
//   //dataProductStat,
//   dataTransaction,
//   dataOverallStat,
//   dataAffiliateStat,
// } from "./data/index.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
//app.use(helmet());
//app.use(helmet.corssOriginResourcePolicy({ policy: "cross-orgin"}));
//app.use(cors({origin:"http://localhost:3000"}));   ------->LINK NUMBER 44
app.use(morgan("common"));
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());
app.listen(5001);
 
/*ROUTES*/
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/managment", managmentRoutes);
app.use("/sales", salesRoutes);
 
// app.get("/", (req, res) => {
// res.send("response from testing for broser localhost...");
// });
 
 /* MONGOOSE SETUP*/
// const PORT = process.env.PORT || 9000;
// mongoose.connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
// }).catch((error) => console.log(`${error} did not connect`));

      const DBURL = "mongodb+srv://admin:Abusaglien.s@cluster0.bj5yg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
      mongoose.connect(DBURL, { dbname: "jobposting" }).then ((response) => {
      console.log("MongoDB connected");
      });
    

app.post("/signUp", (req, res) => {
    const {userName, userEmail, password } = req.body;
    console.log(req.body);
    userModel.findOne({ userEmail: userEmail }).then((result) => {
        if (!result) {
            bcrypt.hash(password, 10).then(hashPW => {
            const userObject = {
                userName, 
                userEmail, 
                password:hashPW,
            };
            userModel
            .insertMany(userObject)
            .then((response) => {
                console.log(response);
                res.json(response);
             })
             .catch((err) => console.log(err));
            });

        } else{
            res.json({ message :"You have resgistered. please login..."});
        }
    });
});

app.post("/login", (req, res) => {
    const { userEmail, password } = req.body;
     //console.log(req.header.authorization);
    userModel.findOne({ userEmail: userEmail }).then((result) => {
        if (result) {
            bcrypt.compare(password, result.password).then((isMatched) => {
                if(isMatched) {
                    //con. jwt.sign({ userEmail: userEmail, password: password}, process.env.env.js/SECRET_KEY,)
                //   const payload jwt.verify(req.header.authorization.split("")[1],process.env/env.js/SECRET_KEY);
                    res.json({ message: "Login sucess"});
                }else {
                    res.json({ message: "Login failed"});
                }
                });
            }else{
                res.json({ message: "You have not registed. please sign up"});
            }
        });
    });
