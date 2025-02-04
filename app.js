
//importando um servidor.
const express = require('express')

//iniciando um servidor.
const app = express()

//porta que o servidor ira rodar.
const port = 3000

app.get('/', (requisicao, resposta) => {
  resposta.send('Raiz do servidor!')
})
//rota hello
app.get('/hello', (requisicao, resposta) => {
    resposta.send('Hello World!')
  })
//Ouvindo a porta 3000 e exibindo uma mensagem no console
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost: ${port}`)
})