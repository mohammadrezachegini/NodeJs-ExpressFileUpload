const express = require("express")
const fileUpload = require("express-fileupload")
const {ErrorHandler,NotFoundError} = require("./util/errorHandler")
const fs = require("fs")
const path = require("path")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
// app.use(fileUpload({abortOnLimit: true, limits: {
//     fileSize: 150000,
//     fields:3
// }}))

app.use(fileUpload())

app.post("/upload", (req,res) => {
    const image = req.files.image
    const ext = path.extname(image.name)
    const destPath = path.join(__dirname, "public","upload", Date.now() + ext)
    const buffer = Buffer.from(image.data)
    fs.writeFileSync(destPath, buffer)
    res.send(req.files)
    

})

app.use(NotFoundError)
app.use(ErrorHandler)

app.listen(3000, () => {
    console.log("server is running on port 3000");
})