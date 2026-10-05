# Instruções para `docs/`

## Responsabilidade

`docs/` contém documentação técnica do Axus.

## Fonte principal

`architecture.md` descreve o desenho atual do sistema e deve permanecer coerente com o código.

Ao alterar a arquitetura, atualizar a documentação correspondente na mesma mudança quando isso for relevante para quem mantém o projeto.

## Regras

- Documentar comportamento confirmado, não intenções como se já fossem implementação.
- Diferenciar claramente arquitetura atual, limitações e trabalho futuro.
- Não copiar grandes blocos de código-fonte para a documentação quando uma descrição for suficiente.
- Não registrar tokens, credenciais ou dados privados.
- Manter os nomes dos componentes e conceitos consistentes com o código, especialmente `Bridge`, adaptadores e `NormalizedMessage`.

Ao documentar uma futura arquitetura de jobs, não descrevê-la como atual até que exista implementação no repositório.
