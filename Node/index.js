const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const cors = require("cors");
const multer  = require('multer')
const path = require('path')
app.use(cors());
dotenv.config();
const mongoURI = `mongodb+srv://Prudhvi876:Prudhvi876@cluster0.xa0edpx.mongodb.net/facebook?retryWrites=true&w=majority`



mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(res => {
  console.log('Connected to db successfully');
}).catch(err => {
  console.log('Failed to connect', err);
})
 
//middleware
app.use("/images", express.static(path.join(__dirname, "public/images")))
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  }, 
});


const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
}); 


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen(4000, () => {
  console.log("Backend server is running!");
});
