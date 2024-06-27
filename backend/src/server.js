const express = require("express");
const bodyParser = require("body-parser");
const { connectDB, configObject } = require("./config/config");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const { logger } = require("./utils/logger");
const cors = require("cors");
const handlebars = require(`express-handlebars`);
const handlebarsHelpers = require("handlebars-helpers")();
const eq = handlebarsHelpers.eq;
const noteRoutes = require("./routes/notes.router.js");
const authRoutes = require(`./routes/auth.router.js`);

const app = express();
const port = 5000;

connectDB();

app.use(bodyParser.json());

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000", // Allow frontend URL
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(
  session({
    store: mongoStore.create({
      mongoUrl: configObject.mongo_uri,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 15000000000,
    }),
    secret: `secret`,
    resave: true,
    saveUninitialized: true,
  })
);

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: {
      eq: eq,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.engine(`hbs`, handlebars.engine());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Routes for notes
console.log(process.env.JWT_SECRET_KEY);
app.use(`/api/auth`, authRoutes);
app.use("/api/notes", noteRoutes);

app.listen(port, () => {
  logger.info(`Server is running on port http://localhost:${port}`);
});
