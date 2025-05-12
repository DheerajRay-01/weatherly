import { Client,Databases,ID,Query} from "appwrite";
import conf from "../../conf";

export class Service {
    client = new Client();
    databases;
    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwritProjectId); 
        this.databases = new Databases(this.client)
    }

    async createSave({city,user}){
       try {
        
       return await this.databases.createDocument(
            conf.appwritDatabaseId,
            conf.appwritCollectionId,
            ID.unique(),
            {
            city,
            user
        }
        )
        
       } catch (error) {
        console.log("Appwrite serive :: createSave :: error", error);
        throw error
       }
    
    }

    async getAllSaved(user){
       try {
        return await this.databases.listDocuments(
            conf.appwritDatabaseId,
            conf.appwritCollectionId,
            [
                Query.equal('user', user)
            ]

        )
       } catch (error) {
        console.log("Appwrite serive :: getSaved :: error", error);
        throw error
       }
    }


    async getSave(id){
        try {
            return await this.databases.getDocument(
                conf.appwritDatabaseId,
                conf.appwritCollectionId,
                id
            )
        } catch (error) {
            console.log("Appwrite serive :: getSave :: error", error);
            throw error
        }
    }


    async deleteSave(id){
        try {
            return await this.databases.deleteDocument(conf.appwritDatabaseId,conf.appwritCollectionId,id)
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            throw error
        }
    }    
}

const service = new Service
export default service