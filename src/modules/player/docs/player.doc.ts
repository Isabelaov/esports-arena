import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';

export function CreatePlayer() {
  return applyDecorators(
    ApiOperation({ summary: 'Create player' }),
    ApiResponse({ status: 201, description: 'Player created' }),
    ApiResponse({ status: 400, description: 'Player already exists' }),
    ApiBody({ type: CreatePlayerDto }),
  );
}

export function FindOnePlayer() {
  return applyDecorators(
    ApiOperation({ summary: 'Find player by ID' }),
    ApiResponse({ status: 404, description: 'Player not found' }),
    ApiResponse({ status: 200, description: 'Player found' }),
  );
}

export function FindPlayers() {
  return applyDecorators(
    ApiOperation({ summary: 'Find players' }),
    ApiResponse({ status: 404, description: 'Players not found' }),
  );
}

export function UpdatePlayer() {
  return applyDecorators(
    ApiOperation({ summary: 'Update player' }),
    ApiResponse({ status: 404, description: 'Player not found' }),
    ApiResponse({ status: 200, description: 'Player updated successfully' }),
    ApiBody({ type: UpdatePlayerDto }),
  );
}

export function DeletePlayer() {
  return applyDecorators(
    ApiOperation({ summary: 'Set player as inactive with ID' }),
    ApiResponse({ status: 404, description: 'Player not found' }),
    ApiResponse({ status: 200, description: 'Player set as inactive' }),
  );
}
