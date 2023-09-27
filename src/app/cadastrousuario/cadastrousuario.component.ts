import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastrousuario',
  templateUrl: './cadastrousuario.component.html',
  styleUrls: ['./cadastrousuario.component.css']
})
export class CadastrousuarioComponent implements OnInit {

  cadastroForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';

  constructor(  private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cadastroForm = this.formBuilder.group({
      username: ['', Validators.required],
      matricula: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.cadastroForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.cadastroForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.cadastrarUsuario(this.f.username.value, 
      this.f.matricula.value, this.f.email.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate(['home']);
                this.matSnackBar.open(data.message, "Fechar");
            },
            error => {
                this.error = error;
                this.loading = false;
            });
  }
}
