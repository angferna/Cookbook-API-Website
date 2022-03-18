const config = browser.params;
import UserModel from '../../../server/api/users/users.model';
import {LoginPage} from './login.po';
import {NavbarComponent} from '../../components/navbar/navbar.po';

describe('Login View', function() {
    let page;
    let EC;
    beforeEach(async done => {
        await browser.get(`${config.baseUrl}/login`);
        page = new LoginPage();
        EC = protractor.ExpectedConditions;
        done();
    });

    it('should include login form with correct inputs and submit button', async() => {
        expect(await page.form.email.getAttribute('type'))
            .to
            .equal('email');
        expect(await page.form.email.getAttribute('name'))
            .to
            .equal('email');
        expect(await page.form.password.getAttribute('type'))
            .to
            .equal('password');
        expect(await page.form.password.getAttribute('name'))
            .to
            .equal('password');
        expect(await page.form.submit.getAttribute('type'))
            .to
            .equal('submit');
        expect(await page.form.submit.getText())
            .to
            .equal('Login');
    });

    it('should include oauth buttons with correct classes applied', async() => {
        expect(await page.form.oauthButtons.facebook.isPresent())
            .to
            .equal(true);
        expect(await page.form.oauthButtons.google.isPresent())
            .to
            .equal(true);
        expect(await page.form.oauthButtons.twitter.isPresent())
            .to
            .equal(true);
    });

    describe('with local auth', function() {
        const testUser = {
            name: 'Test User',
            email: 'test@example.com',
            password: 'test'
        };

        before(async done => {
            await UserModel.remove();
            await UserModel.create(testUser);
            done();
        });

        after(async done => {
            await UserModel.remove();
            done();
        });

        it('should login a user and redirect to "/home"', async() => {
            await page.login(testUser);

            await browser.wait(EC.urlContains(`${config.baseUrl}/home`), 5000, 'URL didn\'t change after 5s');

            expect((await browser.getCurrentUrl()))
                .to
                .equal(`${config.baseUrl}/home`);

            let navbar = new NavbarComponent();
            expect((await navbar.navbarAccountGreeting.getText()))
                .to
                .equal(`Hello ${testUser.name}`);
        });


        describe('and invalid credentials', function() {
            it('should indicate login failures', async() => {
                await page.login({
                    name: testUser.name,
                    email: testUser.email,
                    password: 'badPassword'
                });

                let helpBlock = page.form.element(by.css('.form-group.has-error .help-block:not([hidden])'));

                await browser.wait(EC.textToBePresentInElement(helpBlock, 'This password is not correct.'), 5000, 'Couldn\'t find help text after 5s');

                expect((await browser.getCurrentUrl()))
                    .to
                    .equal(`${config.baseUrl}/login`);

                expect((await helpBlock.getText()))
                    .to
                    .equal('This password is not correct.');

            });
        });
    });
});
