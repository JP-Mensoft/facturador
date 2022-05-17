// App
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ConceptEntity } from "./conceptEntity";
// Models
import { CustomerEntity } from "./customerEntity";
import { UserEntity } from "./userEntity";

@Entity()
export class InvoiceEntity {

    @Column({ nullable: false })
    public date!: string;

    @Column({ nullable: true, default: 0 })
    public invoiceNumber!: number;

    @Column({ nullable: true, default: 0 })
    public orderNumber!: number;

    @Column({ length: 4444, nullable: true, default: "" })
    public remarks!: string;

    @Column({ nullable: true, default: false })
    public charged!: boolean;

    @Column({ nullable: true, default: "" })
    public collectionDate!: string;

    @OneToMany(() => ConceptEntity, (concept) => concept.invoice, { eager: true })
    public concepts!: ConceptEntity[];

    @ManyToOne(() => CustomerEntity, (customer) => customer.invoices, { eager: true })
    public customer!: number;

    @ManyToOne(() => UserEntity, (user) => user.invoices, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    public user!: number;

    @PrimaryGeneratedColumn()
    public invoiceId!: number;

}