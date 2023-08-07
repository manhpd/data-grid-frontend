import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Injector, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
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
import { CdkDragDrop, CdkDragStart, CdkDropList, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ColumnMetaModel } from 'src/model/column-meta/column.meta.model';
import { CellMap } from './cell-component/cell.map';
import { ArrayCellComponent } from './cell-component/array-component/array.cell.component';
import { TextCellComponent } from './cell-component/text-component/text.cell.component';
import { InputItem } from 'src/model/input/input.model';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
@Component({
    selector: 'qst-data-grid',
    styleUrls: ['qst-data-grid.component.scss'],
    templateUrl: 'qst-data-grid.component.html',
    standalone: true,
    imports: [
        MatTableModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatSortModule,
        MatButtonModule,
        MatSidenavModule,
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
        ArrayCellComponent,
        TextCellComponent,
        CommonModule
    ],
})



export class QstDataGridComponent implements AfterViewInit {
    @Input() displayedColumns: ColumnMetaModel[] = [];
    @Input() dataSource = new MatTableDataSource<any>(); // TODO - replace any with a generic type
    @Input() pageSize = 10;
    @Input() pageSizeOptions = [5, 10, 25, 100];
    @Input() length = 0;
    @Input() pageIndex = 0;
    @Input() isLoading = false;
    @Input() title: string = "";
    @Output() pageChange = new EventEmitter<any>();
    @Output() sortChange = new EventEmitter<any>();
    @Output() filterChange = new EventEmitter<any>();

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatTable, { read: ElementRef }) private matTableRef!: ElementRef;

    public opened = false;

    get displayedColumnsKeys(): string[] {
        return this.displayedColumns.filter((col) => col.display).map((column) => column.name);
    }

    public conditionsList = CONDITIONS_LIST;
    public searchValue: any = {};
    public searchCondition: any = {};
    pressed = false;
    currentResizeIndex: number = -1;
    startX!: number;
    startWidth!: number;
    isResizingRight: boolean = false;
    resizableMousemove!: (() => void);
    resizableMouseup!: (() => void);


    constructor(private inj: Injector, private renderer: Renderer2) {
    }

    ngAfterViewInit() {
        this.paginator.page.subscribe((event) => this.onPaginateChange(event));
        this.setTableResize(this.matTableRef.nativeElement.clientWidth);
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

    getComponentByType(type: string) {
        return CellMap.get(type) || TextCellComponent;
    }

    getInjector(value: any) {
        let injector = Injector.create([
            { provide: InputItem, useValue: { value } }
        ], this.inj);

        return injector;
    }

    setTableResize(tableWidth: number) {
        let totWidth = 0;
        this.displayedColumns.forEach((column) => {
            totWidth += column.width;
        });
        const scale = (tableWidth - 5) / totWidth;
        this.displayedColumns.forEach((column) => {
            column.width *= scale;
            this.setColumnWidth(column);
        });
    }

    
    onResizeColumn(event: any, index: number) {
        event.stopPropagation();
        event.preventDefault();
        console.log(event.pageX, event.target.parentElement);
        this.checkResizing(event, index);
        this.currentResizeIndex = index;
        this.pressed = true;
        this.startX = event.pageX;
        this.startWidth = event.target.parentElement.parentElement.parentElement.clientWidth;
        this.mouseMove(index);
    }

    private checkResizing(event: any, index: number) {
        const cellData = this.getCellData(index);
        if ((index === 0) || (Math.abs(event.pageX - cellData.right) < cellData.width / 2 && index !== this.displayedColumns.length - 1)) {
            this.isResizingRight = true;
        } else {
            this.isResizingRight = false;
        }
    }

    private getCellData(index: number) {
        const headerRow = this.matTableRef.nativeElement.children[0].querySelector('tr');
        const cell = headerRow.children[index];
        return cell.getBoundingClientRect();
    }

    mouseMove(index: number) {
        this.resizableMousemove = this.renderer.listen('document', 'mousemove', (event) => {
            if (this.pressed && event.buttons) {
                const dx = (this.isResizingRight) ? (event.pageX - this.startX) : (-event.pageX + this.startX);
                const width = this.startWidth + dx;
                if (this.currentResizeIndex === index && width > 50) {
                    this.setColumnWidthChanges(index, width);
                }
            }
        });
        this.resizableMouseup = this.renderer.listen('document', 'mouseup', (event) => {
            if (this.pressed) {
                this.pressed = false;
                this.currentResizeIndex = -1;
                this.resizableMousemove();
                this.resizableMouseup();
            }
        });
    }

    setColumnWidthChanges(index: number, width: number) {
        const orgWidth = this.displayedColumns[index].width;
        const dx = width - orgWidth;
        if (dx !== 0) {
            const j = (this.isResizingRight) ? index + 1 : index - 1;
            const newWidth = this.displayedColumns[j].width - dx;
            if (newWidth > 50) {
                this.displayedColumns[index].width = width;
                this.setColumnWidth(this.displayedColumns[index]);
                this.displayedColumns[j].width = newWidth;
                this.setColumnWidth(this.displayedColumns[j]);
            }
        }
    }

    setColumnWidth(column: ColumnMetaModel) {
        const columnEls = Array.from(document.getElementsByClassName('mat-column-' + column.name));
        columnEls.forEach((el: any) => {
            el.style.width = column.width + 'px';
        });
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.setTableResize(this.matTableRef.nativeElement.clientWidth);
    }
}

export const CONDITIONS_LIST = [
    { value: "is-empty", label: "Is empty" },
    { value: "is-not-empty", label: "Is not empty" },
    { value: "is-equal", label: "Is equal" },
    { value: "is-not-equal", label: "Is not equal" },
];

