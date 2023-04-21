const express =  require("express")
const cors =  require("cors")
const app = express();
const Dialogflow = require("@google-cloud/dialogflow")
const uuid = require("uuid").v4
const Path = require("path")
const { connect, close, db, bucket } = require('./db');
const { ObjectId } = require("mongodb");
const axios = require('axios');

const PORT = process.env.PORT || 5001;
// const APIKEY = 'c522fa0129cc40008265c1309ab94a22'
// const APIKEY = 'd19c08ad32394f988780a1fb40331452'; 
//const APIKEY = '6cdaa136795642c2a701df6a530f68d1';
//const APIKEY = 'f51fb38796c04f61a417d3f3de051c30';
//const APIKEY = '7106633df8e34ec58b60cf72f7c040dd';
//const APIKEY = '2adfb9ae81cd438ca639b857e3f574f3';
//const APIKEY = '2b9a9f7af97d4a02ab6dc03056bd8964';
//const APIKEY = '0aca9515ecb342bfb1486b0bcc094b6c';
//const APIKEY = 'a14650dc456e4e319a5c907f61fd4829';
const APIKEY = '7e1498a66ffd4ed4a863c8bd58561c5b';
//const APIKEY = 'c69dcb51fa6e4c2e8cbc4a61d15fa67e';

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
        res.status(200).send(recipes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/recipes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const collection = db('Remy').collection('Recipes');
        const recipe = await collection.findOne({ _id: new ObjectId(id) });
        res.status(200).send(recipe);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/spoonacular/recipes', async (req, res) => {
    try {
        const { cuisine, diet, intolerances, maxReadyTime, type } = req.query;
        // build the params object with optional search constraints
        const params = {
            apiKey: APIKEY,
            addRecipeInformation: true,
            addRecipeNutrition: true,
            instructionsRequired: true,
            number: 50 // limit the number of results
        };
        if (cuisine) params.cuisine = cuisine;
        if (diet) params.diet = diet;
        if (intolerances) params.intolerances = intolerances;
        if (maxReadyTime) params.maxReadyTime = maxReadyTime;
        if (type) params.type = type;
        // call Spoonacular API with the built params object
        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', { params });
      
        // send recipe data back to the client
        res.send(response.data.results);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/spoonacular/recipes/:id', async (req, res) => {
    try {
        const id = req.params.id;
    
        // build the params object to include nutritional information
        const params = {
            apiKey: APIKEY,
            includeNutrition: true
        };
        
        // call Spoonacular API with the built params object
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, { params });
        
        // send recipe data back to the client
        res.send(response.data);
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
        
        console.log("\n")
        if(intent == "recipe"){
            res.status(200).send({ intent: intent, parameters: result.parameters.fields });
            console.log("intent:")
            latestIntent = intent
            console.log(latestIntent)
            console.log(result.parameters.fields.mealType.stringValue)
            console.log(result.parameters.fields.cuisine.listValue.values)
            console.log(result.parameters.fields.diet.stringValue)
            console.log(result.parameters.fields.intolerances.stringValue)
            console.log(result.parameters.fields.maxReadyTime.stringValue)
        }
        else{
            res.status(200).send({ intent: intent });
            console.log("intent:")
            latestIntent = intent
            console.log(latestIntent)
        }
    } catch (e) {
        console.log(e);
        res.status(422).send({ e });
    }
});

module.exports = app