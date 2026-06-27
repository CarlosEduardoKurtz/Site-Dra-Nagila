# Site — Dra. Nágila Lessa

Site institucional (uma página) — **Estética Dental & Reabilitação Oral**, Criciúma/SC.
HTML, CSS e JavaScript puro, sem build. Pronto para publicar como site estático.

## Estrutura
```
index.html            → página principal
css/styles.css        → estilos
js/main.js            → interações (abertura, menu, comparador, galeria, lightbox)
assets/               → logos, fotos e imagens de antes/depois (otimizadas)
.nojekyll             → faz o GitHub Pages servir os arquivos como estão
```

## Publicar no GitHub Pages
1. Suba este repositório no GitHub (GitHub Desktop → **Publish repository**, marque como **público**).
2. No GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
3. Branch: **main** · pasta: **/ (root)** → **Save**.
4. Em ~1 min o site fica no ar em `https://<usuario>.github.io/<repositorio>/`.

## Domínio próprio (ex.: comprado na Hostinger)
1. Em **Settings → Pages → Custom domain**, digite o domínio (ex.: `www.dranagilalessa.com.br`) e salve
   (isso cria um arquivo `CNAME` no repositório).
2. No painel da **Hostinger → DNS / Zona DNS**, aponte para o GitHub Pages:
   - **CNAME** · nome `www` · valor `<usuario>.github.io`
   - **A** · nome `@` · valores: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. De volta no GitHub Pages, marque **Enforce HTTPS** (após o DNS propagar).

## Configuração rápida
- **WhatsApp/telefone:** `js/main.js`, linha 11 (`WHATSAPP_NUMBER`). Atual: (48) 99907-9613.
- **Instagram / endereço / horário / textos:** direto no `index.html`.
