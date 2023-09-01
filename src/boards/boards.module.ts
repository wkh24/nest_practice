// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Board } from './board.entity';
// import { BoardsController } from './boards.controller';
// import { BoardsService } from './boards.service';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmExModule } from './typeorm-ex.module';

// @Module({
//   imports: [TypeOrmModule.forFeature([Board])],
//   controllers: [BoardsController],
//   providers: [BoardsService]
// })
// export class BoardsModule {}

@Module({
  imports: [
    // TypeOrmModule.forFeature([Board]),
    TypeOrmExModule.forCustomRepository([BoardRepository]),
    AuthModule,
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
