import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'main',
    templateUrl: './main.html',
    styleUrls: ['./main.scss'],
})
export class MainComponent implements OnInit {

    public values: string[];
    public input: string;


    static parameters = [HttpClient];
    constructor(private http: HttpClient) {
        this.http = http;
        this.values = ['first', 'second', 'third'];
    }

    ngOnInit() {
    }

}
