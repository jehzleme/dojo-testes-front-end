# Dojo de testes front-end

Pré-requisitos:
- **.NET 6 SDK 6.0.203**
    - Como conferir a versão atualmente instalada: `dotnet --list-sdks`
    - Link para download: [https://dotnet.microsoft.com/en-us/download/dotnet/thank-you/sdk-6.0.203-windows-x64-installer](https://dotnet.microsoft.com/en-us/download/dotnet/thank-you/sdk-6.0.203-windows-x64-installer)
- **Nodejs versão 12+**
    - Como conferir a versão atualmente instalada: `node -v`
    - Tutorial para instalar multiplas versões do node com NVE: [https://dev.azure.com/AMBEV-SA/AMBEV-ATHENA/_wiki/wikis/AMBEV-ATHENA.wiki/10067/NVE-Execute-qualquer-comando-em-vers%C3%B5es-espec%C3%ADficas-do-Node.js](https://dev.azure.com/AMBEV-SA/AMBEV-ATHENA/_wiki/wikis/AMBEV-ATHENA.wiki/10067/NVE-Execute-qualquer-comando-em-vers%C3%B5es-espec%C3%ADficas-do-Node.js)
    - Utilitário para instalar múltiplas versões do node com NVM: [https://github.com/coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows)


## Como executar o projeto

**Back-end**
```shell
cd WebApi
dotnet run
```

Abrir no navegador a URL: http://localhost:8050
Deverá ser exibido uma documentação do Swagger.

**Front-end**
```shell
cd todo-app
npm install
npm start
```

Abrir no navegador a URL: http://localhost:4250
Deverá ser exibido uma interface web com 2 menus "Weather Forecast" e "Todo".