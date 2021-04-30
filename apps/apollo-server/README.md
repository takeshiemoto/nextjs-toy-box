
## Docker

1. Dockerに入る
```bash
docker exec -i -t nextjs-toy-box_postgres_1 bash
su - postgres
psql
```

2. ロールとデータベースを作成する

```postgresql
CREATE ROLE oyoyoman LOGIN CREATEDB PASSWORD 'oyoyoman';
CREATE DATABASE nextjstoybox OWNER oyoyoman;
```

3. .envにデータベースURLを書く
```
DATABASE_URL="postgresql://oyoyoman:oyoyoman@localhost:5432/nextjstoybox?schema=public"
```

4. テーブル作成

```shell
npx prisma migrate dev --name init
```