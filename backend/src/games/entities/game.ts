import { Entity, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';

import { User } from '../../user/user.entity';
import { Base } from './base';
import { Set } from './set';

@Entity()
export class Game extends Base {
  @ManyToOne(() => User, { eager: true, nullable: false })
  owner: User;

  @OneToMany(
    () => Set,
    set => set.game,
    { cascade: true, eager: true },
  )
  sets: Set[];

  @Column()
  slotsCount: number;

  @ManyToMany(() => User, { eager: true })
  @JoinTable()
  players: User[];

  get playersCount() {
    return this.players.length;
  }

  hasAvailableSlots() {
    return this.players?.length < this.slotsCount;
  }

  hasPlayer(id: number) {
    return !!this.players.find(user => user.id === id);
  }

  // TODO: implement
  isFinished() {
    return false;
  }

  // async lastSet(): Set | undefined {
  //   return Game.findOne({where: {isFinished: false}})
  // }

  playingSet(): Set | null {
    //

    return null;
  }
}
