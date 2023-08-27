import { User } from "./user";

export class Anexo{
    public id: string;
    public nomeDocumento: string;
    public dataInclusao: Date;
    public dataAtualizacao: Date;
    public anexo: Blob;
    public matricula: string;
    public ativo: boolean;
    public user: User;
   
    static fromJson(jsonData: any): Anexo {
        return Object.assign(new Anexo(), jsonData);
    }
}