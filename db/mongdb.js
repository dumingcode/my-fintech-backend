const MongoClient = require('mongodb').MongoClient
const ReadPreference = require('mongodb').ReadPreference
const config = require('../config')
const mongoDbConfig = config.mongoDb



module.exports = {
    async insertMany(dbName, collectionName, documents) {
        let client = await MongoClient.connect(mongoDbConfig.url, { useNewUrlParser: true, readPreference: ReadPreference.PRIMARY })
        let db = await client.db(dbName)
        let col = await db.collection(collectionName)
        let result = await col.insertMany(documents, { ordered: false })
        await client.close(true)
        return result
    },
    async queryCollectionCount(dbName, collectionName, query) {
        let client = await MongoClient.connect(mongoDbConfig.url, { useNewUrlParser: true, readPreference: ReadPreference.PRIMARY })
        let db = await client.db(dbName)
        let col = await db.collection(collectionName)
        let result = await col.find(query).count()
        await client.close(true)
        return result
    },
    async insertOne(dbName, collectionName, document) {
        let client = await MongoClient.connect(mongoDbConfig.url, { useNewUrlParser: true })
        let db = await client.db(dbName)
        let col = await db.collection(collectionName)
        let result = await col.insertOne(document)
        await client.close(true)
        return result
    },
    async updateOne(dbName, collectionName, filter, document, upsertVal = true) {
        let client = await MongoClient.connect(mongoDbConfig.url, { useNewUrlParser: true })
        let db = await client.db(dbName)
        let col = await db.collection(collectionName)
        let result = await col.updateOne(filter, { $set: document }, { upsert: upsertVal })
        await client.close(true)
        return result
    },
    async queryDoc(dbName, collectionName, query) {
        let client = await MongoClient.connect(mongoDbConfig.url, { useNewUrlParser: true })
        let db = await client.db(dbName)
        let col = await db.collection(collectionName)
        let result = await col.find(query).toArray()
        await client.close(true)
        return result
    },
    async deleteOne(dbName, collectionName, filter) {
        let client = await MongoClient.connect(mongoDbConfig.url, { useNewUrlParser: true })
        let db = await client.db(dbName)
        let col = await db.collection(collectionName)
        let result = await col.deleteOne(filter)
        await client.close(true)
        return result
    }

}