const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

/*
user name :bandwith
password : tBY7XRF7W1imcu8f
*/ 

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://bandwith:tBY7XRF7W1imcu8f@cluster0.k05o9k1.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('nodeMongoCrud').collection('users');


        // এইটা দিয়ে ক্লায়েন্ট সার্ভার থেকে সার্ভার সাইটে ডাটা দেখাইতে পারবো
        app.get('/users', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })

        // এইটা ধারা মংগোডিভিতে ডাটা স্টোর করতে হবে তার আগে uri and client ক্রিয়েট করতে হবে
        app.post('/users', async(req, res) => {
            const user = req.body;
            console.log(user)
            const result = await userCollection.insertOne(user);
            res.send(result);
        })

        // এইবার যদি আলাদা আলাদা ভাবে আমরা ডিলিট করতে চাই তাইলে
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result)
            console.log('trying to delete',id)
        })
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const user=await userCollection.findOne(query)
            res.send(user);
        })
    }
    finally {
        
    }

}
run().catch(err => console.log(err));



app.get('/', (req, res) => {
    res.send('hello form mongobd crus server')
});


app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})