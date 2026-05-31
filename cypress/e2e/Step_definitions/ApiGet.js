import { Given, When, Then,  } from 'cypress-cucumber-preprocessor/steps'



Given(`I send a GET request to the endpoint`, () => {
    // [Given] Sets up the initial state of the system.
    cy.log('Sending GET request to the endpoint')
});

Then(`I should receive a response with all details of the dog breeds`, () => {
    // [When] Describes the action or event that triggers the scenario.
    cy.request({
        method: 'GET',
        url: 'https://dogapi.dog/api/v2/breeds',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }

    }).then((response)=> {
        expect(response.status).to.eq(200)
        expect(response.body).to.not.be.empty
        expect(response.body).to.have.property('data')
        expect(response.body.data).to.be.an('array').and.have.length.greaterThan(0)
        expect(response.body).to.have.property('meta')
        expect(response.body.meta.pagination.current).to.eq(1)
        expect(response.body).to.have.property('links')
        expect(response.body.links.self).to.contain('/breeds')
        
        const names = response.body.data.map(b => b.attributes.name)
        const formattedNames = names.join(', ')
        //cy.log('Breeds list:\n' + formattedNames)


    // validation de la premiére réponse


        const first = response.body.data[0]
        expect(first).to.have.property('id')
        expect(first.type).to.eq('breed')
        expect(first.attributes).to.have.property('name', 'Affenpinscher')
        expect(first.attributes).to.have.property('description')
        expect(first.attributes.description).to.contain('The Affenpinscher is a small and playful breed of dog that was originally bred in Germany for hunting small game. They are intelligent, energetic, and affectionate, and make excellent companion dogs.')
        expect(first.attributes.life.min).to.eq(14)
        expect(first.attributes.life.max).to.eq(16)
        expect(first.attributes.male_weight.max).to.eq(5)
        expect(first.attributes.male_weight.min).to.eq(3)
        expect(first.attributes.female_weight.max).to.eq(5)
        expect(first.attributes.female_weight.min).to.eq(3)

        const csvnames = response.body.data.map(b => b.attributes.name.replace(/"/g, '""'))
        const csv = csvnames.map(n => `"$(n)"`).join(',')

        cy.writeFile('cypress/fixtures/dog-names.csv', csvnames.join('\n'))

})
});