# Instructions
- Clone and rename folder `$ git clone git@github.com:dented-academy/express-api-starter.git [your_project_name_here]`
- Find and rename all instance of `[your_project_name_here]` to your actual project name
- Run `$ npm install`
- Run `$ npx prisma init`
- Add to `.env` file (create if not exist)
  ```env
  DATABASE_URL="postgresql://[user]:[password]@localhost:5432/[your_project_name_here]"
  SECRET_COOKIE_PASSWORD="complex_password_at_least_32_characters_long"
  CORS_ORIGIN="[YOUR_WEBSITE_ADDRESS_SEPARATED_BY_COMMA]"
  # Example
  # CORS_ORIGIN="http://localhost:8080,http://localhost:8081"
  ```
- Add `models` to `prisma/schema.prisma`
- Run `$ npx prisma migrate dev`
- Run `$ rm -rf .git`
- Run `$ git init`
- Create a new repo in github and add the repo ssh link to remote
- Run `$ git add .`
- Run `$ git commit -m 'init'`
- Run `$ git push origin master`
- Run `$ nodemon`

# Deployment To Railway Through Web Interface
- Go to [Railway](https://railway.app/)
- Go to `Dashboard` and Create a new project (Select `Empty Project`)
- Add a new Service `Database -> Add PostgreSQL`
- Add a new Service `GitHub Repo -> Select your project`
- Click on your `>_ Repo-Name -> Variables -> New Variable`
  - Add all items you have in `.env` (Like S3 but ignore `DATABASE_URL`)
- Click on your `>_ Repo-Name -> Settings -> Environment -> Generate Domain` (This will generate a domain for your project)
- Now, whenever you push to your github repo's master branch, it will automatically deploy to Railway
