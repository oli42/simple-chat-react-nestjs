import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToMany} from 'typeorm';


@Entity()
export  class Room {

	@PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    from: string;

    @Column({nullable: true})
    to: string;

    @Column({nullable: true})
    tagFrom: string;

    @Column({nullable: true})
    tagTo: string;

    @Column({default: false})
    active: boolean;
}