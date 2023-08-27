import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Anexo } from '../_models/anexo';

const API_URL = `http://localhost:8080/api/auth`;

@Injectable({ providedIn: 'root' })
export class AnexoService {
   

    constructor(private http: HttpClient) { }

    tokenPego = '';

    salvarAnexo(anexo: Anexo): Observable<any>{
        const url = `${API_URL}/anexo`;
        let formData = new FormData();
        formData.append('file', anexo.anexo);
        formData.append('nomeDocumento', anexo.nomeDocumento);
        formData.append('matricula', anexo.matricula);
        formData.append('user_id', anexo.user.id);
        formData.append('Content-type', 'multipart/form-data');
        const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.token});
        return this.http.post(url, formData, {headers});
   } 

   listarTodos(){
    const url = `${API_URL}/users`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.token });
    return this.http.get(url, {headers});
   }

   excluirAnexo(id){
    const url = `${API_URL}/exclusaoLogica/${id}`;
    let formData = new FormData();
    formData.append('anexo_id', id);
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.token});
    return this.http.post(url, formData, {headers});
   }

   recuperarAnexo(id){
    const url = `${API_URL}/anexo/${id}`;
    let formData = new FormData();
    formData.append('id', id);
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.token});
    return this.http.get(url, {headers});
   }
}