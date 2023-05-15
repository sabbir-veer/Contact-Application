const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const router = require('./routes')
const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/contacts', router)

app.set('view engine', 'ejs')

// let Schema = mongoose.Schema;
// let testSchema = new Schema({
//     name: String
// })
// let Test = mongoose.model('Test', testSchema)

app.get("/", (req, res) => {
//   let test = new Test({
//     name: 'Sabbir Ahmed'
//   })
//   test.save()
//     .then(t => {
//     res.json(t)
//   })
//     .catch(e => {
//     console.log(e);
//     res.json({error: 'Error Occured!'})
//   })
  res.json({
    message: 'visit contacts route to enter the application'
  })
});

const PORT = process.env.PORT || 4000;

mongoose
  .connect(
    "mongodb+srv://sabbir:pass123@test-db.yl7yunr.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
