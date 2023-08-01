import { Component } from '@angular/core';
import { DataService } from './data.service';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';

@Component({
    selector: 'app-root',
    styleUrls: ['app.component.scss'],
    templateUrl: 'app.component.html'
})

export class AppComponent {
    constructor(private _dataService: DataService) {
    }

    displayColumns = ['name', 'genre', 'rating', 'year'];
    dataSource = new MatTableDataSource<any>(); // TODO - replace any with a generic type
    length = 0;
    pageIndex = 0;
    pageSize = 5;
    sort: Sort = {
        active: '',
        direction: ''
    };

    filterState: any = {};

    ngOnInit() {
        this._dataService.getData().subscribe(data => {
            this.dataSource = new MatTableDataSource<any>(data.movies);
            this.length = data.total;
            this.pageIndex = data.page;
            this.pageSize = data.limit;
        });
    }

    onPageChange(event: any) {
        console.log(event);
        this._dataService.getData(event.pageIndex, event.pageSize, this.sort.active, this.sort.direction).subscribe(data => {
            this.dataSource = new MatTableDataSource<any>(data.movies);
            this.length = data.total;
            this.pageIndex = data.page;
            this.pageSize = data.limit;
        });
    }

    onSortChange(sortState: Sort) {
        this._dataService.getData(0, this.pageSize, sortState.active, sortState.direction).subscribe(data => {
            this.dataSource = new MatTableDataSource<any>(data.movies);
            this.sort = sortState;
            this.length = data.total;
            this.pageIndex = data.page;
            this.pageSize = data.limit;
        });
    }

    onFilterChange(filterState: any) {
        console.log(filterState);
        let regexQuery: any = {} ;
        Object.keys(filterState).map(key => {
            regexQuery[key] = { '$regex' : filterState[key], '$options' : 'i'};
        });
        this._dataService.getData(0, this.pageSize, this.sort.active, this.sort.direction, regexQuery).subscribe(data => { 
            this.dataSource = new MatTableDataSource<any>(data.movies);
            this.length = data.total;
            this.pageIndex = data.page;
            this.pageSize = data.limit;
            this.filterState = filterState;
        });
    }
}
