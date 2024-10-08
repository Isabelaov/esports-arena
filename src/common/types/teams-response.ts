import { Player } from 'src/modules/player/entities/player.entity';

export interface ITeamsResponse {
  playersTeamOne: Player[];
  playersTeamTwo: Player[];
}
