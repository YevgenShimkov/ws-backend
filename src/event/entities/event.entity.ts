import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseDateEntity } from '@src/common/entities/BaseDateEntity';
import {
  TypeEventEnum,
  StatusEventEnum,
  StatusEnum,
  SenderProviderEventEnum,
} from '@src/event/enums/event.unums';
import { Log } from '@src/log/entities/log.entity';
import { User } from '@src/user/entities/user.entity';

@Entity('ws_event')
export class Event extends BaseDateEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  type: TypeEventEnum;

  @Column({ name: 'event_status' })
  eventStatus: StatusEventEnum;

  @Column()
  deadline: Date;

  @Column()
  status: StatusEnum;

  @Column({ name: 'sender_provider', enum: SenderProviderEventEnum })
  sender_provider: SenderProviderEventEnum;

  @OneToMany(() => Log, (log) => log.event)
  logs: Log[];

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
