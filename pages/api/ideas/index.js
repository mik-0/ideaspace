import { MongoClient } from "mongodb";

export default async function handler(req, res) {

    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();

    switch (req.method) {
        case 'PUT':
            put(req, res, client);
            break;
        
        case 'GET':
            get(req, res, client);
            break;
    
        default:
            res.status(405).end(`Method ${req.method} Not Allowed`);
            break;
    }
}

const get = (req, res, client) => {
    return new Promise((resolve, reject) => {
        const db = client.db(process.env.MONGODB_DB_NAME);
        const collection = db.collection(process.env.MONGODB_COLLECTION);

        collection.find({}).toArray((err, docs) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
                reject();
            } else {
                res.status(200).json(docs);
                resolve();
            }
            client.close();
        });
    });
}

const put = (req, res, client) => {
    return new Promise((resolve, reject) => {

        const db = client.db(process.env.MONGODB_DB_NAME);
        const collection = db.collection(process.env.MONGODB_COLLECTION);

        collection.deleteMany({}, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
                client.close();
                reject();
            } else {

                if (req.body.length === 0) {
                    res.status(200).json({
                        acknowledged: true,
                    });
                    resolve();
                    return;
                }

                collection.insertMany(req.body, (err, result) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ error: 'Internal Server Error' });
                        reject();
                    } else {
                        res.status(200).json(result);
                        resolve();
                    }
                    client.close();
                });
            }
        });
    });
}