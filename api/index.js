const Koa = require("koa");
const { MongoClient } = require("mongodb");

const port = process.env.API_PORT || 4000;
const mogodb_connection_uri = process.env.API_MONGODB_CONNECTION_URI;

// Create MongoDB client
const client = new MongoClient(mogodb_connection_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Koa instance
const app = new Koa();

// request handler
app.use(async (ctx) => {
  // Query restaurants and return
  ctx.body = await ctx.db.collection("restaurants").find({}).toArray();
});

// Connect to database
client
  .connect()
  .then(() => {
    // Attach MongoDB db to Koa context
    app.context.db = client.db("s2r");

    // Start HTTP server
    return app.listen(port);
  })
  .then((server) => {
    const addres = server.address();
    console.log(`HTTP server started at ${addres.address}:${addres.port}`);
  });
