/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

import {OauthButtons} from '../../components/oauth-buttons/oauth-buttons.po';
import {browser} from 'protractor';

export class SignupPage {
    constructor() {
        this.form = element(by.css('.form'));
        let form = this.form;
        form.name = form.element(by.name('name'));
        form.email = form.element(by.name('email'));
        form.password = form.element(by.name('password'));
        form.confirmPassword = form.element(by.name('confirmPassword'));
        form.submit = form.element(by.css('.btn-register'));
        form.oauthButtons = (new OauthButtons()).oauthButtons;
    }

    async signup(data) {
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
