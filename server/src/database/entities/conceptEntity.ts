// App
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { InvoiceEntity } from "./invoiceEntity";
// Models

@Entity()
export class ConceptEntity {

    @Column({ length: 4444, nullable: true, default: "" })
    public concept!: string;

    @Column({ nullable: true, default: 0 })
    public amount!: number;

    @ManyToOne(() => InvoiceEntity, (invoice) => invoice.concepts)
    public invoice!: InvoiceEntity;

    @PrimaryGeneratedColumn()
    public conceptId!: number;

}