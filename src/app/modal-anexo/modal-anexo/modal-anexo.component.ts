import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import {AnexoService} from '../../_services/anexo.service';
import { Anexo } from 'src/app/_models/anexo';
import { User } from 'src/app/_models/user';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-modal-anexo',
  templateUrl: './modal-anexo.component.html',
  styleUrls: ['./modal-anexo.component.css']
})
export class ModalAnexoComponent implements OnInit {

  nomeDocumento;
  bytesArquivo;
  arquivoPDF:BlobPart;
  inputFileName: string;
  mensagemValidacaoArquivo: string;
  arquivoValido: boolean = false;

   constructor( public dialogRef: MatDialogRef<ModalAnexoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer,
    private anexoService: AnexoService,
    private matSnackBar: MatSnackBar){}

  ngOnInit(): void {
   console.log(' - data passado paramodalanexo component ->', this.data);
  }

  
  @Input()
  mode
  @Input()
  names
  @Input()
  url
  @Input()
  method
  @Input()
  multiple
  @Input()
  disabled
  @Input()
  accept
  @Input()
  maxFileSize
  @Input()
  auto = true
  @Input()
  withCredentials
  @Input()
  invalidFileSizeMessageSummary
  @Input()
  invalidFileSizeMessageDetail
  @Input()
  invalidFileTypeMessageSummary
  @Input()
  invalidFileTypeMessageDetail
  @Input()
  previewWidth
  @Input()
  chooseLabel = 'Choose'
  @Input()
  uploadLabel = 'Upload'
  @Input()
  cancelLabel = 'Cance'
  @Input()
  customUpload
  @Input()
  showUploadButton
  @Input()
  showCancelButton


  @Input()
  dataUriPrefix
  @Input()
  deleteButtonLabel
  @Input()
  deleteButtonIcon = 'close'
  @Input()
  showUploadInfo

  /**
   *
   */


  @ViewChild('fileUpload')
  fileUpload: ElementRef

  

  @Input()
  files: File[] = []

 
  onClick(event) {
    if (this.fileUpload)
      this.fileUpload.nativeElement.click()
  }

  onInput(event) {

  }

  onFileSelected(event) {
    let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    console.log('event::::::', event)
    for (let i = 0; i < files.length; i++) {
      let file = files[i];

      //if(!this.isFileSelected(file)){
      if (this.validate(file)) {
        //      if(this.isImage(file)) {
        file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
        //      }
        if (!this.isMultiple()) {
          this.files = []
        }
        this.files.push(files[i]);
        //  }
      }
      //}
    }
  }

  removeFile(event, file) {
    let ix
    if (this.files && -1 !== (ix = this.files.indexOf(file))) {
      this.files.splice(ix, 1)
      this.clearInputElement()
    }
  }

  validate(file: File) {
    let validado = true;
    if(file.size > 5242880){//5Mb 
      validado = false;
      this.mensagemValidacaoArquivo = '5Mb é o limite máximo de tamanho de arquivo. ';
    }
    if(file.type !== 'application/pdf'){
      validado = false;
      this.mensagemValidacaoArquivo.concat(' O tipo de arquivo deve ser PDF. ');
    }
    if(validado === true){
      this.arquivoValido = true;
      this.mensagemValidacaoArquivo = '';
    }
    return validado;
  }

  clearInputElement() {
    this.fileUpload.nativeElement.value = ''
  }


  isMultiple(): boolean {
    return this.multiple
  }

  close() {
    this.dialogRef.close();
  }

  salvarAnexo(){
    if(this.arquivoValido){
      let anexo = new Anexo();
      anexo.anexo = this.files[0];
      anexo.matricula = this.data.data.matricula;
      anexo.ativo = true;
      anexo.dataInclusao = new Date();
      anexo.nomeDocumento = this.files[0].name;
      anexo.user = new User();
      anexo.user.id = this.data.data.id;
      this.anexoService.salvarAnexo(anexo)
        .subscribe(res =>{
            this.close();
            this.matSnackBar.open("Arquivo Salvo com Sucesso!", "Fechar", {duration: 3000});
        }, error => {
          this.close();
          this.matSnackBar.open("Erro ao tentar salvar o arquivo...", "Fechar", {duration: 3000});
        });
    }  
  }
}
