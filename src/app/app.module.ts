import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { QstDataGridComponent } from "./qst-data-grid/qst-data-grid.component";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ArrayCellComponent } from "./qst-data-grid/cell-component/array-component/array.cell.component";
import { TextCellComponent } from "./qst-data-grid/cell-component/text-component/text.cell.component";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        QstDataGridComponent,
        DragDropModule,
        ArrayCellComponent,
        TextCellComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }