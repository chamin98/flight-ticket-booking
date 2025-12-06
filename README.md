Flight Booking Web App Walkthrough
I have successfully created the flight booking web application using Angular, TailwindCSS, and Angular Material.

Features Implemented
1. Authentication
Login & Register: Users can sign up and log in.
Mock Auth Service: Simulates authentication and persists user session in local storage.
2. Flight Search
Search Form: Users can search for flights by origin, destination, and date.
Flight List: Displays available flights with details like airline, time, duration, and price.
Mock Data: Generates realistic flight data for demonstration.
3. Flight Details
Detailed View: Shows route information, aircraft details, and amenities.
Booking: Users can book a flight, which adds it to their bookings.
4. User Profile & Bookings
My Bookings: Users can view their booked flights and cancel them.
Profile: Displays user information and booking statistics.
Project Structure
apps/web: Angular Frontend
apps/api: NestJS Backend
How to Run
IMPORTANT

PostgreSQL Requirement: Ensure you have a PostgreSQL database running on localhost:5432 with default credentials (postgres/postgres) and a database named flight_booking. You can configure this in apps/api/src/app.module.ts or via environment variables.

Install Dependencies:
npm install

Run the Web Application:
npm run web
Navigate to http://localhost:4200

Run the API:
npm run api
API will be available at http://localhost:3000

Adding packages:
npm install <package-name> -w <workspace-name>
npm install bcrypt -w api