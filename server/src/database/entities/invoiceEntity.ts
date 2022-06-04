// App
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ConceptEntity } from "./conceptEntity";
// Models
import { CustomerEntity } from "./customerEntity";
import { UserEntity } from "./userEntity";

@Entity()
export class InvoiceEntity {

    @Column({ nullable: false })
    public date!: Date;

    @Column({ length: 4444, nullable: true, default: "" })
    public remarks!: string;

    @Column({ nullable: true, default: false })
    public collected!: boolean;

    @Column({ nullable: true, default: null })
    public collectionDate!: Date;

    @Column({ nullable: true, default: 0 })
    public taxableIncome!: number;

    @Column({ nullable: true, default: 0 })
    public totalAmount!: number;

    @OneToMany(() => ConceptEntity, (concept) => concept.invoiceId, { eager: true })
    public concepts!: ConceptEntity[];

    @ManyToOne(() => CustomerEntity, (customer) => customer.invoices, { eager: true })
    public customerId!: number;

    @ManyToOne(() => UserEntity, (user) => user.invoices, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    public userId!: number;

    @PrimaryGeneratedColumn()
    public invoiceId!: number;

}