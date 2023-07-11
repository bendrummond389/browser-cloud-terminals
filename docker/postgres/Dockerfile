FROM postgres:13

# Set environment variables
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=topsecret
ENV POSTGRES_DB=postgres
ENV POSTGRES_SCHEMA=public

# Expose the PostgreSQL port
EXPOSE 5432

# Add a volume to ensure that database data persists
VOLUME  ["/var/lib/postgresql/data"]
