const { it } = require("node:test");

describe('Task Tracker Frontend', () => {
    it('loads the page and adds a task', () => {
      cy.visit('http://frontend');
  
      cy.get('input#title').type('Test Task');
      cy.get('button[type="submit"]').click();
      cy.get('#task-list li', { timeout: 10000 }).should('contain.text', 'Test Task');

    });
  });
  