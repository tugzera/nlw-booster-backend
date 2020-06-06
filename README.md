## Backend desenvolido durante o evento Next Level Weekend da Rocketseat.

Utilizamos TypeScript , juntamento com express e knex para o desenvolvimento desta aplicação.

## How to run ??

Execute os seguintes comandos:

## Crie o banco de dados sqlite segundo as migrations da aplicação.
yarn knex:migrate 

## Execute o seed para popular algumas tabelas que são obrigatórias.
yarn knex:seed

## Execute o servidor em modo de desenvolvimento.
yarn dev

