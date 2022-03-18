/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

import {OauthButtons} from '../../components/oauth-buttons/oauth-buttons.po';
import {browser} from 'protractor';

export class LoginPage {
    constructor() {
        this.form = element(by.css('.form'));
        const form = this.form;

        form.email = form.element(by.name('email'));
        form.password = form.element(by.name('password'));
        form.submit = form.element(by.css('.btn-login'));
        form.oauthButtons = (new OauthButtons()).oauthButtons;
    }

    async login(data) {
        const EC = protractor.ExpectedConditions;
        for(let prop in data) {
            let formElem = this.form[prop];
            if(data.hasOwnProperty(prop) && formElem && typeof formElem.sendKeys === 'function') {
                await browser.wait(EC.elementToBeClickable(formElem), 1000);
                await formElem.sendKeys(data[prop]);
            }
        }

        await browser.wait(EC.elementToBeClickable(this.form.submit), 1000);
        return this.form.submit.click();
    }
}
