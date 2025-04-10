require('dotenv').config() // this exposes our env variables to our app

//Step 1 - Establish a connection to our postgres database

const Pool = require('pg').Pool

const pool = new Pool ({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

const getFavLinks = (req, res) => {
    //use pg to get our data from the database and return it to the user

    pool.query('SELECT * FROM favlinks', (error, result) =>{

        if(error){
            //do something with the error!
            console.log(error)
            // res.status(400)
        } else {
            //console.log(result)
            res.status(200).json(result.rows)
        }
    })
}

const createFavLink = (req, res) => {
    //call some SQL command to insert data into postgres
    let {name, URL} = req.body
 
    if(!name || !URL){
        res.status(400).send('Request need to pass a name and URL for the favlink!')
    }
    //query PG to INSERT new favlink
    pool.query('INSERT INTO favlinks (name, URL) VALUES ($1, $2)', [name, URL], (error, result) => {
       if(error){
            throw error
        }

        res.status(200).send(`FavLink Added`)
    })
}

//WORK ON DELETE FAV LINK 4/2/25 1:54pm

// return functions as exports to call in our index2 file
module.exports = {
    getFavLinks,
    createFavLink,
    
}



/*

require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME, 
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const { name, email } = request.body

    pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      })
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}

*/