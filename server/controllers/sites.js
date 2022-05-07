// DB Connection Function
const { connectToDB, newObjectID } = require('../db/client')
const { saveIcon } = require('../services/icons')
const { removeFile } = require('../services/filehandler/filehandler.js')


// DB Collection
const collectionName = 'sites'


// /api/all
exports.fetchAllSites = async (req, res, next) => {
    try {
        let client = await connectToDB()
        let sites = await client.db().collection(collectionName).find().toArray()
        client.close()
        res.status(200).json(sites)
    } catch (err) {
        res.status(500).json({message: "Unable to fetch data.", error: err.message})
        console.log(err)
    }
}

// /api/new
exports.newSite = async (req, res, next) => {
    try {
        console.log(req.body)
        console.log(req.file)
        let payload = {
            ...req.body,
            file: req.file ? req.file : null
        }
        let client = await connectToDB()
        let collection = client.db().collection(collectionName)
        let DBresponse = await collection.insertOne(payload)
        let sites = await client.db().collection(collectionName).find().toArray()
        res.status(200).json(sites)
        client.close()
    } catch (err) {
        res.status(500).json({message: "Unable to save new site.", error: err.message})
        console.log(err)
    }
}

//  /api/update
exports.updateSite = async (req, res, next) => {
    let client = await connectToDB()
    let collection = client.db().collection(collectionName)
    let query = {_id: newObjectID(req.body._id)}
    let response = await collection.updateOne(query, {...req.body})
    let sites = await collection.find().toArray()
    client.close(sites)
    res.status(200).json(sites)
}


//  /api/remove
exports.removeSite = async (req, res, next) => {
    try {
        let client = await connectToDB()
        let collection = client.db().collection(collectionName)
        let query = {_id: newObjectID(req.body._id)}
        let findOneResponse = await collection.findOne(query)
        if(findOneResponse.file && findOneResponse.file.path) removeFile(findOneResponse.file.path) 
        let response = await collection.deleteOne(query)
        let sites = await collection.find().toArray()
        client.close()
        res.status(200).json(sites)
    } catch (err) {
        res.status(500).json({message: "Unable to save new site.", error: err.message})
        console.log(err)
    }
}