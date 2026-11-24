# Harmonia Instrumentos Musicais — Acessibilidade e Responsividade Web

Projeto desenvolvido para a disciplina de **Acessibilidade** (Fatec), evoluindo a loja fictícia **Harmonia Instrumentos Musicais** desde a correção estrutural e semântica de HTML até recursos modernos de acessibilidade, tema escuro, preferência de movimento reduzido, formulário acessível com validação JavaScript, componentização e layout responsivo **Desktop-First** para desktop, tablet e celular.

---

## Links de Entrega

- **GitHub Pages (site publicado):** <https://viniciusfaria-png.github.io/acessibilidade-unidade3-atividade/>
- **Repositório GitHub (`main`):** <https://github.com/ViniciusFaria-png/acessibilidade-unidade3-atividade>

---

## Estrutura do Projeto

```text
acessibilidade-unidade3-atividade/
├── .github/
│   ├── PULL_REQUEST_TEMPLATE.md
│   ├── scripts/
│   │   └── verificar-acessibilidade.mjs
│   └── workflows/
│       └── acessibilidade.yml
├── pages/
│   └── contato.html             # Página de cadastro de cliente e contato acessível
├── scripts/
│   ├── carousel.js              # Controle e indicador de slides do carrossel
│   ├── form.js                  # Validação acessível e resumo de erros do formulário
│   ├── menu.js                  # Controle acessível do menu hambúrguer mobile
│   └── theme.js                 # Alternância de tema claro/escuro com localStorage
├── styles/
│   ├── style.css                # Estilos base (Desktop > 1024px), temas e componentes
│   └── responsive.css           # Adaptações responsivas Desktop-First (Tablet e Mobile)
├── .gitignore
├── .htmlvalidate.json
├── .nojekyll
├── CHECKLIST.md                 # Checklist original dos 7 blocos de semântica
├── GUIA-GIT-E-PAGES.md          # Guia de referência de Git e GitHub Pages
├── index.html                   # Página principal da loja
└── README.md                    # Documentação completa das implementações
```

---

## Organização em Branches e Implementações Realizadas

Cada funcionalidade e melhoria do projeto foi desenvolvida em uma branch isolada e integrada à `main` via Pull Request:

| Ordem | Branch | Foco da Implementação |
| :---: | :--- | :--- |
| 1 | `correcao` | Correção semântica do HTML seguindo os 7 blocos do [`CHECKLIST.md`](CHECKLIST.md) |
| 2 | `lab-skip-link` | Implementação do link de salto (`skip-link`) acessível por teclado |
| 3 | `lab-prefers-color-scheme` | Suporte automático ao tema escuro do sistema e botão de alternância manual |
| 4 | `lab-prefers-reduced-motion` | Animações, carrossel e suporte a `@media (prefers-reduced-motion: reduce)` |
| 5 | `lab-formulario-acessivel` | Formulário completo de cadastro com validação acessível em JavaScript |
| 6 | `lab-componentizacao` | Organização de diretórios e separação de CSS e JavaScript em módulos |
| 7 | `lab-responsividade` | Layout responsivo Desktop-First, menu mobile acessível, correções ARIA/HTML e este `README.md` |

---

### 1. Correções de HTML Semântico (`correcao`)

Aplicação dos 7 blocos do checklist de acessibilidade em `index.html`:

- **Apresentação vs. semântica:** substituição de tags puramente visuais (`<b>`, `<i>`, `<font>`) por tags semânticas (`<strong>`, `<em>`) e remoção de marcações obsoletas.
- **Hierarquia de cabeçalhos:** definição de apenas um `<h1>` principal e organização sequencial de `<h2>`, `<h3>` e `<h4>` sem pular níveis.
- **Landmarks e idioma:** declaração de `lang="pt-BR"` no `<html>` e uso de `<header>`, `<nav aria-label="...">`, `<main>`, `<aside>` e `<footer>`.
- **Tabelas:** remoção de tabela usada para layout (substituída por Flexbox em `#miolo`) e estruturação da tabela comparativa com `<caption>`, `<thead>`, `<tbody>`, `<th scope="col">` e `<th scope="row">`.
- **Links e botões:** textos de link descritivos com contexto isolado, aviso explícito `(abre em nova aba)` em links `target="_blank"`, `aria-label="Ver carrinho de compras"` no ícone do carrinho e conversão de `<div>` clicável em `<button type="button">`.
- **Listas:** conversão do menu principal (`<ul>`), trilha de navegação (`<ol>` com `aria-current="page"`), lista de produtos, categorias e links laterais em listas semânticas reais.

