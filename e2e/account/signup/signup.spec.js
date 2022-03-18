const config = browser.params;
import UserModel from '../../../server/api/users/users.model';
import {SignupPage} from './signup.po';
import {NavbarComponent} from '../../components/navbar/navbar.po';

describe('Signup View', function() {
    let page;
    let EC;

    const testUser = {
        name: 'Test',
        email: 'test@example.com',
        password: 'test1234',
        confirmPassword: 'test1234'
    };

    beforeEach(async done => {
        await browser.manage().deleteAllCookies();
        await browser.get(`${config.baseUrl}/signup`);
        page = new SignupPage();
        EC = protractor.ExpectedConditions;
        done();
    });

    after(async done => {
        await UserModel.remove();
        done();
    });

    it('should include signup form with correct inputs and submit button', async() => {
        expect(await page.form.name.getAttribute('type'))
            .to
            .equal('text');
        expect(await page.form.name.getAttribute('name'))
            .to
            .equal('name');
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
        expect(await page.form.confirmPassword.getAttribute('type'))
            .to
            .equal('password');
        expect(await page.form.confirmPassword.getAttribute('name'))
            .to
            .equal('confirmPassword');
        expect(await page.form.submit.getAttribute('type'))
            .to
            .equal('submit');
        expect(await page.form.submit.getText())
            .to
            .equal('Sign up');
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
        before(async() => {
            await UserModel.remove();
        });

        it('should signup a new user, log them in, and redirecting to "/"', async() => {
            await page.signup(testUser);

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
            it('should indicate signup failures', async() => {
                await page.signup(testUser);

                await browser.wait(EC.urlContains(`${config.baseUrl}/signup`), 5000, 'URL didn\'t change after 5s');

                expect((await browser.getCurrentUrl()))
                    .to
                    .equal(`${config.baseUrl}/signup`);

                let helpBlock = page.form.element(by.css('.form-group.has-error .help-block:not([hidden])'));
                expect((await helpBlock.getText()))
                    .to
                    .equal('This email address is already in use.');
            });
        });
    });
});
