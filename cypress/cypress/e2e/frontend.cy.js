describe('Task Tracker Frontend', () => {
    it('loads the page and adds a task', () => {
      cy.visit('http://frontend') // using service name in Docker
  
      cy.get('input#title').type('Test Task')
      cy.get('button[type="submit"]').click()
  
      cy.get('ul#task-list li').should('contain', 'Test Task')
    })
  })
  