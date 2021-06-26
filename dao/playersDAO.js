import { connectToDatabase, ObjectID } from '@geekson/mongodb-connector';

export default class PlayersDAO {
    static getCollectionName() {
        return 'players';
    }

    static async addPlayer(player) {
        const { db } = await connectToDatabase();

        return await db
            .collection(this.getCollectionName())
            .insertOne(player);
    }

    static async getPlayer(playerID) {
        const { db } = await connectToDatabase();

        return await db
            .collection(this.getCollectionName())
            .findOne({ _id: playerID });
    }

    static async getPlayerByEmail(email) {
        const { db } = await connectToDatabase();

        return await db
            .collection(this.getCollectionName())
            .findOne({ email: email });
    }
}

/*

players: 
{
    _id: slug(nickname),
    nickname: xxx,
    email: xxx,
    password: xxx,
    bets: [
        {
            matchID: matches._id, // ObjectID ?
            homeScore: x,
            awayScore: y,
            awardedPoints: z
        }
    ]
}

*/