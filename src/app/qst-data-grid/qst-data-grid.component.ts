import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from "@angular/material/select";
import { FormsModule } from '@angular/forms';
import { FilterItemDirective } from './filter-item.directive';
import { ClickStopPropagation } from './menu-button.directive';
import {  CdkDragDrop, CdkDragStart, CdkDropList, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'qst-data-grid',
    styleUrls: ['qst-data-grid.component.scss'],
    templateUrl: 'qst-data-grid.component.html',
    standalone: true,
    imports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        FilterItemDirective,
        ClickStopPropagation,
        DragDropModule,
        MatProgressSpinnerModule,
        CommonModule
    ],
})



export class QstDataGridComponent implements AfterViewInit {
    @Input() displayedColumns: string[] = [];
    @Input() dataSource = new MatTableDataSource<any>(); // TODO - replace any with a generic type
    @Input() pageSize = 10;
    @Input() pageSizeOptions = [5, 10, 25, 100];
    @Input() length = 0;
    @Input() pageIndex = 0;
    @Input() isLoading = false;

    @Output() pageChange = new EventEmitter<any>();
    @Output() sortChange = new EventEmitter<any>();
    @Output() filterChange = new EventEmitter<any>();

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    public conditionsList = CONDITIONS_LIST;
    public searchValue: any = {};
    public searchCondition: any = {};

    ngAfterViewInit() {
        this.paginator.page.subscribe((event) => this.onPaginateChange(event));
    }

    onPaginateChange(event: any) {
        this.pageChange.emit(event);
    }

    announceSortChange(sortState: Sort) {
        this.sortChange.emit(sortState);
    }

    applyFilter() {
        this.filterChange.emit(this.searchValue);
    }

    clearColumn(columnKey: string): void {
        this.searchValue[columnKey] = null;
        this.searchCondition[columnKey] = "none";
        this.applyFilter();
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
    }
}

export const CONDITIONS_LIST = [
    { value: "is-empty", label: "Is empty" },
    { value: "is-not-empty", label: "Is not empty" },
    { value: "is-equal", label: "Is equal" },
    { value: "is-not-equal", label: "Is not equal" },
];

