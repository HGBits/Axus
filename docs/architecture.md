# Arquitetura

## Objetivo

O Axus faz espelhamento bidirecional de mensagens entre Discord e Fluxer.

## Princípios

- Eventos recebidos de cada plataforma são normalizados para um modelo interno.
- O modelo interno é convertido para o formato da plataforma de destino.
- Cada mensagem espelhada recebe um identificador de origem e destino para impedir loops.
- Configuração de canais pareados fica separada da lógica dos adaptadores.
- Tokens e segredos nunca entram no código-fonte.

## Fluxo

Discord Gateway -> Discord adapter -> Normalized Message -> Bridge -> Fluxer adapter -> Fluxer API/Gateway

Fluxer Gateway -> Fluxer adapter -> Normalized Message -> Bridge -> Discord adapter -> Discord API

## Primeira versão

1. Mensagens de texto.
2. Autor e horário.
3. Edição e exclusão, quando suportadas pelos dois lados.
4. Anexos como links.
5. Proteção contra loops.
6. Mapeamento explícito de canais.

Recursos específicos de cada plataforma ficam fora do núcleo até haver uma representação comum bem definida.
