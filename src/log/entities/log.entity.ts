import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseDateEntity } from '@src/common/entities/BaseDateEntity';
import { Event } from '@src/event/entities/event.entity';

@Entity('ws_log')
export class Log extends BaseDateEntity {
  @Column({
    length: 100,
    type: 'varchar',
  })
  message: string;

  @ManyToOne(() => Event, (event) => event.id)
  @JoinColumn({ name: 'event_id' })
  event: Event;
}
