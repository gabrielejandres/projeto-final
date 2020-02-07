import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  editForm: FormGroup;
  is_locator: boolean = true;

    //Construtor do formulário
    constructor(public formbuilder: FormBuilder) { 
      this.editForm = this.formbuilder.group({
        name: [null, [Validators.minLength(3)]],
        email: [null, [Validators.email]],
        password: [null, [Validators.minLength(6)]],
        phone: [null]
      });
  }

  ngOnInit() {
  }

  //Função que é chamada ao submeter o formulário e enviar dados para edição no back
  submitForm(form){
    console.log(form);
    console.log(form.value); //mostra os valores dos campos do form
  }

}
