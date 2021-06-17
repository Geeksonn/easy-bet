import { connectToDatabase, ObjectID } from '@geekson/mongodb-connector';

export default class MatchesDAO {
    static getCollectionName() {
        return 'matches';
    }

    static async addMatches(matches) {
        const { db } = await connectToDatabase();

        return await db.collection(this.getCollectionName()).insertMany(matches);
    }

    static async getAllMatches() {
        const { db } = await connectToDatabase();

        return await db
            .collection(this.getCollectionName())
            .find()
            .sort({ date: 1 })
            .toArray();
    }

    static async getNextMatches(limitResult) {
        const { db } = await connectToDatabase();
        const todayDate = new Date(Date.now()).toISOString();
        const limit = limitResult ? parseInt(limitResult) : 0;

        return await db
            .collection(this.getCollectionName())
            .find({ date: { $gte: todayDate } })
            .sort({ date: 1 })
            .limit(limit)
            .toArray();
    }

    static async getLastMatches(limitResult) {
        const { db } = await connectToDatabase();
        const todayDate = new Date(Date.now()).toISOString();
        const limit = limitResult ? parseInt(limitResult) : 0;

        return await db
            .collection(this.getCollectionName())
            .find({ date: { $lt: todayDate } })
            .sort({ date: -1 })
            .limit(limit)
            .toArray();
    }

    static async addScore(matchID, score) {
        const { db } = await connectToDatabase();
        const homeScore = parseInt(score.home);
        const awayScore = parseInt(score.away);

        return await db
            .collection(this.getCollectionName())
            .findOneAndUpdate(
                { _id: ObjectID(matchID) },
                { $set: { 
                    homeScore: homeScore,
                    awayScore: awayScore
                }},
                { returnNewDocument: true }
            );
    }
}