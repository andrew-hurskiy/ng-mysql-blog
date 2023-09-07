import homePage from '../page_objects/home.po';
import loginPage from '../page_objects/login.po';

describe('Checking titles tests', () => {

    before(() => loginPage.loginWith('andriy', 'andriy'))

    it('Verify that title is ok', () => {

        homePage.title().invoke('text').should('eq', 'Blog with posts')

    })

    it('Verify that sub title is ok', () => {

        homePage.subTitle().invoke('text').should('eq', 'Powered by MySQL database')

    })


})