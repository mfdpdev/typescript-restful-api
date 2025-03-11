# Setup Project

Create .env file

```
DATABASE_URL="postgresql://postgres:@localhost:5432/typescript_restful_api?schema=public"
```

```bash
pnpm install
```

```bash
pnpm prisma migrate dev
```

```bash
pnpm prisma generate
```

```bash
pnpm build
```

```bash
pnpm start
```
