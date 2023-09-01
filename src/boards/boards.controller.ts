import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { json } from 'stream/consumers';
import { Board } from './board.entity';
import { BoardStatus } from './board.status.enum';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('BoardController');
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllboard(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(`User ${user.userName} trying to get all boards`);
    return this.boardsService.getAllBoards(user);
  }

  // @Get()
  // getAllBoard(): Board[] {
  //   return this.boardsService.getAllBoards()
  // }

  // // @Post()
  // // createBorad(
  // //   @Body('title') title: string,
  // //   @Body('description') description: string
  // //   ): Board{
  // //   return this.boardsService.createBoard(title,description)
  // // } Dto를 적용하지 않고 작성할 때 사용방법

  @Post()
  @UsePipes(ValidationPipe)
  async createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    this.logger.verbose(
      `User ${user.userName} creating a new board. Payload: ${JSON.stringify(
        createBoardDto,
      )}`,
    );
    await this.boardsService.createBoard(createBoardDto, user);
    return { message: 'Create Board SUCCESS' };
  }
  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(
  //   @Body() createBoardDto: CreateBoardDto
  // ): Board {
  //   return this.boardsService.createBoard(createBoardDto)
  // }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }
  // @Get('/:id')
  // getBoardById(
  //   @Param('id') id: string): Board {
  //     return this.boardsService.getBoardById(id)
  //   }

  @Delete('/:id')
  async deleteBoard(
    @Param('id', ParseIntPipe) id,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    await this.boardsService.deleteBoard(id, user);
    return { message: 'Delete Board SUCCESS' };
  }
  // @Delete('/:id')
  // deleteBoard(
  //   @Param('id') id: string): void {
  //     this.boardsService.deleteBoard(id)
  //   }

  @Patch('/:id/status')
  async updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    await this.boardsService.updateBoardStatus(id, status);
    return { message: 'Status Change SUCCESS' };
  }
  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus
  // ) {
  //   return this.boardsService.updateBoardStatus(id, status)
  // }
}
