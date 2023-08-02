import { CommonModule } from "@angular/common";
import { MatChipsModule } from '@angular/material/chips';
import { Component, Inject, Injectable, InjectionToken, Input, OnInit } from "@angular/core";
import { InputItem } from "src/model/input/input.model";

@Component({
    standalone: true,
    imports: [MatChipsModule, CommonModule],
    selector: 'array-cell',
    template: `
    <ng-container *ngFor="let item of input">
        <mat-chip-option>{{item}}</mat-chip-option>
    </ng-container>
  `
})

@Injectable()
export class ArrayCellComponent implements OnInit{
    @Input() input = [];

    constructor(private inputInjected: InputItem) {

    }

    ngOnInit() {
        this.input = this.inputInjected.value || this.input;
    }
}
