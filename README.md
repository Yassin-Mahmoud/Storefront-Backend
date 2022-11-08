# Storefront Backend Project

## Getting Started

- Run `npm install` to install project dependencies
- Create postgres database
- Create postgres database for testing
- Run `npx db-migrate up` to setup database migrations

## Values of the .env file

##### Database values

- POSTGRES_HOST
- POSTGRES_PORT
- POSTGRES_DB
- POSTGRES_USER
- POSTGRES_PASSWORD
- TEST_POSTGRES_DB

##### Password hashing values

- PEPPER
- SALT ROUNDS

##### Jwt values

- SECRET_TOKEN

##### Server values

- PORT

###### Database port : [ 5432 ]

## Scripts

- [ dev ] : runs the server ts file with nodemone `npm run dev`
- [ build ] : compiles ts to js `npm run build`
- [ start ] : compiles ts to js and runs the server js file with nodemone `npm run start`
- [ jasmine ] : runs jasmine for testing `npm run jasmine`
- [ test ] : runs the database migrations up and runs jasmine testing, after that resets the database migrations `npm run test`

## Notes

- The endpoints, database tables and columns are shown in the REQUIREMENTS.md file
- You can run `db-migrate reset` to delete all database tables
