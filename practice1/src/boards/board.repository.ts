// import { Injectable } from "@nestjs/common";
// import { DataSource, Repository } from "typeorm";
// import { Board } from "./board.entity";

import { Repository } from "typeorm";
import { Board } from "./board.entity";
import { CustomRepository } from "./typeorm-ex.decorator";

// @Injectable()
// export class BoardRepository extends Repository<Board> { 
//   constructor(private datasource: DataSource) {
//     super(Board, datasource.createEntityManager())
//   }

//   async createBoard(title:string): Promise<Board> {
//     const result = await this.createQueryBuilder('board')
//     .where('board.title = :boardtitle', { boardtitle: title})
//     .getOne()
//     return result
//   }
// }

@CustomRepository(Board)
export class BoardRepository extends Repository<Board>{}