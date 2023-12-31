import { Component } from '@angular/core';
import { DataService } from './data.service';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { ColumnMetaModel } from 'src/model/column-meta/column.meta.model';
import { withDebugTracing } from '@angular/router';

@Component({
    selector: 'app-root',
    styleUrls: ['app.component.scss'],
    templateUrl: 'app.component.html'
})

export class AppComponent {
    constructor(private _dataService: DataService) {
    }

    displayColumns: ColumnMetaModel[] = [
        {
            name: 'name',
            type: 'string',
            title: 'Name',
            order: 0,
            display: true,
            width:20
        },
        {
            name: 'genre',
            type: 'array',
            title: 'Genre',
            order: 1,
            display: true,
            width:20
        }, 
        {
            name: 'cast',
            type: 'array',
            title: 'Cast',
            order: 4,
            display: true,
            width:20
        },
        {
            name: 'budget',
            type: 'string',
            title: 'Budget',
            order: 5,
            display: true,
            width:20
        },
        {
            name: 'boxOffice',
            type: 'string',
            title: 'Box Office',
            order: 6,
            display: true,
            width:20
        },
        {
            name: 'country',
            type: 'string',
            title: 'Country',
            order: 7,
            display: true,
            width:20
        },
        {
            name: 'children',
            type: 'string',
            title: 'Children',
            order: 8,
            display: true,
            width:20
        },
        {
            name: 'rating',
            type: 'rating',
            title: 'Rating',
            order: 2,
            display: true,
            icon: "grade",
            width:20
        }, 
        {
            name: 'year',
            type: 'number',
            title: 'Year',
            order: 3,
            display: true,
            width:20
        }];
    dataSource = new MatTableDataSource<any>(); // TODO - replace any with a generic type
    length = 0;
    pageIndex = 0;
    pageSize = 5;
    sort: Sort = {
        active: '',
        direction: ''
    };

    filterState: any = {};
    isLoading = false;

    ngOnInit() {
        this.isLoading = true;
        this._dataService.getData().subscribe(data => {
            this.dataSource = new MatTableDataSource<any>(data.movies);
            this.length = data.total;
            this.pageIndex = data.page;
            this.pageSize = data.limit;
            this.isLoading = false;
        });
    }

    onPageChange(event: any) {
        this.isLoading = true;
        this.dataSource = new MatTableDataSource<any>([]);

        this._dataService.getData(event.pageIndex, event.pageSize, this.sort.active, this.sort.direction).subscribe(data => {
            this.dataSource = new MatTableDataSource<any>(data.movies);
            this.length = data.total;
            this.pageIndex = data.page;
            this.pageSize = data.limit;
            this.isLoading = false;
        });
    }

    onSortChange(sortState: Sort) {
        this.isLoading = true;
        this.dataSource = new MatTableDataSource<any>([]);

        this._dataService.getData(0, this.pageSize, sortState.active, sortState.direction).subscribe(data => {
            this.dataSource = new MatTableDataSource<any>(data.movies);
            this.sort = sortState;
            this.length = data.total;
            this.pageIndex = data.page;
            this.pageSize = data.limit;
            this.isLoading = false;
        });
    }

    onFilterChange(filterState: any) {
        this.isLoading = true;
        this.dataSource = new MatTableDataSource<any>([]);
        let regexQuery: any = {};
        Object.keys(filterState).map(key => {
            regexQuery[key] = { '$regex': filterState[key], '$options': 'i' };
        });
        this._dataService.getData(0, this.pageSize, this.sort.active, this.sort.direction, regexQuery).subscribe(data => {
            this.dataSource = new MatTableDataSource<any>(data.movies);
            this.length = data.total;
            this.pageIndex = data.page;
            this.pageSize = data.limit;
            this.filterState = filterState;
            this.isLoading = false;
        });
    }
}
