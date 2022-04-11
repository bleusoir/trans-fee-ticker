import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('codes')
export class Code {

  @PrimaryColumn({ type: 'bigint' })
  public id: string;

  @Column({ length: 50 })
  public code: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(3)' })
  public created: Date;

  @UpdateDateColumn({ type: 'timestamp', default: null, onUpdate: 'CURRENT_TIMESTAMP(3)' })
  public updated: Date;
}