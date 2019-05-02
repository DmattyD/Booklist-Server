const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const monk = require('monk')
const bodyParser = require('body-parser')
const cors = require('cors')
// Connection URL
const url = 'mongodb://mddever:Password1@cluster0-shard-00-00-hiisr.gcp.mongodb.net:27017,cluster0-shard-00-01-hiisr.gcp.mongodb.net:27017,luster0-shard-00-02-hiisr.gcp.mongodb.net:27017/Booklist?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';

const db = monk(url);

//// test add to booklist server repo on github
db.then(() => {
    console.log('Connected correctly to server')
})

const collection = db.get("Books")

app.use(bodyParser.json())
app.use(cors())

/// get all entries
app.get('/', async (req, res) => {
    const result = await collection.find({})
    return res.status(200).send(result)})

/// get a single entry
app.get('/Show/:id', async (req, res) => {
    const [result] = await collection.find(req.params.id)
    return res.status(200).send(result)})

/// add to entries
app.post('/Create', async (req, res) => {
    const result = await collection.insert(req.body)
    return res.status(200).send(result)
})

/// delete an entry
app.delete('/Show/:id', async (req, res) => {
    await collection.findOneAndDelete(req.body)
    return res.status(200).send(await collection.find())
})

app.put('/Edit/:id', async (req, res) => {
    const result = await collection.findOneAndUpdate(req.params.id, req.body)
    console.log("I'm Updated Bitch!")
    return res.status(200).send(result)
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))