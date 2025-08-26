FROM directus/directus:latest

# Set working directory
WORKDIR /directus

# Expose port 8055
EXPOSE 8055

# Initialize database and start directus
CMD ["sh", "-c", "npx directus bootstrap && npx directus start"]