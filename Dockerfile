FROM directus/directus:latest

# Copy any custom extensions or configurations if needed
# COPY ./extensions /directus/extensions

# The base image already sets up everything we need
# Environment variables will be provided by Render

EXPOSE 8055

# Use the default command from the base image
CMD ["npx", "directus", "start"]