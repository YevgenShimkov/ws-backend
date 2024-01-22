import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { BaseDateEntity } from '@src/common/entities/BaseDateEntity';
import { UserStatus } from '@src/common/enums/user-status.enums';
import { Profile } from '@src/profile/entities/profile.entity';
import { Event } from '@src/event/entities/event.entity';

@Entity('ws_user')
export class User extends BaseDateEntity {
  @Column()
  email: string;

  @Column({ name: 'cognito_id' })
  cognitoId: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.PENDING })
  status: UserStatus;

  @OneToMany(() => Event, (event) => event.user)
  events: Event[];

  @OneToOne(() => Profile, (profile) => profile.id, { onDelete: 'CASCADE' })
  profile: Profile;
}
