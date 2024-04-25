FROM postgres
RUN apt-get update && apt-get install -y --no-install-recommends
ARG POSTGRES_USER=postgres
ARG POSTGRES_PASSWORD=postgres
ARG POSTGRES_DB=postgres
EXPOSE 5432