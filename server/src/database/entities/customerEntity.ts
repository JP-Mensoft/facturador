// App
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CustomerEntity {

    @Column({ length: 444, nullable: true, default: "" })
    public name!: string;

    @Column({ length: 444, nullable: true, default: "" })
    public email!: string;

    @Column({ length: 444, nullable: true, default: "" })
    public contact!: string;

    @Column({ length: 444, nullable: true, default: "" })
    public phone!: string;

    @Column({ length: 444, nullable: true, default: "" })
    public address!: string;

    @Column({ length: 9, nullable: true, default: "" })
    public cif!: string;

    @Column({ length: 4444, nullable: true, default: "" })
    public remarks!: string;

    @PrimaryGeneratedColumn()
    public customerId!: number;

}