import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToMany} from 'typeorm';


@Entity('room')
export default class Room {

	@PrimaryGeneratedColumn()
    id: number;

    @Column()
    id1: number;

    @Column()
    id2: number;

    @Column()
    active: boolean;
}