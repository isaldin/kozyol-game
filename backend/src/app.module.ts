import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { User } from './user/user.entity';
import { Game } from './games/entities/game';
import { Round } from './games/entities/round';
import { GameSet } from './games/entities/set';

import { GamesController } from './games/games.controller';
import { GamesService } from './games/games.service';
import { GamesModule } from './games/games.module';
import { StepController } from './step/step.controller';
import { SubscribeController } from './subscribe/subscribe.controller';
import { SubscribeModule } from './subscribe/subscribe.module';
import { AwaitedConfirmation } from './games/entities/awaitedConfirmation';
import {root} from "./paths";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: `${root}/data/line.sqlite`,
      // logging: true,
      entities: [User, Game, Round, GameSet, AwaitedConfirmation],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    GamesModule,
    SubscribeModule,
  ],
  controllers: [AppController, GamesController, StepController, SubscribeController],
  providers: [AppService, GamesService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
