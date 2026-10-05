# Instruções para `src/`

## Responsabilidade

`src/` contém o código executável do Axus.

A arquitetura atual separa:

- adaptadores Discord e Fluxer;
- `NormalizedMessage`, o modelo interno;
- `Bridge`, responsável por decidir o destino;
- configuração carregada de variáveis de ambiente;
- inicialização e encerramento do serviço.

## Arquivos principais

- `types.ts`: tipos compartilhados, especialmente `NormalizedMessage`.
- `config.ts`: leitura e validação da configuração.
- `discord.ts`: conexão, eventos e envio para Discord.
- `fluxer.ts`: conexão, eventos e envio para Fluxer.
- `bridge.ts`: roteamento entre plataformas.
- `index.ts`: composição e ciclo de vida do serviço.

## Regras

- Manter a lógica específica de cada plataforma no respectivo adaptador.
- Não colocar detalhes de Discord ou Fluxer em `types.ts` ou no núcleo do bridge.
- Mensagens recebidas devem ser normalizadas antes de atravessar o bridge.
- Mensagens de bots não devem gerar loops de espelhamento.
- IDs de canais devem continuar sendo controlados pela configuração.
- Não acessar `.env` diretamente em cada módulo; usar `config.ts`.
- Ao alterar o formato de `NormalizedMessage`, revisar todos os adaptadores e o bridge.

## Ciclo de vida

O serviço atual mantém conexões Gateway abertas. Não transformar `index.ts` em um job de execução única sem uma mudança arquitetural explícita.

Ao adicionar futuramente jobs agendados, mantê-los separados do caminho de Gateway em vez de misturar os dois ciclos de vida.
