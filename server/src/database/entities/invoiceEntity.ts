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

    @Column({ nullable: true, default: 0 })
    public invoiceNumber!: number;

    @Column({ nullable: true, default: 0 })
    public orderNumber!: number;

    @OneToMany(() => ConceptEntity, (concept) => concept.invoice, { eager: true })
    public concepts!: ConceptEntity[];

    @ManyToOne(() => CustomerEntity, (customer) => customer.invoices)
    public customer!: CustomerEntity;

    @ManyToOne(() => UserEntity, (user) => user.invoices)
    public user!: UserEntity;

    @PrimaryGeneratedColumn()
    public invoiceId!: number;

}