import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {

  @Input() public comment = {
    user : 'Carregando',
    comment : 'Carregando',
    evaluation: null,
    date: 'Carregando'
  };

  constructor() { }

  ngOnInit() {}

}
