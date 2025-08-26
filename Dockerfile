FROM directus/directus:latest

# Expose port 8055
EXPOSE 8055

# Use the original entrypoint but with bootstrap
CMD ["sh", "-c", "directus bootstrap && directus start"]