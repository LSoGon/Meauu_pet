# 🐾 Pet Shop Theme - Tema Shopify para E-commerce Pet

Um tema moderno e responsivo para lojas de produtos pet, baseado no tema Dawn da Shopify.

![Shopify](https://img.shields.io/badge/Shopify-OS_2.0-7AB55C?style=for-the-badge&logo=shopify&logoColor=white)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

## 📋 Índice

- [Características](#-características)
- [Requisitos](#-requisitos)
- [Instalação](#-instalação)
- [Estrutura do Tema](#-estrutura-do-tema)
- [Configuração](#-configuração)
- [Personalização](#-personalização)
- [Categorias](#-categorias)
- [Desenvolvimento](#-desenvolvimento)
- [Suporte](#-suporte)

## ✨ Características

### 🎨 Design Personalizado
- **Header em 3 níveis**
- **Logo clicável** que redireciona para home
- **Barra de busca centralizada** com ícone integrado
- **Ícones funcionais**: Meus Pedidos, Sacola e Login/Cadastro
- **Linha separadora** com degradê elegante
- **Menu principal** com navegação intuitiva

### 🛠️ Tecnologias
- **Shopify Online Store 2.0** - Arquitetura moderna e flexível
- **Liquid** - Template engine nativo do Shopify
- **JavaScript ES6+** - Código moderno e performático
- **CSS Modular** - Estilos organizados por componente
- **Design Responsivo** - Adaptado para todos dispositivos

### 🚀 Funcionalidades
- ✅ Carrinho lateral (drawer) com atualização em tempo real
- ✅ Sistema de busca otimizado
- ✅ Navegação por categorias
- ✅ Suporte multilíngue (PT-BR incluído)
- ✅ Performance otimizada com lazy loading
- ✅ SEO friendly
- ✅ Acessibilidade (WCAG 2.1)

## 💻 Requisitos

- Conta Shopify ativa
- Plano que suporte temas personalizados
- Navegador moderno para administração

## 📦 Instalação

### Método 1: Upload via Admin

1. **Baixe o tema**
   ```bash
   git clone https://github.com/seu-usuario/pet-shop-theme.git
   ```

2. **Crie o arquivo ZIP**
   - Selecione todos os arquivos e pastas do tema
   - Comprima em um arquivo `.zip`

3. **Faça upload no Shopify**
   - Acesse: `Admin > Loja Virtual > Temas`
   - Clique em `Fazer upload do tema`
   - Selecione o arquivo ZIP
   - Aguarde o processamento

4. **Ative o tema**
   - Clique em `Personalizar` para configurar
   - Quando pronto, clique em `Publicar`

### Método 2: Shopify CLI (Desenvolvimento)

```bash
# Instale o Shopify CLI
npm install -g @shopify/cli

# Clone o repositório
git clone https://github.com/seu-usuario/pet-shop-theme.git
cd pet-shop-theme

# Conecte à sua loja
shopify theme dev --store=sua-loja.myshopify.com

# Para publicar
shopify theme push
```

## 📁 Estrutura do Tema

```
pet-shop-theme/
├── assets/              # CSS, JS e imagens
│   ├── base.css
│   ├── component-*.css
│   ├── global.js
│   └── *.js
├── config/              # Configurações do tema
│   └── settings_schema.json
├── layout/              # Layouts principais
│   └── theme.liquid
├── locales/             # Traduções
│   └── pt-BR.default.json
├── sections/            # Seções modulares
│   ├── header.liquid
│   ├── hero-banner.liquid
│   └── *.liquid
├── snippets/            # Componentes reutilizáveis
│   ├── icon-*.liquid
│   └── *.liquid
└── templates/           # Templates de páginas
    ├── index.json
    ├── product.json
    └── *.json
```

## ⚙️ Configuração

### 1. Configurações Iniciais

Após instalar, acesse o personalizador do tema:

1. **Logo e Identidade**
   - Upload do logo (recomendado: 300x100px)
   - Ajuste do tamanho do logo
   - Favicon

2. **Cores do Tema**
   ```css
   --color-primary: #FF6B6B;      /* Cor principal */
   --color-secondary: #4ECDC4;    /* Cor secundária */
   --color-text: #333333;         /* Cor do texto */
   ```

3. **Tipografia**
   - Fonte dos títulos
   - Fonte do corpo do texto
   - Tamanhos de fonte

### 2. Menu de Navegação

Configure o menu principal em `Admin > Navegação`:

```
Menu Principal
├── Cachorro
├── Gato
├── Novidades
├── Promoções
├── Favoritos
└── Mais
    ├── Brinquedos
    ├── Higiene
    └── Acessórios
```

### 3. Coleções

Crie as seguintes coleções no admin:

| Handle | Título |
|--------|--------|
| `/collections/cachorro` | Produtos para Cachorro |
| `/collections/gato` | Produtos para Gato |
| `/collections/brinquedos` | Brinquedos |
| `/collections/coleiras-guias-peitorais` | Coleiras, Guias e Peitorais |
| `/collections/beleza-higiene-limpeza` | Beleza, Higiene e Limpeza |
| `/collections/cama-almofada-cobertor` | Camas e Cobertores |
| `/collections/casa-toca` | Casas e Tocas |
| `/collections/recipientes-alimentacao` | Recipientes para Alimentação |
| `/collections/acessorios-transporte` | Acessórios para Transporte |
| `/collections/adestramento` | Adestramento |

## 🎨 Personalização

### CSS Customizado

Para adicionar estilos personalizados:

```css
/* assets/custom.css */
.sua-classe {
  /* seus estilos */
}
```

### JavaScript Customizado

```javascript
// assets/custom.js
document.addEventListener('DOMContentLoaded', () => {
  // Seu código aqui
});
```

### Criar Nova Seção

1. Crie o arquivo em `sections/minha-secao.liquid`:

```liquid
<section class="minha-secao">
  <h2>{{ section.settings.titulo }}</h2>
</section>

{% schema %}
{
  "name": "Minha Seção",
  "settings": [
    {
      "type": "text",
      "id": "titulo",
      "label": "Título"
    }
  ]
}
{% endschema %}
```

2. Adicione ao template desejado via editor

## 📂 Categorias

O tema está pré-configurado com as seguintes categorias:

### 🐕 Produtos para Cachorro
- Rações e Petiscos
- Brinquedos
- Higiene e Limpeza
- Acessórios

### 🐱 Produtos para Gato
- Rações e Petiscos
- Arranhadores
- Caixas de Areia
- Brinquedos

### 📦 Categorias Gerais
1. **Brinquedos** - Diversão para todos os pets
2. **Coleiras, Guias e Peitorais** - Segurança e estilo
3. **Beleza, Higiene e Limpeza** - Cuidados essenciais
4. **Cama, Almofada e Cobertor** - Conforto garantido
5. **Casa e Toca** - Abrigo aconchegante
6. **Recipientes para Alimentação** - Comedouros e bebedouros
7. **Acessórios para Transporte** - Caixas e bolsas
8. **Portão, Grade e Escada** - Segurança em casa
9. **Roupas de Verão e Inverno** - Moda pet
10. **Adestramento** - Educação e treinamento

## 🔧 Desenvolvimento

### Ambiente Local

```bash
# Instalar dependências
npm install

# Desenvolvimento com hot reload
shopify theme dev

# Build para produção
shopify theme push
```

### Estrutura de Código

#### Padrões de Código
- **BEM** para nomenclatura CSS
- **ES6+** para JavaScript
- **Liquid** best practices
- **Comentários** em português

#### Exemplo de Componente

```liquid
{% comment %}
  Componente: Card de Produto
  Uso: {% render 'product-card', product: product %}
{% endcomment %}

<article class="product-card">
  <a href="{{ product.url }}" class="product-card__link">
    <img src="{{ product.featured_image | img_url: '300x300' }}" 
         alt="{{ product.title }}"
         class="product-card__image">
    <h3 class="product-card__title">{{ product.title }}</h3>
    <p class="product-card__price">{{ product.price | money }}</p>
  </a>
</article>
```

### Performance

- **Lazy Loading**: Implementado em todas as imagens
- **Critical CSS**: Estilos críticos inline
- **Minificação**: Automática em produção
- **CDN**: Assets servidos via Shopify CDN

## 🐛 Troubleshooting

### Problema: Menu não aparece
**Solução**: Verifique se o menu está criado em `Admin > Navegação`

### Problema: Carrinho não abre
**Solução**: Certifique-se que o JavaScript está carregado:
```liquid
{{ 'global.js' | asset_url | script_tag }}
```

### Problema: Imagens não carregam
**Solução**: Use o filtro `img_url`:
```liquid
{{ image | img_url: '300x300' }}
```

## 📱 Suporte

### Documentação
- [Shopify Liquid](https://shopify.dev/docs/themes/liquid)
- [Theme Development](https://shopify.dev/docs/themes)
- [Shopify CLI](https://shopify.dev/docs/themes/tools/cli)

### Comunidade
- [Fórum Shopify](https://community.shopify.com)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/shopify)

### Contato
- **Email**: suporte@petshoptheme.com
- **GitHub Issues**: [Reportar bug](https://github.com/seu-usuario/pet-shop-theme/issues)

## 📄 Licença

Este tema está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- Equipe Shopify pelo tema Dawn
- Comunidade open source

---

Feito com ❤️ para amantes de pets 🐾
