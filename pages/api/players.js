import PlayersController from '../../controllers/players.controller';


export default async function handler(req, res) {
    if (req.method === 'POST') {
        const result = await PlayersController.addPlayer(req.body);
        let response;

        if (result.reqStatus === 201) {
            response = result.player;
        }
        else {
            response = { message: result.message };
        }

        res.status(result.reqStatus).json(response);
    }
    else if (req.method === 'GET') {
        res.status(200).json(await PlayersController.getPlayer(req.body.playerID));
    }
    else {
        res.status(405).json({ message: 'Unrecognised HTTP method for this API' });
    }
}