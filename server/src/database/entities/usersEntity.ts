// App
import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import bcrypt from "bcrypt";
import { utilsRng } from "../../utils/appUtils";
import jwt from "jsonwebtoken";
import { appEnvironment } from "../../environment/appEnvironment";
// Models
import { AppUserModel } from "../../models/appModels/appUserModel";

@Entity()
@Unique(["email"])
export class UsersEntity {

    @PrimaryGeneratedColumn()
    public userId!: number;

    @Column({ length: 444 })
    public email!: string;

    @Column({ length: 444 })
    public password!: string;

    @Column({ length: 10, nullable: true, default: "" })
    public recoveryCode!: string;

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
        const payload: AppUserModel = {
            userId: this.userId
        }
        return jwt.sign(payload, appEnvironment.jwtKey, { expiresIn: "2h" })
    }

}