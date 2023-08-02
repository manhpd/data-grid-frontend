import { Component, Input, OnInit } from "@angular/core";
import { InputItem } from "src/model/input/input.model";


@Component({
  selector: 'text-cell',
  standalone: true,
  template: `
    <span>{{input}}</span>
  `
})

export class TextCellComponent implements OnInit{
    @Input() input = 'text-cell works!';

    constructor(private inputInjected: InputItem) {

    }

    ngOnInit() {
        this.input = this.inputInjected.value || this.input;
    }
}
