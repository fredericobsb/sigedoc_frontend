import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalAnexoComponent } from '../modal-anexo/modal-anexo/modal-anexo.component';
import { AnexoService } from '../_services/anexo.service';
import { Anexo } from '../_models/anexo';



export interface PeriodicElement {
  nome: string;
  matricula: number;
  documentos: string[];
}

const ELEMENT_DATA: PeriodicElement[] = [
  {matricula: 1000, nome: 'Fred', documentos:[]},
  {matricula: 2000, nome: 'Ana Lidia', documentos:[]}
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['matricula', 'nomeDocumento', 'dataInclusao', 'manutencao'];
 // dataSource = new ExampleDataSource();
 dataSource;

  constructor(private matDialog: MatDialog,
              private anexoService: AnexoService) { }

  ngOnInit(): void {
    this.anexoService.listarTodos()
      .subscribe((res:Anexo[]) =>{
        console.log('-------- listar Todos em home.component ==> ', res);
        this.dataSource = new BehaviorSubject<Anexo[]>(res);
      });
  }

  adicionarDocumento(element){
    console.log(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = element;
    let dialogRef = this.matDialog.open(ModalAnexoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`); 
    });
  }

}

 class ExampleDataSource extends DataSource<PeriodicElement> {
  /** Stream of data that is provided to the table. */
  data = new BehaviorSubject<PeriodicElement[]>(ELEMENT_DATA);

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<PeriodicElement[]> {
    return this.data;
  }

  disconnect() {}

}





/*
import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    users: User[];

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }
}
*/