const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const md5 = require('md5')


const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Secret Box'
app.locals.secrets = [{
  id: "dirtySecret",
  message: 'I hate mash potatoes'
}]

app.get('/', (request, response) => {
  response.send('Its a secret to everyone')
})

app.get('/api/v1/secrets', (request, response) => {
  database('secrets').select()
          .then(function(secrets) {
            response.status(200).json(secrets);
          })
          .catch(function(error) {
            console.error('somethings wrong with db')
          });
})


app.post('/api/v1/secrets', (request, response) => {
  const { message, owner_id } = request.body
  const id = md5(message)

  const secret = { id, message, owner_id, created_at: new Date };
  database('secrets').insert(secret)
  .then(function() {
    database('secrets').select()
            .then(function(secrets) {
              response.status(200).json(secrets);
            })
            .catch(function(error) {
              console.error('somethings wrong with db')
            });
  })
})

app.get('/api/v1/secrets/:id', (request, response) => {
  const { id } = request.params
  const secret = app.locals.secrets.find((secret) => {
    return secret.id == id
  })

  if(!secret) { return response.sendStatus(404) }
  response.json(secret)
})

app.get('/api/v1/owners/:id', (request, response) => {
  database('secrets').where('owner_id', request.params.id).select()
          .then(function(secrets) {
            response.status(200).json(secrets);
          })
          .catch(function(error) {
            console.error('somethings wrong with redirect')
          });
})

app.put('/api/v1/secrets/:id', (request, response) => {
  const { id } = request.params
  const { message } = request.body

  let secret = app.locals.secrets.find((secret) => {
    return secret.id == id
  })

  secret.message = message

  if(!secret) { return response.sendStatus(404) }
  response.json(secret)
})

app.delete('/api/v1/secrets/:id', (request, response) => {
  const { id } = request.params

  app.locals.secrets = app.locals.secrets.filter((secret) => {
    return secret.id !== id
  })

  if(!secret) { return response.sendStatus(404) }
  response.json(app.locals.secrets)
})



app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})
