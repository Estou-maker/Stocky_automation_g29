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

        cy.readFile('cypress/fixtures/dog-names.csv').then(fileContent => {
            const lines = fileContent.split(/\r?\n/).map(l => l.trim()).filter(Boolean)
            expect(lines).to.have.length(names.length)
            expect(lines[0]).to.eq(names[0])
        
    
        const breeds = response.body.data.map(b => ({
            
            name: b.attributes.name,
            maxWeight: Math.max(b.attributes.male_weight?.max || 0, b.attributes.female_weight?.max || 0 )}


            

            
        ))
        // sort by name (A-Z)
        const sortedByName = [...breeds].sort((a, b) => a.name.localeCompare(b.name))

        // sort by max weight

        const sortedByWeight = [...breeds].sort((a, b) => b.maxWeight - a.maxWeight )

        cy.log('Breeds sorted by name (A-Z):\n' + sortedByName.map(b => `${b.name} ${b.maxWeight}kg`).join('\n'))

        cy.log('Breeds sorted by max weight:\n' +   sortedByWeight.map(b => `${b.name},${b.maxWeight}`).join('\n'))


        const header = 'Breed,Maxweight(kg)';
        const bynamesection = ['Sorted by Name', header, ...sortedByName.map(b => 
            `${b.name},${b.maxWeight}`)].join('\n')

        const byweightsection = ['Sorted by Weight', header, ...sortedByWeight.map(b => 
            `${b.name},${b.maxWeight}kg`)].join('\n')

        const combined = bynamesection + '\n\n' + byweightsection

        cy.writeFile('cypress/fixtures/dog-names-sorted.csv', combined)

    })

    })

})  