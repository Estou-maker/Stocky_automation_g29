import { Given, When, Then,  } from 'cypress-cucumber-preprocessor/steps'


let createPostId = null;
const dateauj = new Date()
const ProductName = `Test Product automation ${dateauj}`
const Randomyear = 2020 + Math.floor(Math.random()*10)
const Randomprice = +(Math.random()* 2000 + 500).toFixed(2)
const Randomcpu = `Intel core i +${Math.floor(Math.random()*10)}`
const HardDisk = Math.floor(Math.random() * 10 + 1)


Given(`I have the api Endpoint {string}`, (arg0) => {
    // [Given] Sets up the initial state of the system.
    cy.log('Sending Post Request to the api endpoint')
});

When(`I send A POST request to the Api Endpoint it should be valid`, () => {
    // [When] Describes the action or event that triggers the scenario.
    
    
    cy.request('POST', 'https://api.restful-api.dev/objects', {

        headers: {
            'Content-Type' : 'application/json'
        },
        
            "name": ProductName,
        data:{
            "year": Randomyear,
            "price": Randomprice,
            "CPU model": Randomcpu,
            "Hard disk size":    `${HardDisk}`

        } 
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('name').and.to.contain(ProductName)
            expect(response.body).to.have.property('data').and.to.have.property('year', Randomyear)
            expect(response.body).to.have.property('data').and.to.have.property('price', Randomprice)
            expect(response.body).to.have.property('data').to.have.property('CPU model', Randomcpu)
            expect(response.body).to.have.property('data').to.have.property('Hard disk size', `${HardDisk}`)

            cy.log('Response.body:', JSON.stringify(response.body, null, 2))
            createPostId = response.body.id;
            cy.log(`Created Object ID: ${response.body.id}`)
        })

    })

    When(`I send A PUT request to the created object and it should be updated`, () =>{
        
        cy.request({
            method: "PUT",
            url: `https://api.restful-api.dev/objects/${createPostId}`,
            body: {
                name: "Auto test UPDATE",
                data:{
                    "year": Randomyear,
            "price": Randomprice,
            "CPU model": Randomcpu,
            "Hard disk size":    `${HardDisk}`,
            colour: "silver"

                }
            },
            headers:{
                'content-type' : 'application/json'
            }
        }).then((response)=> {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('name').and.to.contain("Auto test UPDATE")
            expect(response.body).to.have.property('data').and.to.have.property('year', Randomyear)
            expect(response.body).to.have.property('data').and.to.have.property('price', Randomprice)
            expect(response.body).to.have.property('data').to.have.property('CPU model', Randomcpu)
            expect(response.body).to.have.property('data').to.have.property('Hard disk size', `${HardDisk}`)
            expect(response.body).to.have.property('data').to.have.property('colour', "silver")
            expect(response.body).to.have.property('updatedAt')
        })
    })

    Then(`I delete the object using id from previous response`, ()=>{

        expect(createPostId).to.not.be.null;

        cy.request({

            method: 'DELETE',
            url: `https://api.restful-api.dev/objects/${createPostId}`,
        }).then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body.message).to.include(`Object with id = ${createPostId} has been deleted.`)
        })
    })
;