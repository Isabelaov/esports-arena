import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';

export function CreatePlayer() {
  return applyDecorators(
    ApiOperation({ summary: 'Create player' }),
    ApiResponse({ status: 201, description: 'Player created' }),
    ApiBody({ type: CreatePlayerDto }),
  );
}

export function FindOnePlayer() {
  return applyDecorators(ApiOperation({ summary: 'Find player by ID' }));
}

export function FindPlayers() {
  return applyDecorators(ApiOperation({ summary: 'Find players' }));
}

export function UpdatePlayer() {
  return applyDecorators(
    ApiOperation({ summary: 'Update player' }),
    ApiBody({ type: UpdatePlayerDto }),
  );
}

export function DeletePlayer() {
  return applyDecorators(
    ApiOperation({ summary: 'Set player as inactive with ID' }),
  );
}
