import MatchesDAO from '../dao/matchesDAO';

export default class MatchesController {
    static async addMatches(matches) {
        return await MatchesDAO.addMatches(matches);
    }

    static async getMatches(params) {
        if (params?.which === 'NEXT') {
            return await MatchesDAO.getNextMatches(params.limitResult);
        }
        else if (params?.which === 'LAST') {
            return await MatchesDAO.getLastMatches(params.limitResult);
        }
        else {
            return await MatchesDAO.getAllMatches();
        }
    }

    static async addScore(matchID, score) {
        return await MatchesDAO.addScore(matchID, score);
    }
}