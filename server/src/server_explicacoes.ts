// .ts >> typescript
// http://localhost:3333/users >> rota 
// '/users' >> recurso, entidade que estamos acessando

import express, { response, request } from 'express';

const app = express();

app.use(express.json()) //colocar o plugin p express entender o json

// GET: Buscar info
// POST: criar info
// PUT: att info
// DELETE: delete info


const users = [
    'Rhonaz',
    'Seavie',
    'Salire',
    'azarr'

]

// request  > obter dados da requisicao
// response > devolver dados
// http://localhost:3333/users
app.get('/users', (request, response) => {
    console.log('Lista users.')

    response.json(users)
});

/*-------------------------
Request param >> pela rota (url)
----------------------------
 http://localhost:3333/users/5*/ 

app.get('/users/:id', (request, response) => {
    const id = Number(request.params.id)
    return response.json(users[id])
});

/*---------------
  Query Param
 --------------
 // http://localhost:3333/users?search=az*/

 app.get('/users/:id', (request, response) => {
    const search = String(request.query.search)

    const filteredUsers = search ? users.filter( u => u.includes(search)) : users;

    return response.json(filteredUsers)
});


/** -------------
 *  Request Body (POST)
 * --------------
 
  mandar  via JSON \/
{
    "name": "joao",
    "email": "rnz@plgr.com"
}
*/

app.post('/users', (request, response) => {
    const data = request.body

    const user = {
        nome: data.nome,
        email: data.email
    };
    return response.json(user)
})

app.listen(3333)

