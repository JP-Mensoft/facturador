// App
import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from "typeorm";
import bcrypt from "bcrypt";
import { utilsRng } from "../../utils/utils";
import jwt from "jsonwebtoken";
import { Environment } from "../../app/environment";
// Models
import { DecodedTokenModel } from "../../models/decodedModel";
import { CustomerEntity } from "./customerEntity";

@Entity()
export class UserEntity {

    @Column({ unique: true, length: 444, nullable: false })
    public email!: string;

    @Column({ length: 444, nullable: false })
    public password!: string;

    @Column({ length: 444, nullable: true, default: "" })
    public name!: string;

    @Column({ length: 444, nullable: true, default: "" })
    public phone!: string;

    @Column({ length: 10, nullable: true, default: "" })
    public recoveryCode!: string;

    @ManyToMany(() => CustomerEntity)
    @JoinTable()
    public customers!: CustomerEntity[]

    @PrimaryGeneratedColumn()
    public userId!: number;

    // Functions

    public saveHashPassword(password: string): void {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(password, salt);
    }

    public checkPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password);
    }

    public changePassword(oldPassword: string, newPassword: string): boolean {
        if (this.checkPassword(oldPassword)) {
            this.saveHashPassword(newPassword);
            return true;
        } else {
            return false;
        }
    }

    public generateRecoveryCode(): string {
        const rn = utilsRng(10);
        this.recoveryCode = rn;
        return rn;
    }

    public generateSesionToken(): string {
        const payload: DecodedTokenModel = {
            userId: this.userId
        }
        return jwt.sign(payload, Environment.jwtKey, { expiresIn: "2h" })
    }

}