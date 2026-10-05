# Axus

Bot de espelhamento bidirecional entre Discord e Fluxer.

## Estado

MVP funcional em arquitetura de adaptadores:

- Discord via `discord.js`
- Fluxer via `@fluxerjs/core`
- modelo interno normalizado
- espelhamento de texto e links de anexos
- proteção básica contra loop ignorando mensagens de bots
- mapeamento explícito de um canal Discord para um canal Fluxer

## Requisitos

- Node.js 22.13+
- uma aplicação/bot no Discord
- uma aplicação/bot no Fluxer

## Configuração

Copie `.env.example` para `.env` e preencha:

```env
DISCORD_TOKEN=
FLUXER_BOT_TOKEN=
DISCORD_CHANNEL_ID=
FLUXER_CHANNEL_ID=
```

No Discord, o bot precisa do intent privilegiado **Message Content Intent** habilitado no Developer Portal, além das permissões de visualizar o canal, ler histórico e enviar mensagens.

No Fluxer, adicione o bot ao guild e conceda a permissão de envio de mensagens no canal.

## Executar

```bash
npm install
npm run build
npm start
```

Durante desenvolvimento:

```bash
npm run dev
```

## Formato

Uma mensagem do Discord aparece no Fluxer como:

```text
**Nome do usuário** · Discord
mensagem
https://...
```

E vice-versa.

As menções são desabilitadas na mensagem espelhada para evitar que o bridge transforme uma simples mensagem em uma pequena máquina de notificações.

## Limitações atuais

- um único par de canais;
- mensagens novas apenas;
- edição e exclusão ainda não são espelhadas;
- anexos são encaminhados como URLs, não reenviados como arquivos;
- embeds, stickers, reactions, threads e replies ainda não possuem representação comum;
- não há persistência de IDs de mensagens.

Essas limitações são deliberadas para manter o núcleo pequeno antes de adicionar semântica específica de cada plataforma.
