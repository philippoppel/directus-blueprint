FROM directus/directus:latest

# Set working directory
WORKDIR /directus

# Expose port 8055
EXPOSE 8055

# Initialize database and start directus
CMD ["sh", "-c", "node_modules/.bin/directus bootstrap && node_modules/.bin/directus start"]