import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateResultDto } from '../dto/create-result.dto';
import { UpdateResultDto } from '../dto/update-result.dto';

export function CreateResult() {
  return applyDecorators(
    ApiOperation({ summary: 'Create result' }),
    ApiResponse({ status: 201, description: 'Result created' }),
    ApiBody({ type: CreateResultDto }),
  );
}

export function FindOneResult() {
  return applyDecorators(ApiOperation({ summary: 'Find result by ID' }));
}

export function FindResults() {
  return applyDecorators(ApiOperation({ summary: 'Find results' }));
}

export function UpdateResult() {
  return applyDecorators(
    ApiOperation({ summary: 'Update result' }),
    ApiBody({ type: UpdateResultDto }),
  );
}

export function DeleteResult() {
  return applyDecorators(
    ApiOperation({ summary: 'Set result as inactive by ID' }),
  );
}
