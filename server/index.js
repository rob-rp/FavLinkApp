//Following from Proffessors Code 3/24/25

const express = require('express') //importing the express function from the express lib
const app = express() // we're setting a new variable called app to be an express app instance

const db = require('./queries')

const cors = require('cors') //bring in the cors package to help us handle cors issues

const port = 8080 // defining the port we want our app to run on 


app.use(cors()) //add cors handling to our app
app.use(express.json()) //Middleware to parse incoming json data from a client
app.use(express.urlencoded()) //Middleware to parse incoming URL encoded data
app.use(express.static('public')) //Middleware to turn a particular folder into a "STATIC FOLDER"

//example route for the server
// app.get("/", (req,res) => {  uncomment 4/3/25 1141pm
//     res.send("Node / Express server is operational!")
// })



let favLinks = [
    {name: "test"}
]

// CRUD API
// API function 1 - create something
app.post("/favlink", db.createFavLink)
// app.post("/favlink", (req, res)=>{
//     // function to call when the user wants to create a new favLink
//     let name = req.body.name
//     let URL = req.body.URL

//     let newFavLink = {name, URL} // {name: name, URL: URL}

//     favLinks.push(newFavLink) // or call a db function to insert or add data

//     if(newFavLink) {
//         res.send("success")
//     } else {
//         res.send("Error!")
//     }

// })


/*API function 2 - read something*/ 
app.get("/favlinks", db.getFavLinks)  //here were calling the getFavlinks function from our queries.js file which has our sql commands
//these 4 lines below will send all the favlinks we hard coded into our array above when the user goes to localhost:3000/favlinks
// app.get("/favlinks", (req, res)=>{
//     // send the current list of favlinks from the array or maybe from a DB!

//     res.send(favLinks)
// })


/*API function 3 - update something*/
app.put("/route", (req, res) => {}) 


// API function 4 - delete something
app.delete("/favlink", (req, res)=>{
    let name = req.body.name

    favLinks = favLinks.filter((favlink)=>{
        return favlink.name !== name
    })

    res.send(favLinks)
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


//log in to psql as a user named "me"
// psql -d postgres -U me