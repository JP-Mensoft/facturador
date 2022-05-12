// App
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
// Models
import { UserEntity } from "./userEntity";

@Entity()
export class CompanyEntity {

    @Column({ length: 444, nullable: true, default: "" })
    public name!: string;

    @Column({ length: 4444, nullable: true, default: "" })
    public logoURL!: string;

    @Column({ length: 4444, nullable: true, default: "" })
    public address!: string;

    @Column({ length: 9, nullable: true, default: "" })
    public cif!: string;

    @Column({ length: 44, nullable: true, default: "" })
    public iban!: string;

    @OneToOne(() => UserEntity, { onDelete: "CASCADE" })
    @JoinColumn()
    public userId!: number;

    @PrimaryGeneratedColumn()
    public companyId!: number;

}