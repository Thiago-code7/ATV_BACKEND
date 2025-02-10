
//importando um servidor.
const express = require('express');

const dotenv = require('dotenv');

dotenv.config()

//iniciando um servidor.
const app = express()
//Middleware(meio termo)
app.use(express.json());

//porta que o servidor ira rodar.
const port = process.env.PORTA
//nosso banco de dados
const produtos = []

app.get('/', (requisicao, resposta) => {
  try {
    if(produtos.length === 0){
      return resposta.status(200).json({msg:"Não ha produtos a serem exibidos!"})
    }
    resposta.status(200).json(produtos)
  } catch (error) {
    resposta.status(500).json({msg:"err ao buscar produtos!"})
  }
  
})
//rota hello
app.get('/hello', (requisicao, resposta) => {
    resposta.send('Hello World!')
  })

  app.post('/', (requisicao,resposta)=>{
    try {
      const {id, nome, preco, quantidade} = requisicao.body;
      const novoProduto = {id, nome, preco, quantidade}
      produtos.push(novoProduto)
      resposta.status(201).json(novoProduto)
    } catch (error) {
      resposta.status(500).json({msg:"Erro ao cadastrar produto!"})
    }
  }) 
  //Rota para editar o produto
  //http://localhost:3000/1
  app.put('/:id', (requisicao, resposta)=> {
    try {
      const { id } = requisicao.params;
    
      const produto = produtos.find(elemento => elemento.id === id)
      if(!produto){
        return resposta.status(400).json({msg: "produto não encontrado"})
      }
      const {novoNome, novoPreco, novaQuantidade } = requisicao.body;
      if(produto){
        produto.nome = novoNome
        produto.preco = novoPreco
        produto.quantidade = novaQuantidade
      }
      resposta.status(200).json(produto)
    } catch (error) {
      resposta.status(500).json({msg: "err ao atualizar produto"})
    }

  })
//Ouvindo a porta 3000 e exibindo uma mensagem no console
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})

