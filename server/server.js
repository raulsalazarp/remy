const express =  require("express")
const cors =  require("cors")
const app = express();
const Dialogflow = require("@google-cloud/dialogflow")
const uuid = require("uuid").v4
const Path = require("path")


const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.post("/text-input", async (req, res) => {
    console.log(req.body)
    console.log(req.body["note"])
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
                text: String(req.body["note"]),
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
        console.log(intent)
        // console.log(responses)
        res.status(200).send({ data: responses });
    } catch (e) {
        console.log(e);
        res.status(422).send({ e });
    }


});

module.exports = app

