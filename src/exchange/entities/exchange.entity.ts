import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';


@Entity('exchange')
export class Exchange {

  @PrimaryColumn({ type: 'bigint' })
  public id: string;

  @Column({ length: 20 })
  public code: string;

  @Column({ type: 'float' })
  public price: number;

  @Column({ type: 'timestamp' })
  public trade_time: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(3)' })
  public created: Date;

  @UpdateDateColumn({ type: 'timestamp', default: null, onUpdate: 'CURRENT_TIMESTAMP(3)' })
  public updated: Date;
}