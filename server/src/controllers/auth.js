const models = require('../models')
const bcrypt = require('bcrypt')

/* Create a new session for a user */
const createSession = async (request, response) => {

    const session = new models.Session({
        username: request.body.username
    })

    const returned = await session.save()
        .catch((err) => {
            response.json({"status": "username taken"})
        })

    if (returned) {
        if (session._id) {
            response.json({
                status: "success",
                username: returned.username,
                token: returned._id
            })
        }
    }
}


const getUser = async (request, response) => {

    const authHeader = request.get('Authorization')
    if (authHeader && authHeader.toLowerCase().startsWith('basic ')) {
        const token = authHeader.substring(6)
        try {
            // this will throw an error if token isn't of the right format
            const match = await models.Session.findById(token)  
            if (match) {
                response.json({
                    status: "success",
                    username: match.username,
                    token: match._id
                })       
            }
        } catch { }

    }
    response.json({status: "unregistered"}) 
}

/* 
 * validUser - check for a valid user via Authorization header
 *   return the username if found, false if not
*/
const validUser = async (request) => {
    
    const authHeader = request.get('Authorization')
    if (authHeader && authHeader.toLowerCase().startsWith('basic ')) {
        const token = authHeader.substring(6)        
        const match = await models.Session.findOne({_id: token})  

        if (match) {
            return match._id
        }
    } 
    return false
}

const loginUser = async (request, response) => {
    const username = request.body.username
    const password = request.body.password

    const match = await models.Session.findOne({username: username})

    if(!match) {
        return response.status(401).json({error: "invalid username or password"})
    }

    if(await bcrypt.compare(password, match.username)) {
        console.log("user is good")
        return response.json({status: "success"})
    }

    return response.status(401).json({error: "invalid username or password"})
}

module.exports = { validUser, getUser, createSession, loginUser }
