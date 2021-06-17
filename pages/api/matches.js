import MatchesController from '../../controllers/matches.controller';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { ops } = await MatchesController.addMatches(req.body.matches)
        res.status(201).json(ops);
    }
    else if (req.method === 'GET') {
        res.status(200).json(await MatchesController.getMatches(req.body.params));
    }
    else if (req.method === 'PUT') {
        if (!req.body.matchID) {
            res.status(405).json({ message: 'You need to specify a match ID' });
        }

        const { matchID, score } = req.body;
        const { value } = await MatchesController.addScore(matchID, score);
        res.status(200).json(value);
    }
}