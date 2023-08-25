import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import {AnexoService} from '../../_services/anexo.service';
import { Anexo } from 'src/app/_models/anexo';


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

   constructor( public dialogRef: MatDialogRef<ModalAnexoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer,
    private anexoService: AnexoService){}

  ngOnInit(): void {
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
    for (const f of this.files) {
      if (f.name === file.name
        && f.lastModified === file.lastModified
        && f.size === f.size
        && f.type === f.type
      ) {
        return false
      }
    }
    return true
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
    let anexo = new Anexo();
    anexo.anexo = this.files[0];
    anexo.matricula = this.data.matricula;
    anexo.ativo = true;
    anexo.dataInclusao = new Date();
    anexo.nomeDocumento = this.files[0].name;
    this.anexoService.salvarAnexo(anexo)
      .subscribe(res =>{
          console.log('-------- volta do salvarAnexo ==> ', res);
      });
  }
}
