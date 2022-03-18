let config = browser.params;
import {MainPage} from './main.po';

describe('Main View', function() {
    let page;

    beforeEach(async done => {
        await browser.get(`${config.baseUrl}/`);
        page = new MainPage();
        done();
    });

    xit('should include header with correct title', async function() {
        expect(await page.pageHeader.getText())
            .to
            .equal('Lab 17 - Automated Testing');
    });
});
