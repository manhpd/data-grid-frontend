import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	private baseUrl = 'http://localhost:8080/api/movies';

	constructor(private _http: HttpClient) {
	}

	getData(page: number = 0, pageSize: number = 5, sort: string = "", direction: string = "", regexQuery: any = {}): Observable<any> {
		return this._http.post(this.baseUrl, regexQuery, {
			params: {
				page: page.toString(),
				limit: pageSize.toString(),
				sort: sort,
				direction: direction
			}
		});
	}
}
