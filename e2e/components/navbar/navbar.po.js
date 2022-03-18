/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

export class NavbarComponent {
    constructor() {
        this.navbar = element(by.css('.navbar'));
        this.navbarHeader = this.navbar.element(by.css('.navbar-header'));
        this.navbarNav = this.navbar.element(by.css('#navbar-main .nav.navbar-nav:not(.ml-auto)'));
        this.navbarAccount = this.navbar.element(by.css('#navbar-main .nav.navbar-nav.ml-auto'));
        this.navbarAccountGreeting = this.navbarAccount.element(by.css('.navbar-text'));
        this.loginButton = this.navbar.element(by.linkText('Login'));
        this.logoutButton = this.navbar.element(by.linkText('Log out'));
    }

    logout() {
        return this.logoutButton.click();
    }
}
