import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-republic',
  templateUrl: './register-republic.page.html',
  styleUrls: ['./register-republic.page.scss'],
})
export class RegisterRepublicPage implements OnInit {

  republicForm: FormGroup;
  individual: boolean = false;
  double: boolean = false;
  triple: boolean = false;

    //Construtor do formulário
    constructor(public formbuilder: FormBuilder, private router: Router) { 
      this.republicForm = this.formbuilder.group({
        name: [null, [Validators.required, Validators.minLength(3)]],
        hasIndividual: [null],
        hasDouble: [null],
        hasTriple: [null],
        qt_individual: [null],
        qt_double: [null],
        qt_triple: [null],
        price_individual: [null],
        price_double: [null],
        price_triple: [null],
        add_info: [null]
      });
  }

  ngOnInit() {
  }

  submitForm(form){
    console.log(form);
    console.log(form.value); 
    this.router.navigate(['/register-address']);
  }

  //Função que seta os inputs de quarto individual
  setIndividual(){
    this.individual = !this.individual;
  }

  //Função que seta os inputs de quarto duplo
  setDouble(){
    this.double = !this.double;
  }

  //Função que seta os inputs de quarto triplo
  setTriple(){
    this.triple = !this.triple;
  }

}
