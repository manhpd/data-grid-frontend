import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { QstDataGridComponent } from "./qst-data-grid/qst-data-grid.component";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { DragDropModule } from "@angular/cdk/drag-drop";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        QstDataGridComponent,
        DragDropModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }