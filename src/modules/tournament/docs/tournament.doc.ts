import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateTournamentDto } from '../dto/create-tournament.dto';
import { UpdateTournamentDto } from '../dto/update-tournament.dto';

export function CreateTournament() {
  return applyDecorators(
    ApiOperation({ summary: 'Create tournament' }),
    ApiResponse({ status: 201, description: 'Tournament created' }),
    ApiBody({ type: CreateTournamentDto }),
  );
}

export function FindOneTournament() {
  return applyDecorators(ApiOperation({ summary: 'Find tournament by ID' }));
}

export function FindTournaments() {
  return applyDecorators(ApiOperation({ summary: 'Find tournaments' }));
}

export function UpdateTournament() {
  return applyDecorators(
    ApiOperation({ summary: 'Update tournament' }),
    ApiBody({ type: UpdateTournamentDto }),
  );
}

export function DeleteTournament() {
  return applyDecorators(
    ApiOperation({ summary: 'Set tournament as inactive with ID' }),
  );
}
