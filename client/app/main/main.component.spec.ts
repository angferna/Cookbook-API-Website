import {async, ComponentFixture, TestBed,} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {expect} from 'chai';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {FormsModule} from '@angular/forms';
import {RatingModule} from 'ngx-bootstrap/rating';
import {RouterTestingModule} from '@angular/router/testing';
import {DebugElement} from '@angular/core';
import * as sinon from 'sinon';

import {MainComponent} from './main.component';
import {SquarePipe} from '../../components/pipes/square.pipe';
import {UserService} from '../../components/services/user.service';


describe('Component: MainComponent', function () {
    let mockUsers = [
        {
            __v: undefined,
            _id: undefined,
            name: 'Test User',
            email: 'test@example.com',
            role: 'User'
        }
    ];
    let comp: MainComponent;
    let fixture: ComponentFixture<MainComponent>;
    let debugElement: DebugElement;
    let userService: UserService;

    let mockUserService = sinon.createStubInstance(UserService);
    mockUserService.getAllUsers.returns(Promise.resolve(mockUsers));

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                RatingModule,
                RouterTestingModule,
                TooltipModule.forRoot(),
                HttpClientTestingModule,
            ],
            declarations: [MainComponent, SquarePipe], // declare the test component
            providers: [{provide: UserService, useValue: mockUserService}]
        }).compileComponents();
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(MainComponent);
        // MainComponent test instance
        comp = fixture.componentInstance;

        debugElement = fixture.debugElement;

        userService = debugElement.injector.get(UserService);

        /**
         * Trigger initial data binding and run lifecycle hooks
         */
        fixture.detectChanges();
    }));

    it('should attach a list of users to the controller', () => {
        expect(userService.getAllUsers.should.have.been.called);
        expect(comp.users).to.equal(mockUsers);
    });
});
