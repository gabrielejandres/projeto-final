import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-address',
  templateUrl: './register-address.page.html',
  styleUrls: ['./register-address.page.scss'],
})
export class RegisterAddressPage implements OnInit {

  addressForm: FormGroup;

    //Construtor do formulário
    constructor(public formbuilder: FormBuilder, private router: Router) { 
      this.addressForm = this.formbuilder.group({
        street: [null, [Validators.required]],
        neighborhood: [null, [Validators.required]],
        number: [null, [Validators.required]],
        complement: [null],
      });
  }

  ngOnInit() {
  }

  //Função disparada quando o form é enviado
  submitForm(form){
    console.log(form);
    console.log(form.value); 
    alert('República cadastrada com sucesso');
    this.router.navigate(['/home']);
  }

}
