const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();

//middlesware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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

    app.get("/allworks", async (req, res) => {
      const result = await todoCollection.find({}).toArray();
      res.send(result);
    });

    app.post("/allworks", async (req, res) => {
      const todoInfo = req.body;
      const result = await todoCollection.insertOne(todoInfo);
      res.send(result);
    });

    app.delete("/allworks/:id", async (req, res) => {
      const id = req.params;
      const query = { _id: ObjectId(id) };
      const result = await todoCollection.deleteOne(query);
      res.send(result);
    });

    app.put("/allworks/:id", async (req, res) => {
      const id = req.params;
      const complete = req.body;
      console.log(complete);
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = { $set: complete };

      const result = await todoCollection.updateOne(filter, updatedDoc, options);
      res.send(result);
    });
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
