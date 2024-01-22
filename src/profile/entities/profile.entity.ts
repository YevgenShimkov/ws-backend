import { BaseDateEntity } from '@src/common/entities/BaseDateEntity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from '@src/user/entities/user.entity';

@Entity('ws_profile')
export class Profile extends BaseDateEntity {
  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  organization: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
