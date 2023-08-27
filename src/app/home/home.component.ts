import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalAnexoComponent } from '../modal-anexo/modal-anexo/modal-anexo.component';
import { AnexoService } from '../_services/anexo.service';
import { User } from '../_models/user';
import {OperacaoModal} from '../_models/operacao.modal';
import { ModalExclusaoComponent } from '../modal-anexo/modal-exclusao/modal-exclusao.component';
import * as fileSaver from '../../../node_modules/file-saver/src/fileSaver';//"file-saver": "^2.0.2"
import {CorpoDoAnexo} from '../_models/corpoDoAnexo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['username','matricula','documentos'];
  dataSource;
  conteudoPDF:BlobPart;

  constructor(private matDialog: MatDialog,
              private anexoService: AnexoService) { }

  ngOnInit(): void {
    this.anexoService.listarTodos()
      .subscribe((res:User[]) =>{
        this.dataSource = res;
      });
  }

  adicionarDocumento(element){
    let operacaoModal = new OperacaoModal();
    operacaoModal.data = element;
    operacaoModal.mensagem = 'Selecione um documento para ' + element.username;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = operacaoModal;
    const dialogRef = this.matDialog.open(ModalAnexoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(value => {
     //atualiza a lista apos salvar
     this.anexoService.listarTodos()
      .subscribe(res =>{
        this.dataSource = res;
      });
    });
  }

  excluirDocumento(element){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = element;
    const dialogRef = this.matDialog.open(ModalExclusaoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(value => {
     //atualiza a lista apos excluir
     this.anexoService.listarTodos()
      .subscribe(res =>{
        this.dataSource = res;
      });
    });
  }

  download(doc){
    this.anexoService.recuperarAnexo(doc.id)
      .subscribe((documentoRecuperado: CorpoDoAnexo) =>{
        let base64String = documentoRecuperado.anexo;
        let byteAnexo = atob(base64String);
        let byteArray = new Array(byteAnexo.length);
        for(let i = 0; i < byteAnexo.length; i++){
          byteArray[i] = byteAnexo.charCodeAt(i);
        }
        let uIntArray = new Uint8Array(byteArray);
        let blob = new Blob([uIntArray], {type : 'application/pdf'});
        const url = window.URL.createObjectURL(blob);
        fileSaver.saveAs(blob, documentoRecuperado.nomeDocumento + '.pdf');
      });
  }

}