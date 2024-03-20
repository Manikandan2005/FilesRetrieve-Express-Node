import express from 'express'
import fs from 'fs'
import { format } from 'date-fns'
import path from 'path'

const app = express()
const PORT = 8000
app.use(express.json())

app.get("/",(req,res)=>{
    try{
        let today = format(new Date(),'dd-MM-yyyy-HH-mm-ss')
        fs.writeFileSync(`DateTime/${today}.txt`,`${today}`,'utf8')
        let data = fs.readFileSync(`DateTime/${today}.txt`,'utf8')

        res.status(200).send(data)
    }
    catch(error){
        res.status(500).send("Internal Server Error")
    }
})


//2.API ENDPOINT TO RETRIEVE ALL TEXT FILES IN A PARTICULAR FOLDER.
const folderPath = "DateTime"
app.get('/gettextfiles',(req,res)=>{
    fs.readdir(folderPath,(err,files)=>{
        if(err)
        {
            console.log("Error While Reading The files")
            return res.status(500).send("Internal Server Error")
        }
        const txtFiles = files.filter(file=>file.endsWith('.txt'))
        res.status(200).send({
            message:"Files Retrieved Successfully",
            txtFiles
        })
    })
})

app.listen(PORT,()=>console.log(`App is listening ar ${PORT}`))