import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
	time: string;

    @Column({nullable: true})
    text: string

    @Column({nullable: true})
    fromUsername: string

    @Column({nullable: true})
    roomTag: string

}