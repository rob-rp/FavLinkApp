// Components are functions that return some JSX

// JSX is a javascript syntax in React to create our HTML elements

"use client";

import { useState, useEffect } from "react" // we use this to add state to our components
// state lets us keep track of changing data and show it in the component

import Form from "./components/Form"
import Table from "./components/Table"

function HomePage(){  
    const [favLinks, setFavLinks] = useState([])

    
    //TODO: connect to our server/db to get the saved favlinks!

    async function getData() {
        let url = "http://localhost:8080/favlinks"

        //use the fretch api to call this URL and get the data
        let response = await fetch(url)

        let data = await response.json()

        setFavLinks(data)
        // console.log(data)
    }

    useEffect(() => {
        //if you want to trigger a funcrtion when a component fully loads
        //create a useEffect and call whatever you need

        getData()


    }, [favLinks])

    //Example post request like above get request
    async function createFavLink(name, url){
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "name": name,
            "URL": url
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        let response = await fetch("http://localhost:8080/favlink", requestOptions)
    }

    
    function handleNewFavLink(favLink){
        // favlink is an object containing a {name, URL}

        console.log(favLink, "in HomePage")
        console.log("favlink.name -> ", favLink.name)
        console.log("favlink.url -> ", favLink.url)
        


        let newFavLinks =[...favLinks, favLink] //...favLinks is the spread operator and will spread out the items in an array into a new array. adding in ",favlink" will take the new link and also add it into the new array.

        setFavLinks(newFavLinks)

        createFavLink(favLink.name, favLink.url)
    }

    function handleDelete(arrysIndex){

        let tempFavLinks = [...favLinks]
        tempFavLinks.splice(arrysIndex, 1)
        
        setFavLinks(tempFavLinks)
    }
    

    return (
        <div>
            <h1> FavLinks </h1>
       
       {/* The Form is responsible for gathering the data
        and alerting the HomePage when it needs to pass it to the table  */}
           
            <Form submitFavLink={handleNewFavLink} /> 

            
            
            <Table data={favLinks} deleteFavLink={handleDelete} />
            


        </div>
    )
}
export default HomePage