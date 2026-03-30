import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('controllers Check')
@Controller('controllers-check')
export class ControllerCheckController {
  @Get()
  @ApiOperation({ summary: 'Check cart status' })
  @ApiResponse({
    status: 200,
    description: 'Cart is valid',
    schema: {
      example: {
        status: 'ok',
        timestamp: '2026-03-20T10:00:00.000Z',
      },
    },
  })
  check() {
    return {
      status: 'ok',
      timestamp: new Date(),
    };
  }

  @Post()
  @ApiOperation({ summary: 'Update cart status' })
  @ApiResponse({
    status: 200,
    description: 'Cart updated successfully',
    schema: {
      example: {
        status: 'ok',
        timestamp: '2026-03-20T10:00:00.000Z',
      },
    },
  })
  update() {
    return {
      status: 'ok',
      timestamp: new Date(),
    };
  }


} 