### 2. Skip Link (`lab-skip-link`)

- Adição do link `<a href="#conteudo" class="skip-link">Pular para o conteúdo principal</a>` como primeiro elemento focável da página (presente em `index.html` e `pages/contato.html`).
- Ocultado visualmente fora da tela por padrão (`left: -9999px`) e exibido com destaque (`outline: 3px solid #ffbf47`, borda e sombra de alto contraste) quando recebe foco pelo teclado (`Tab`).
- Alvo `<main id="conteudo" tabindex="-1">` para garantir o deslocamento real do foco ao conteúdo principal em navegadores e leitores de tela.

### 3. Modo Escuro e Preferência de Esquema de Cores (`lab-prefers-color-scheme`)

- Tokens CSS (`--bg-page`, `--bg-wrap`, `--bg-topo`, `--text-main`, `--text-link`, `--erro-color`, etc.) definidos em `:root` para o tema claro e sobrescritos automaticamente por `@media (prefers-color-scheme: dark)` quando o usuário não escolheu manualmente outro tema.
- Suporte a `[data-theme="dark"]` e `[data-theme="light"]` controlados pelo botão `#btn-tema` em [`scripts/theme.js`](scripts/theme.js), com persistência em `localStorage` (`tema-preferido`), atualização automática do rótulo do botão (`Modo escuro` / `Modo claro`) e escuta de alterações em tempo real do sistema operacional.
- Contraste de texto e componentes planejado para atender aos níveis WCAG AA em ambos os temas.

### 4. Animações e Movimento Reduzido (`lab-prefers-reduced-motion`)

- Inclusão do banner promocional `.banner-destaque` com animação de entrada (`@keyframes fadeIn`), efeito de hover nos cartões de produto (`.cartao:hover`) e carrossel de destaques (`.carrossel-trilho` com transição suave).
- Implementação de `@media (prefers-reduced-motion: reduce)` em [`styles/style.css`](styles/style.css) e [`styles/responsive.css`](styles/responsive.css) removendo animações, escalas em hover e transições de movimento para usuários sensíveis a movimento vestibular.

### 5. Formulário de Cadastro Acessível (`lab-formulario-acessivel`)

Página dedicada em [`pages/contato.html`](pages/contato.html) com validação em [`scripts/form.js`](scripts/form.js):

- Agrupamento lógico em `<fieldset>` e `<legend>` (*Dados pessoais*, *Segurança de acesso*, *Gênero*, *Interesses musicais* e *Origem e termos de uso*).
- Todos os campos possuem `<label>` associado por `for`/`id`, instruções via `aria-describedby` e indicação visual e programática de obrigatoriedade (`<span class="obrigatorio" aria-hidden="true">*</span><span class="sr-only"> (obrigatório)</span>` + `required` / `aria-required="true"`).
- Validação em JavaScript para nome completo, e-mail, CPF (incluindo cálculo dos dígitos verificadores), data de nascimento, telefone opcional, senha forte, confirmação de senha, grupos de rádio/checkbox e aceite dos termos, além de campo honeypot anti-spam oculto (`.honeypot`).
- **Resumo de erros no topo** (`#resumo-erros` com `role="alert"` e `tabindex="-1"`): exibe a contagem de erros, recebe foco automático ao falhar o envio e fornece links âncora que levam o foco diretamente a cada campo inválido.
- **Feedback individual e sucesso:** mensagens claras em `#erro-*`, atualização de `aria-invalid="true"` / `aria-describedby` e região `role="status"` (`aria-live="polite"`) para confirmação de envio.

### 6. Componentização e Organização (`lab-componentizacao`)

- Separação do CSS inline para [`styles/style.css`](styles/style.css) e dos scripts inline para arquivos dedicados em `scripts/` (`theme.js`, `carousel.js`, `form.js`).
- Organização da página de contato e cadastro em [`pages/contato.html`](pages/contato.html) com links de navegação atualizados entre a raiz e `pages/`.

### 7. Responsividade Desktop-First e Ajustes de Acessibilidade (`lab-responsividade`)

