

const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 3000;


// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zrfyfih.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();



    const db = client.db("eTuitionBD");
    const tuitionCollection = db.collection("tuitions");

    // TUITION'S API -->

    app.post('/tuitions', async (req, res) => {
        const tuition = req.body;
        tuition.createdAt = new Date();
        const result = await tuitionCollection.insertOne(tuition);
        res.send(result);
    })

    app.get('/myTuitions', async (req, res) => {
        const query = {};
        
        const {email} = req.query;

        // TUITIONS?EMAIL=' ' &  -->
        if(email){
            query.email = email;
        }

        const options = {
            sort: { createdAt: -1 }
        }

        const cursor = tuitionCollection.find(query, options);
        const result = await cursor.toArray();
        res.send(result);
    })

    app.delete('/myTuitions/:id', async (req, res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        
        const result = await tuitionCollection.deleteOne(query);
        res.send(result);
    })


    await client.db("admin").command({ ping: 1 });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");

  } finally {
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send("Smart Server Is Running");
})

app.listen(port, () => {
    console.log(`Smart Server Is Running On Port : ${port}`);
})



