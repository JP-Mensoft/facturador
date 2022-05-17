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

    @Column({ length: 4444, nullable: true, default: "" })
    public remarks!: string;

    @Column({ nullable: false, default: false })
    public charged!: boolean;

    @OneToMany(() => ConceptEntity, (concept) => concept.invoiceId, { eager: true })
    public concepts!: ConceptEntity[];

    @ManyToOne(() => CustomerEntity, (customer) => customer.invoices)
    public customerId!: number;

    @ManyToOne(() => UserEntity, (user) => user.invoices)
    public userId!: number;

    @PrimaryGeneratedColumn()
    public invoiceId!: number;

}