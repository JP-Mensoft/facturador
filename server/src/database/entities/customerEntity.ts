// App
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { InvoiceEntity } from "./invoiceEntity";
import { UserEntity } from "./userEntity";

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

    @ManyToOne(() => UserEntity, (user) => user.customers, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    public userId!: number;

    @OneToMany(() => InvoiceEntity, (invoice) => invoice.userId)
    public invoices!: InvoiceEntity[];

    @PrimaryGeneratedColumn()
    public customerId!: number;

}