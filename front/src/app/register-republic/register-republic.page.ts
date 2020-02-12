import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx'; //UPLOAD FILES

/* INTEGRAÇÃO */
import { RegisterRepublicService } from '../services/register-republic.service';

@Component({
  selector: 'app-register-republic',
  templateUrl: './register-republic.page.html',
  styleUrls: ['./register-republic.page.scss'],
})
export class RegisterRepublicPage implements OnInit {

  public photo;
  republicForm: FormGroup;
  individual: boolean = false;
  double: boolean = false;
  triple: boolean = false;

    constructor(public formbuilder: FormBuilder, private router: Router, public registerRepublicService: RegisterRepublicService, private camera: Camera) { 
      this.republicForm = this.formbuilder.group({
        name: [null, [Validators.required, Validators.minLength(3)]],
        hasIndividual: [null],
        hasDouble: [null],
        hasTriple: [null],
        single_rooms: [null],
        double_rooms: [null],
        triple_rooms: [null],
        single_price: [null],
        double_price: [null],
        triple_price: [null],
        info: [null],
        photo: [null]
      });
  }

  ngOnInit() {
  }

  //Função que envia dados da república para o BD
  submitForm(form){
    //Definição de dados default
    if(form.value.single_rooms == null){
      form.value.single_rooms = 0;
    }
    if(form.value.double_rooms == null){
      form.value.double_rooms = 0;
    }
    if(form.value.triple_rooms == null){
      form.value.triple_rooms = 0;
    }
    if(form.value.single_price == null){
      form.value.single_price = '0';
    }
    else{
      form.value.single_price = form.value.single_price.replace(',', '.');
    }
    if(form.value.double_price == null){
      form.value.double_price = '0';
    }
    else{
      form.value.double_price = form.value.double_price.replace(',', '.');
    }
    if(form.value.triple_price == null){
      form.value.triple_price = '0';
    }
    else{
      form.value.triple_price = form.value.triple_price.replace(',', '.');
    }
    if(form.value.info == null){
      form.value.info = 'República localizada no estado do RJ';
    }
    console.log(form.value);
    this.registerRepublicService.createRepublic(form.value).subscribe( (res) => {
      //console.log(res); 
      //console.log(res.status);
      if(res.status == 401){
        alert('Dados inválidos');
        //console.log(res.error);
      }
      else if(res.status == 200){
        //console.log(res.republic);
        //console.log('id da republica', res.republic.id);
        localStorage.setItem('id_republic', res.republic.id);
        this.router.navigate(['/register-address']);
        //console.log(res.success);
      }
    })
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

  //Função que abre a galeria do celular
  // openGallery(){
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //     saveToPhotoAlbum: false
  //   };

  //   this.camera.getPicture(options).then(
  //     (imageData) => {
  //       this.photo = 'data:image/jpeg;base64' + imageData;
  //       console.log('data:image/jpeg;base64' + imageData);
  //     },
  //     (error) =>{
  //       console.log(error);
  //     }
  //   );
  // }

