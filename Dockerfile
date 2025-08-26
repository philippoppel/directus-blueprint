# ./Dockerfile
FROM directus/directus:latest
ENV NODE_ENV=production

# Wichtig: Shell-Form, damit zur Laufzeit $RENDER_EXTERNAL_URL verfügbar ist.
CMD ["sh","-lc","PUBLIC_URL=\"$RENDER_EXTERNAL_URL\" npx directus bootstrap && PUBLIC_URL=\"$RENDER_EXTERNAL_URL\" npx directus start"]
