// App
import { EntityManager } from "typeorm";
import { dbConnection } from "../database/dbConnection";
// Models
import { ConceptEntity } from "../database/entities/conceptEntity";
import { ResponseModel } from "../models/responseModel";

export class ConceptDataAccess {

    private entityManager: EntityManager;

    constructor() {
        this.entityManager = dbConnection.manager;
    }

    public async addConcept(concept: ConceptEntity) {
        let dataResponse: ResponseModel = new ResponseModel();
        try {
            const saveResult = await this.entityManager.save(ConceptEntity, concept);
            if (saveResult != null) {
                dataResponse.success = true;
                dataResponse.result = saveResult;
            }
        } catch (error) {
            dataResponse.result = error;
        }
        return dataResponse;
    }

}