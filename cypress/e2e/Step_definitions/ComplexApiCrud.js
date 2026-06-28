import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

let createdObjectId = null
let createdPayload = null
let updatedPayload = null

Given('I prepare a complex API payload for a product object', () => {
  const timestamp = new Date().toISOString()

  createdPayload = {
    name: `Complex API Product ${timestamp}`,
    data: {
      category: 'Automation',
      status: 'active',
      warrantyYears: 2,
      details: {
        brand: 'Cypress',
        model: 'Cucumber',
        colors: ['black', 'silver'],
        dimensions: {
          length: 12,
          width: 8,
          height: 4,
        },
      },
      tags: ['api', 'e2e', 'smoke'],
    },
  }

  cy.log(`Prepared payload: ${JSON.stringify(createdPayload, null, 2)}`)
})

When('I send a POST request with nested data and headers to create the object', () => {
  cy.request({
    method: 'POST',
    url: 'https://api.restful-api.dev/objects',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: createdPayload,
  }).then((response) => {
    expect(response.status).to.eq(200)
    expect(response.body).to.have.property('id').that.is.a('string').and.not.empty
    expect(response.body).to.have.property('name', createdPayload.name)
    expect(response.body.data).to.have.property('category', 'Automation')
    expect(response.body.data).to.have.property('status', 'active')
    expect(response.body.data).to.have.property('warrantyYears', 2)
    expect(response.body.data.details).to.have.property('brand', 'Cypress')
    expect(response.body.data.details).to.have.property('model', 'Cucumber')
    expect(response.body.data.details.colors).to.deep.equal(['black', 'silver'])
    expect(response.body.data.details.dimensions).to.deep.equal({
      length: 12,
      width: 8,
      height: 4,
    })
    expect(response.body.data.tags).to.deep.equal(['api', 'e2e', 'smoke'])

    createdObjectId = response.body.id
    cy.log(`Created object id: ${createdObjectId}`)
  })
})

Then('the create response should contain the expected object details', () => {
  expect(createdObjectId, 'created object id should be available').to.not.be.null

  cy.request({
    method: 'GET',
    url: `https://api.restful-api.dev/objects/${createdObjectId}`,
    headers: {
      Accept: 'application/json',
    },
  }).then((response) => {
    expect(response.status).to.eq(200)
    expect(response.body).to.have.property('id', createdObjectId)
    expect(response.body).to.have.property('name', createdPayload.name)
    expect(response.body.data).to.have.property('category', 'Automation')
    expect(response.body.data.details.colors).to.deep.equal(['black', 'silver'])
  })
})

When('I send a PUT request to update the created object with new values', () => {
  updatedPayload = {
    name: `${createdPayload.name} - Updated`,
    data: {
      category: 'Automation',
      status: 'inactive',
      warrantyYears: 3,
      details: {
        brand: 'Cypress',
        model: 'Cucumber Pro',
        colors: ['gold', 'black'],
        dimensions: {
          length: 15,
          width: 9,
          height: 5,
        },
      },
      tags: ['api', 'e2e', 'updated'],
    },
  }

  cy.request({
    method: 'PUT',
    url: `https://api.restful-api.dev/objects/${createdObjectId}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: updatedPayload,
  }).then((response) => {
    expect(response.status).to.eq(200)
    expect(response.body).to.have.property('id', createdObjectId)
    expect(response.body).to.have.property('name', updatedPayload.name)
    expect(response.body.data).to.have.property('status', 'inactive')
    expect(response.body.data).to.have.property('warrantyYears', 3)
    expect(response.body.data.details).to.have.property('model', 'Cucumber Pro')
    expect(response.body.data.details.colors).to.deep.equal(['gold', 'black'])
    expect(response.body.data.details.dimensions).to.deep.equal({
      length: 15,
      width: 9,
      height: 5,
    })
    expect(response.body).to.have.property('updatedAt')
  })
})

Then('the update response should reflect the modified values and metadata', () => {
  cy.request({
    method: 'GET',
    url: `https://api.restful-api.dev/objects/${createdObjectId}`,
    headers: {
      Accept: 'application/json',
    },
  }).then((response) => {
    expect(response.status).to.eq(200)
    expect(response.body).to.have.property('name', updatedPayload.name)
    expect(response.body.data).to.have.property('status', 'inactive')
    expect(response.body.data).to.have.property('warrantyYears', 3)
    expect(response.body.data.tags).to.deep.equal(['api', 'e2e', 'updated'])
  })
})

When('I send a DELETE request for the created object', () => {
  cy.request({
    method: 'DELETE',
    url: `https://api.restful-api.dev/objects/${createdObjectId}`,
    headers: {
      Accept: 'application/json',
    },
  }).then((response) => {
    expect(response.status).to.eq(200)
    expect(response.body).to.have.property('message').that.contains(`Object with id = ${createdObjectId} has been deleted.`)
  })
})

Then('the delete response should confirm the object was removed', () => {
  cy.request({
    method: 'GET',
    url: `https://api.restful-api.dev/objects/${createdObjectId}`,
    failOnStatusCode: false,
    headers: {
      Accept: 'application/json',
    },
  }).then((response) => {
    expect(response.status).to.eq(404)
    expect(response.body).to.have.property('error').that.contains('was not found')
  })
})
