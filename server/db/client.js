const { MongoClient, ObjectId } = require("mongodb")

module.exports = {
    connectToDB: async (cb)=>{
        try {
            let client = await MongoClient.connect('mongodb://localhost:27017/dashboard')
            if(cb) cb(client)
            return client 
        } catch (err) {
            console.log(err)
            if(cb) cb()
            return err
        }
    },
    newObjectID: (id) => new ObjectId(id)
}