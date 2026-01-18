Project Structure
apps/web: Angular Frontend
apps/api: NestJS Backend

How to Run

Create a PostgreSQL database for the application
create a .env file and add these Environment Variables:
JWT_SECRET=
PORT=
DB_PORT=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
PRICE_PREDICTION_API_URL=

Install Dependencies:
npm install

Run the Web Application:
npm run web
Navigate to http://localhost:4200

Run the API:
npm run api
API will be available at http://localhost:3000

Seeding Database
npm run seed --workspace=api

Adding packages:
npm install <package-name> -w <workspace-name>
npm install bcrypt -w api
