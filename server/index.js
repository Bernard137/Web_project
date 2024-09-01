const express = require('express');
const cors = require('cors');

// express init
const app = express();
app.use(express.json());
app.use(cors());

// db connection
const db = require('./models');
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('server running on port 3001');
    });
});


// list items routes 
const listItemRouter = require('./routes/ListItems');
app.use('/items', listItemRouter);

// users routes
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
