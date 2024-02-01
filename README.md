# E-Commerce API (WIP)

Este é um projeto de estudos em andamento, uma API para um e-commerce simples. Até o momento, apenas a funcionalidade de cadastro de produtos foi implementada.

## Arquitetura de Software e Design Patterns

O projeto segue uma arquitetura modular inspirada nos princípios da Clean Architecture. A estrutura em camadas (domínio, aplicação e infraestrutura) permite uma separação clara de responsabilidades e facilita a manutenção.

### Estrutura do Projeto

O projeto segue uma arquitetura modular e práticas de Clean Architecture para garantir uma organização clara e manutenibilidade. Aqui está uma visão geral da estrutura:

```bash
src/
├── @types
│   ├── global.d.ts
│   └── http.d.ts
├── index.ts
├── infra
│   ├── database
│   │   └── memory
│   │       └── memory-database.ts
│   └── http
│       ├── express
│       │   └── express-http.server.adapter.ts
│       └── http.server.ts
├── modules
│   ├── auth
│   │   └── infra
│   └── products
│       ├── application
│       │   ├── create-product.usecase.test.ts
│       │   ├── create-product.usecase.ts
│       │   ├── find-by-id-product.usecase.test.ts
│       │   ├── find-by-id-product.usecase.ts
│       │   └── ...
│       ├── domain
│       │   ├── dtos
│       │   │   ├── create-product.dto.ts
│       │   │   ├── find-product.dto.ts
│       │   │   └── ...
│       │   ├── product.entity.test.ts
│       │   ├── product.entity.ts
│       │   ├── product.mapper.test.ts
│       │   ├── product.mapper.ts
│       │   └── product.repository.ts
│       └── infra
│           ├── controllers
│           │   ├── create-product.controller.ts
│           │   ├── find-many-product.controller.ts
│           │   ├── product.factory.ts
│           │   └── ...
│           └── database
│               └── memory-product.repository.ts
└── shared
    ├── errors
    │   ├── app.error.test.ts
    │   ├── app.error.ts
    │   ├── bad-request.error.ts
    │   └── ...
    ├── logger
    │   └── logger.ts
    ├── result
    │   ├── result.test.ts
    │   └── result.ts
    └── value-objects
        ├── id.test.ts
        ├── id.ts
        ├── name.test.ts
        ├── name.ts
        └── ...
```

### Design Patterns no Projeto

- <b>Result (Either):</b> Utilizado para lidar com operações que podem ter resultados de sucesso ou falha, evitando exceções.

- <b>SOLID:</b> O projeto adota os princípios SOLID, proporcionando uma base sólida para a construção e manutenção do código.

- <b>Error Handling:</b> Utiliza um padrão centralizado para tratamento de erros, promovendo consistência na manipulação de exceções.

- <b>Value Objects:</b> Utilizados para representar conceitos imutáveis, contribuindo para a modelagem rica de domínio.

- <b>Mappers:</b> Podem ser usados para facilitar a conversão entre DTOs e entidades de domínio, simplificando a transformação de dados.

- <b>Repositories:</b> Aplica o padrão Repository para isolar a lógica de acesso a dados, proporcionando uma abstração para operações de persistência.

- <b>Repositório In-Memory para Testes:</b> Usa um repositório em memória para testes, seguindo o padrão de Repositório e permitindo operações de dados durante testes sem depender de um banco de dados externo.

- <b>Adapters:</b> O padrão Adapter é empregado para ajustar interfaces e integrar componentes de maneira flexível, permitindo a adaptação de funcionalidades específicas sem comprometer a coesão do código.

- <b>Dependency Injection Factory:</b> Facilita a injeção de dependências ao criar instâncias de objetos complexos, promovendo modularidade e desacoplamento no sistema

<i>Alguns destes conceitos podem não terem sidos 100% utilizados neste projeto, as implementações parciais fica como possíveis melhorias futura de refatorações pontuais do código.</i>

## Possíveis Melhorias e Futuras Implementações

Embora o projeto seja apenas para fins educacionais, segue algumas possíveis futuras melhorias e implementações:

- <b>Testes Mais Abrangentes:</b>
  Expandir a cobertura de testes para garantir uma robustez ainda maior, abrangendo diferentes cenários e casos de uso.

- <b>Documentação Aprimorada:</b>
  Elaborar documentação mais detalhada, incluindo informações sobre endpoints da API, fluxos de dados e possíveis configurações.

- <b>Refatoração de Código:</b>
  Realizar refatorações pontuais para aprimorar a legibilidade, modularidade e manutenibilidade do código.

- <b>Gestão de Logs Aprimorada:</b>
  Implementar um sistema de log mais robusto para facilitar a detecção e resolução de problemas em ambientes de produção.

- <b>Módulo de Usuários:</b>
  Adicionar um módulo de gestão de usuários, com funcionalidades como registro, autenticação, e gerenciamento do perfil.

- <b>Módulo de pedidos:</b>
  Implementar um módulo para gerenciamento de pedidos, incluindo criação, atualização, e consulta de pedidos realizados pelos usuários.

- <b>Módulo de Carrinho de Compras:</b>
  Desenvolver um módulo para controle de carrinhos de compras, permitindo aos usuários adicionar/remover produtos antes de efetuar a compra.

- <b>Módulo de Pagamentos:</b>
  Implementar um módulo para processamento de pagamentos, integrando diferentes métodos de pagamento.

- <b>Eventos de Domínio:</b>
  Implementação de eventos de domínio para aprimorar a comunicação assíncrona entre diferentes partes do sistema. Isso pode melhorar a escalabilidade e a flexibilidade da arquitetura, permitindo que diferentes componentes reajam a eventos específicos sem acoplamento direto.

- <b>Separação em Microserviços:</b>
  Divisão da aplicação em microserviços independentes, cada um responsável por funcionalidades específicas. Uma abordagem sugerida seria organizar o código em um monorepo.

- <b>CI/CD:</b>
  Implementação de pipelines de CI/CD para garantir que as mudanças do código sejam automatizadas e testadas automaticamente.

- <b>Utilização de Serviços de Mensageria:</b>
  Integre serviços de mensageria para facilitar a comunicação entre microserviços. O uso de uma infraestrutura de mensageria, como RabbitMQ ou Kafka, pode melhorar a confiabilidade e a eficiência na troca de informações entre os diferentes componentes do sistema.

## Como Iniciar

Certifique-se de ter o Node.js instalado. Clone o repositório e execute os seguintes passos:

```bash
# Instale as dependências
yarn install

# Execute a aplicação em modo de desenvolvimento
yarn dev
```

## Testes

Para executar os testes, utilize o seguinte comando:

```bash
yarn test
```

## Build

Para executar o build e compilar o projeto, utilize o seguinte comando:

```bash
yarn build && yarn start
```

## Rotas

- Test: `OPTIONS /`

- Criar Produto: `POST /products`

- Buscar Produto por ID: `GET /products/:id`

- Buscar Múltiplos Produtos: `GET /products`

- Atualizar Produto por ID: `PATCH /products/:id`

## Lembre-se

<i>Este projeto é destinado apenas a fins educacionais.</i>
