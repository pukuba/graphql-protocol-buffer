import mongodb from 'mongodb'
const MongoClient = mongodb.MongoClient

const connectDB = () => {
    let DB: any = null
    let instance = 0

    const connect = async () => {
        try {
            const client = await MongoClient.connect(String(process.env.DB_HOST), {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            const _db = client.db()
            return _db
        } catch (e) {
            return e
        }
    }

    const get = async () => {
        try {
            instance++
            console.log(`DB called ${instance} times`)

            if (DB != null) {
                console.log(`db connection is already alive`)
                return DB
            } else {
                console.log(`getting new db connection`)
                DB = await connect()
                return DB
            }
        } catch (e) {
            return e
        }
    }

    return { get }
}

export default connectDB