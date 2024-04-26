## Run development database
```console
docker build -f Dockerfile -t payload-beta-db .
docker run -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=postgres payload-beta-db
```

## Create `.env.local`
Add `DATABASE_URI` to a `.env.local` file next to `.env`.
```bash
DATABASE_URI=postgres://postgres:postgres@127.0.0.1:5432/postgres
```

## Start dev
`npm run dev`

## Apply migrations
```bash
npm run payload migrate
```