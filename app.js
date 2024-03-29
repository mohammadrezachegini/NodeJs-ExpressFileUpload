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

app.post("/upload-buffer", (req,res) => {
    if(!req.files || Object.keys(req.files).length == 0){
        throw { status: 400, message:"no file uploaded"}
    }
    const image = req.files.image
    const ext = path.extname(image.name)
    const destPath = path.join(__dirname, "public","upload", Date.now() + ext)
    const buffer = Buffer.from(image.data)
    fs.writeFileSync(destPath, buffer)
    res.send(req.files)
    

})



app.post("/upload-mv", async (req,res) => {
    if(!req.files || Object.keys(req.files).length == 0){
        throw { status: 400, message:"no file uploaded"}
    }
    
    for(const key in req.files){
        let file = req.files[key]
        // const image = req.files.image
        const ext = path.extname(image.name)
        const destPath = path.join(__dirname, "public","upload", Date.now() + ext)
        const result = await new Promise((resolve,reject) => {
            file.mv(destPath, (err) => {
                if(err) reject(err)
                else resolve(true)
            })
        })
    }
    res.send("file uploaded")

})

app.use(NotFoundError)
app.use(ErrorHandler)

app.listen(3000, () => {
    console.log("server is running on port 3000");
})