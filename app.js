const express = require("express")
const {ErrorHandler,NotFoundError} = require("./util/errorHandler")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))


app.post("/upload", (req,res) => {

})

app.use(NotFoundError)
app.use(ErrorHandler)

app.listen(3000, () => {
    console.log("server is running on port 3000");
})