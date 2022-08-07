const express = require('express')

const app = express();
// const reg = require('./router/router')
// const sud = require('./router/sud')
// const chat = require('./router/chat')
// const players = require('./router/players')
// const friend = require('./router/friend')
const corsMiddleware = require('./middleware/cors.middleware')

app.use(corsMiddleware)


app.use(express.json())
// simple route

// app.use("/api/auth", reg)
// app.use("/sudoku", sud)
// app.use("/chat", chat)
// app.use("/players", players)
// app.use("/friend", friend)



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});