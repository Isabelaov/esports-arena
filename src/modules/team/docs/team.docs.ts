import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateTeamDto } from '../dto/create-team.dto';
import { UpdateTeamDto } from '../dto/update-team.dto';

export function CreateTeam() {
  return applyDecorators(
    ApiOperation({ summary: 'Create team' }),
    ApiResponse({ status: 201, description: 'Team created' }),
    ApiBody({ type: CreateTeamDto }),
  );
}

export function FindOneTeam() {
  return applyDecorators(ApiOperation({ summary: 'Find team by ID' }));
}

export function FindTeams() {
  return applyDecorators(ApiOperation({ summary: 'Find teams' }));
}

export function UpdateTeam() {
  return applyDecorators(
    ApiOperation({ summary: 'Update team' }),
    ApiBody({ type: UpdateTeamDto }),
  );
}

export function DeleteTeam() {
  return applyDecorators(ApiOperation({ summary: 'Delete team by ID' }));
}
