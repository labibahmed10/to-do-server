const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();

//middlesware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.TO_DO_USER}:${process.env.TO_DO_PASS}@cluster0.zqp7w.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const todoCollection = client.db("to-do").collection("allworks");
  } finally {
    console.log("Connected to DB");
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("The to do server is running ok!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
