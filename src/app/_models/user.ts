import { Anexo } from './anexo';
import {Role} from './role';

export class User {
    id: string;
    username: string;
    password: string;
    email: string;
    roles: Role[];
    matricula: string;
    listaDocumentos: Anexo[];
    //public token?: string;
    public accessToken?: string;
}