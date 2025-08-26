FROM directus/directus:latest

# (optional) hilft lokalen Tools, hat auf Render keine Wirkung
EXPOSE 8055

# Beim ersten Start DB initialisieren, dann Server starten
# Das offizielle Image hat already einen EntryPoint; wir überschreiben nur CMD.
CMD ["sh", "-c", "npx directus bootstrap && npx directus start"]
