import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { BaseEntity } from '../base.entity';

@Entity('refresh_tokens')
export class RefreshToken extends BaseEntity {
  @Column('timestamp without time zone', {
    name: 'expiration_date',
    nullable: true,
  })
  expirationDate: Date | null;

  @Column('boolean', { name: 'is_used', nullable: true })
  isUsed: boolean | null;

  @Column('timestamp without time zone', { name: 'issue_date', nullable: true })
  issueDate: Date | null;

  @ManyToOne(() => User, (user) => user.refreshTokens, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
