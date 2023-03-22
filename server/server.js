const express =  require("express")
const cors =  require("cors")
const app = express();
const Dialogflow = require("@google-cloud/dialogflow")
const uuid = require("uuid").v4
const Path = require("path")
const { connect, close, db, bucket } = require('./db');
const { ObjectId } = require("mongodb");

const PORT = process.env.PORT || 5001;

latestIntent = ""

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    connect();
  console.log(`Server listening on port ${PORT}`);
});

//Retrieves all recipes from database
app.get('/recipes', async (req, res) => {
    try {
        const collection = db('Remy').collection('Recipes');
        const recipes = await collection.find().limit(10).toArray();
        //code to retrieve images stored in DB
        //however the retrieval was extremely slow
        //need to find a faster way to retrieve
        /*const imageBucket = bucket(db('Remy'),'Images');
        for (let recipe of recipes) {
            const imageStream =  imageBucket.openDownloadStream(new ObjectId('640edd738ab55741e7415a45'));
            const chunks = [];
            imageStream.on('data', (chunk) => {
              chunks.push(chunk);
            });
            imageStream.on('end', () => {
              const imageBuffer = Buffer.concat(chunks);
              console.log("Buffer");
              console.log(imageBuffer);
              recipe.image = imageBuffer.toString('base64');
            });
        }*/
        res.status(200).send(recipes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// app.get('/recipes/:recipeName', async (req, res) => {
//     try {
//         const recipeName = req.params.recipeName;
//         const collection = db('Remy').collection('Recipes');
//         const recipe = await collection.findOne({ Title: recipeName });
//         res.status(200).send(recipe);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

app.get('/recipes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const collection = db('Remy').collection('Recipes');
        const recipe = await collection.findOne({ _id: new ObjectId(id) });
        console.log(recipe);
        res.status(200).send(recipe);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.post("/text-input", async (req, res) => {
    // console.log(req.body)
    // console.log(req.body["command"])
    // req.body is as follows: { note: 'hello testing' }
    // res.status(200).send({ data : "TEXT ENDPOINT CONNECTION SUCCESSFUL" })

    // Create a new session
    const sessionClient = new Dialogflow.SessionsClient({
        // keyFilename: Path.join(__dirname, "./remy-nui-50dc7607e7be.json"),
        keyFilename: "./remy-project-team3-10d4e5d0d249.json",
    });

    const sessionPath = sessionClient.projectAgentSessionPath(
        // process.env.PROJECT_ID,
        "remy-project-team3",
        uuid()
    );

    // The dialogflow request object
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: String(req.body["command"]),
                languageCode: "en-US"
            },
        },
    };

    // Sends data from the agent as a response
    try {
        const responses = await sessionClient.detectIntent(request);
        const result = responses[0].queryResult;
        const intent = result.intent.displayName;
        console.log("intent:")
        latestIntent = intent
        console.log(latestIntent)
        console.log("\n")
        res.status(200).send({ data: intent });
    } catch (e) {
        console.log(e);
        res.status(422).send({ e });
    }
});

module.exports = app