- **CSS responsivo Desktop-First** em [`styles/responsive.css`](styles/responsive.css), mantendo o layout desktop original intacto e adaptando progressivamente para tablet e celular.
- **Menu mobile acessível** em [`scripts/menu.js`](scripts/menu.js): botão `#btn-menu` com `aria-expanded`, `aria-controls="lista-menu"`, ícone animado que respeita `prefers-reduced-motion`, fechamento com a tecla `Escape` devolvendo o foco ao botão e restauração automática ao redimensionar acima de `600px` (com progressive enhancement via classe `.menu-js`).
- **Tabela e carrossel responsivos:** tabela comparativa encapsulada em `<section class="tabela-responsiva" aria-labelledby="titulo-comparativo" tabindex="0">` para rolagem horizontal acessível sem estourar o viewport; indicador dinâmico `1 / 3` (`aria-live="polite"`) no carrossel.
- **Correções de HTML e ARIA:**
  - Conversão do banner promocional e do carrossel para `<section>` nativo, dos slides para `role="group"` e dos títulos dos slides para `<h3>`, eliminando erros de validação HTML e de ordem de cabeçalhos.
  - Adição de `aria-label` descritivo mantendo o texto visível nos botões `Adicionar ao carrinho` dos produtos (`Stratocaster HSS` e `Les Paul Standard`).
  - Correção de caminhos relativos dos links dentro de [`pages/contato.html`](pages/contato.html) (`../termos.html`, `../privacidade.html`, `../afinacao.html`, `../manutencao.html`, `../blog.html`).

---

## Estratégia de Responsividade (Desktop-First)

O estilo base em [`styles/style.css`](styles/style.css) atende ao **Desktop (> 1024px)** com container centralizado (`max-width: 1040px`) e layout em duas colunas (`<main>` + `<aside class="lateral">`). A folha [`styles/responsive.css`](styles/responsive.css) desce progressivamente pelos seguintes breakpoints:

| Breakpoint | Faixa / Dispositivo | Principais Adaptações |
| :--- | :--- | :--- |
| **Desktop** | `> 1024px` (base) | Layout em duas colunas (`#miolo` com `aside` lateral de 250px), menu horizontal e container de até `1040px`. |
| **Tablet paisagem** | `@media (max-width: 1024px)` | Container fluido (`max-width: 100%`), redução gradual de paddings e barra lateral ajustada para `220px`. |
| **Tablet retrato** | `@media (max-width: 860px)` | `#miolo` empilhado em coluna única (`#conteudo` + `.lateral` em 100%) e `.lista-produtos` em grid de 2 colunas. |
| **Celular / Mobile** | `@media (max-width: 600px)` | Cabeçalho empilhado, menu hambúrguer acessível (`#btn-menu`), cards em 1 coluna, botões `width: 100%` com altura mínima de toque (`>= 44px`), tabela com rolagem horizontal, inputs com `font-size: 16px` (evita zoom automático no iOS) e links do rodapé/breadcrumb alinhados com área de toque ampliada. |
| **Celulares compactos** | `@media (max-width: 380px)` | Título ajustado e controles do carrossel reorganizados com botões dividindo a largura total. |

---

## Validação de Acessibilidade e Testes

### Chrome Lighthouse (Desktop e Mobile)

Auditorias executadas com Google Chrome headless (`--only-categories=accessibility,best-practices`) sobre servidor HTTP local após todas as alterações:

| Página | Perfil | Acessibilidade | Boas Práticas |
| :--- | :--- | :---: | :---: |
| `index.html` | Mobile | **100 / 100** | 96 / 100 |
| `index.html` | Desktop | **100 / 100** | 96 / 100 |
| `pages/contato.html` | Mobile | **100 / 100** | 96 / 100 |
| `pages/contato.html` | Desktop | **100 / 100** | 96 / 100 |

### Validação de HTML e Layout

- **`html-validate@8`:** `index.html` e `pages/contato.html` validados com **0 erros e 0 avisos**.
- **Overflow horizontal:** verificado em `1280px`, `1024px`, `860px`, `768px`, `600px`, `375px` e `360px` em ambas as páginas com `scrollWidth <= innerWidth` (zero rolagem horizontal indevida).
- **Fluxos interativos validados:** abertura/fechamento do menu mobile com `Escape` e retorno do foco, alternância de tema claro/escuro, navegação do carrossel com atualização do indicador e validação com resumo de erros no formulário.

### Como testar localmente

1. Valide o HTML com a mesma ferramenta do workflow de CI:
   ```bash
   npx --yes html-validate@8 index.html pages/contato.html
   ```
2. Sirva o projeto localmente via HTTP (por exemplo, `npx serve .` ou extensão Live Server) e execute a aba **Lighthouse** no Chrome DevTools marcando a categoria **Accessibility** nos modos **Mobile** e **Desktop** tanto na página inicial (`index.html`) quanto em `pages/contato.html`.
