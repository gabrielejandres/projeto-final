import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/* INTEGRAÇÃO */
import { RegisterRepublicService } from '../services/register-republic.service';

@Component({
  selector: 'app-register-address',
  templateUrl: './register-address.page.html',
  styleUrls: ['./register-address.page.scss'],
})
export class RegisterAddressPage implements OnInit {

  addressForm: FormGroup;

    //Construtor do formulário
    constructor(public formbuilder: FormBuilder, private router: Router, public registerRepublicService: RegisterRepublicService) { 
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
    this.registerRepublicService.updateRepublic(form.value).subscribe( (res) => {
      console.log(res); 
      // console.log(res.status);
      if(res.status == 401){
        alert('Dados inválidos');
        //console.log(res.error);
      }
      else if(res.status == 200){
        //console.log(res.success);
      }
    })
    this.router.navigate(['/home']);
  }

}
