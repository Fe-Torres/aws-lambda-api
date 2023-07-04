# Ton API

Este é o repositório da Ton API, um software que fornece uma API para gerenciar websites e usuários. A API permite criar, atualizar, excluir e buscar informações sobre websites e usuários.

## Instalação

Para começar, você precisará ter o Node.js instalado em sua máquina. Em seguida, siga as etapas abaixo:

Faça o clone deste repositório para o seu ambiente local.
Abra um terminal na pasta raiz do projeto.
Execute o seguinte comando para instalar as dependências:

`npm install`

#### Configuração

Antes de rodar o servidor localmente, você precisará configurar duas variáveis de ambiente:

SA_USER_ID: O ID do usuário do serviço Simple Analytics.
SA_API_KEY: A chave de API do serviço Simple Analytics.
Certifique-se de fornecer os valores corretos para essas variáveis de ambiente antes de executar o servidor.

#### Scripts Disponíveis

No diretório do projeto, você pode executar os seguintes comandos:

`npm run dev`
Executa o servidor localmente em modo de desenvolvimento. O servidor estará acessível em http://localhost:3000.

`npm run format`
Formata o código-fonte do projeto usando o Prettier. Isso ajudará a manter um estilo de código consistente.

`npm run build`
Gera o pacote da aplicação pronta para implantação. O pacote será criado na pasta dist.

`npm test`
Executa os testes automatizados da aplicação.

Se você deseja contribuir para este projeto, sinta-se à vontade para abrir uma issue ou enviar um pull request. Seu feedback e contribuições são sempre bem-vindos!

### Requisições e Documentações

Você encontrará na pasta Docs arquivos para configurar seu software para realizar chamadas http
Para insominia use: insominiaTon.json ou HarTon.har
Para postman use: HarTon.har
