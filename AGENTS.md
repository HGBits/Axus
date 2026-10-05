# Instruções para agentes

## Projeto

Axus é um bot TypeScript que espelha mensagens bidirecionalmente entre um canal Discord e um canal Fluxer.

A implementação atual é um serviço persistente baseado nos Gateways das duas plataformas. Não assumir que a arquitetura de jobs agendados já está implementada.

## Estrutura

- `src/`: código executável e adaptadores das plataformas.
- `docs/`: documentação da arquitetura.
- `package.json`: scripts e dependências.
- `.env.example`: variáveis de ambiente necessárias.
- `dist/`: saída compilada, não editar.
- `node_modules/`: dependências, não editar.

## Comandos

Instalar dependências:

```bash
npm install
```

Compilar:

```bash
npm run build
```

Executar o serviço:

```bash
npm start
```

Desenvolvimento:

```bash
npm run dev
```

Depois de alterações em TypeScript, executar pelo menos `npm run build`.

## Regras do projeto

- TypeScript em modo `strict`.
- Usar ESM e imports com extensão `.js` no código TypeScript.
- Não colocar tokens, credenciais ou valores de `.env` no código.
- Não assumir capacidades de Discord ou Fluxer que não estejam confirmadas pelo SDK ou pela documentação do projeto.
- Preservar a separação entre adaptadores de plataforma, modelo normalizado e bridge.
- Não adicionar dependências ou abstrações sem necessidade.
- Mudanças de comportamento devem ser acompanhadas da atualização da documentação relevante.

## Segurança

- Nunca registrar tokens.
- Menções em mensagens espelhadas devem permanecer controladas para evitar notificações involuntárias.
- Não enfraquecer a filtragem de mensagens de bots sem uma proteção equivalente contra loops.

## Validação

Antes de considerar uma alteração concluída:

1. executar `npm run build`;
2. verificar se a mudança respeita `docs/architecture.md`;
3. revisar se nenhuma credencial ou arquivo gerado foi incluído.

## Escopo

Instruções mais específicas em `src/AGENTS.md` e `docs/AGENTS.md` complementam este arquivo para seus respectivos diretórios. Instruções explícitas do usuário têm prioridade sobre este arquivo.
