## Sobre

- Base shopify configurada para suportar SASS e Typscripts. 

- Documentação do Shopify CLI: https://shopify.dev/docs/themes/tools/cli/install

## Requistos

- Node v16 - ou superior
- Ruby+Devkit 3.0
- Bundler (ver documentação da cli shopify)
- Shopify CLI
- Gulp CLI

## Modo de usar

Instalar as dependecias, recomendo o npm ou pnpm.

-- 

Use 2 terminais, um para o Gulp e outro para o shopify

Em um terminal rodar "gulp" - se for a primeira vez rodando o projeto, ele vai compilar todos os arquivos da pasta src e em seguida ativar o watch.

No segundo terminal "shopify theme dev"

Ele vai pedir para logar na shopify e escolher uma loja.

Após escolher a loja ele vai dar os links de preview, ex:

[1] http://127.0.0.1:9292

[2] https://my-store-theme.myshopify.com/admin/themes/
{id}/editor

[3] https://my-store-theme.myshopify.com/?preview_them
e_id={id}


## Deploy

Para subir o tema é preciso rodar "shopify theme push" 
Para publicar o tema (apenas em produção) "shopify theme publis"

