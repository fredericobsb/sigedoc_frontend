import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnexoService } from 'src/app/_services/anexo.service';

@Component({
  selector: 'app-modal-exclusao',
  templateUrl: './modal-exclusao.component.html',
  styleUrls: ['./modal-exclusao.component.css']
})
export class ModalExclusaoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalExclusaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matSnackBar: MatSnackBar,
    private anexoService: AnexoService) { }

  ngOnInit(): void {
    console.log('data passado==>', this.data);
  }

  close() {
    this.dialogRef.close();
  }

  excluirAnexo(){
      this.anexoService.excluirAnexo(this.data.id)
        .subscribe(res =>{
            this.close();
            this.matSnackBar.open("Arquivo Excluído com Sucesso!", "Fechar", {duration: 3000});
        }, error => {
          this.close();
          this.matSnackBar.open("Erro ao tentar excluir o arquivo...", "Fechar", {duration: 3000});
        });
      
  }

}
