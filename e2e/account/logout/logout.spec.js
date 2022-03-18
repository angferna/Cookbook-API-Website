const config = browser.params;
import UserModel from '../../../server/api/users/users.model';
import {LoginPage} from '../login/login.po';
import {NavbarComponent} from '../../components/navbar/navbar.po';

describe('Logout View', function() {
    const login = async user => {
        await browser.get(`${config.baseUrl}/login`);

        const loginPage = new LoginPage();
        await loginPage.login(user);
    };

    const testUser = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'test'
    };

    let EC;
    beforeEach(async done => {
        await UserModel.remove();

        await UserModel.create(testUser);

        await login(testUser);

        EC = protractor.ExpectedConditions;

        done()
    });

    afterEach(async done => {
        await UserModel.remove();
        done();
    });

    describe('with local auth', function() {
        it('should logout a user and redirect to "/home"', async() => {
            await browser.wait(EC.urlContains(`${config.baseUrl}/home`), 5000, 'URL didn\'t change after 5s');

            expect((await browser.getCurrentUrl()))
                .to
                .equal(`${config.baseUrl}/home`);

            let navbar = new NavbarComponent();

            expect((await navbar.navbarAccountGreeting.getText()))
                .to
                .equal(`Hello ${testUser.name}`);

            await navbar.logout();

            await browser.wait(EC.urlContains(`${config.baseUrl}/home`), 5000, 'URL didn\'t change after 5s');

            expect((await browser.getCurrentUrl()))
                .to
                .equal(`${config.baseUrl}/home`);

            navbar = new NavbarComponent();

            expect((await navbar.navbarAccountGreeting.isDisplayed()))
                .to
                .equal(false);
        });
    });
});
