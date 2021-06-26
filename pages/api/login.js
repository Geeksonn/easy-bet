import PlayersController from '../../controllers/players.controller';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const authInfo = {
            email: req.body.email,
            password: req.body.password
        };
        const result = await PlayersController.authPlayer(authInfo);
        let response;

        if (result.reqStatus === 200) {
            response = { token: result.token };
        }
        else {
            response = { message: result.message };
        }

        res.status(result.reqStatus).json(response);
    }
    else {
        res.status(405).json({ message: 'Unrecognised HTTP method for this API' });
    }
}