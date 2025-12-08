

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;


// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Smart Server Is Running");
})

app.listen(port, () => {
    console.log(`Smart Server Is Running On Port : ${port}`);
})



