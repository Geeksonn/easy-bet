import slugify from 'slugify';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import PlayersDAO from '../dao/playersDAO';

export default class PlayersController {
    static async addPlayer(playerData) {
        const saltRounds = 10;
        const { nickname, email, password } = playerData;

        if (!nickname) {
            return {
                reqStatus: 400,
                message: 'Nickname is mandatory'
            };
        }

        if (!email) {
            return {
                reqStatus: 400,
                message: 'E-mail is mandatory'
            };
        }

        if (!password) {
            return {
                reqStatus: 400,
                message: 'Password is mandatory'
            };
        }

        const nicknameSlug = slugify(nickname);

        if (await this.getPlayer(nicknameSlug)) {
            return {
                reqStatus: 409,
                message: 'User already exist with this nickname'
            };
        }

        if (await this.getPlayerByEmail(email)) {
            return {
                reqStatus: 409,
                message: 'This e-mail is already registered'
            };
        }

        const newPlayer = {
            _id: nicknameSlug,
            nickname: nickname,
            email: email,
            password: bcrypt.hashSync(password, saltRounds),
            bets: []
        };

        const { ops } = await PlayersDAO.addPlayer(newPlayer);

        return {
            reqStatus: 201,
            player: ops[0]
        };
    }

    static async authPlayer(authInfo) {
        const { email, password } = authInfo;

        if (!email) {
            return {
                reqStatus: 400,
                message: 'E-mail is mandatory'
            };
        }

        if (!password) {
            return {
                reqStatus: 400,
                message: 'Password is mandatory'
            };
        }

        const player = await this.getPlayerByEmail(email);
        if (!player) {
            return {
                reqStatus: 401,
                message: 'Incorrect login information'
            };
        }

        const passwordMatch = await bcrypt.compare(password, player.password);

        if (passwordMatch) {
            const token = jwt.sign(player, process.env.JWT_SECRET, { expiresIn: '1h' });
    
            return {
                reqStatus: 200,
                token: token
            };
        }
        else {
            return {
                reqStatus: 401,
                message: 'Incorrect login information'
            };
        }
    }

    static async getPlayer(playerID) {
        return await PlayersDAO.getPlayer(playerID);
    }

    static async getPlayerByEmail(email) {
        return await PlayersDAO.getPlayerByEmail(email);
    }
}