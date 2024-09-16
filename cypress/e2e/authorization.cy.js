import * as data from '../helpers/default_data.json'
import * as main_page from '../locators/main_page.json'
import * as result_page from '../locators/result_page.json'
import * as recovery_page from '../locators/recovery_password_page.json'

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
          cy.visit('/');
          cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
            });
    afterEach('Конец теста', function () {
           cy.get(result_page.close).should('be.visible');
           });


    it('Верный пароль и верный логин', function () {
        cy.get(main_page.email).type(data.login);
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains(result_page.login_ok);
    })

    it('Проверка логики восстановления пароля', function () {
        cy.get(main_page.fogot_pass_btn).click();
        cy.get(recovery_page.email).type('pochta@pochta.ru');
        cy.get(recovery_page.send_button).click();
        cy.get(result_page.title).contains(result_page.recovery_pasword);
    })

    it('Верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login);
        cy.get(main_page.password).type('iLoveqastudio99');
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains(result_page.not_exist);
    }) 
    
    it('Неверный логин и верный пароль', function () {
        cy.get(main_page.email).type('german@dolnikov999.ru');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains(result_page.not_exist);
    }) 
    
    it('Логин без @ и верный пароль', function () {
        cy.get(main_page.email).type('german.dolnikov.ru');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains(result_page.validation_problem);
    }) 
    
    it('Приведение к строчным буквам в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains(result_page.not_exist);
    })

    
})
