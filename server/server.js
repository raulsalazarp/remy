const express =  require("express")
const cors =  require("cors")
const app = express();
const Dialogflow = require("@google-cloud/dialogflow")
const uuid = require("uuid").v4
const Path = require("path")
const { connect, close, db } = require('./db');

const PORT = process.env.PORT || 5001;

latestIntent = ""

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Example route that retrieves data from the database
//Should rename this to /AllRecipes
app.get('/recipes', async (req, res) => {
    try {
        await connect()
        const collection = db('Remy').collection('Recipes');
        const recipes = await collection.find().toArray();
        console.log(recipes.length)
        close()
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
        keyFilename: "./remy-nui-50dc7607e7be.json",
    });

    const sessionPath = sessionClient.projectAgentSessionPath(
        // process.env.PROJECT_ID,
        "remy-nui",
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
        res.status(200).send({ data: responses });
    } catch (e) {
        console.log(e);
        res.status(422).send({ e });
    }
});

module.exports = app