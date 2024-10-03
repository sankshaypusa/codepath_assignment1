# codepath_assignment2
1. Project Structure
The application is split into two main parts: client (frontend) and server (backend). This separation allows for a clean architecture where the server is responsible for handling database operations and the client focuses on displaying data and interacting with the user.

Client Folder:
assets/: Holds images or other static assets.
css/: Stores the styling for the frontend. In this case, the styles are written in a CSS file to define the look and feel of the web app.
src/: Contains the main JavaScript file that fetches data from the server and dynamically displays it in the HTML.
Server Folder:
config/: Holds configuration files like the database connection.
routes/: Contains routes to handle specific HTTP requests (like getting companies' data).
server.js: The main backend file where the Express server is set up and configured.
2. PostgreSQL Database
The database is a PostgreSQL instance with a companies table that stores information about companies, such as:

name: The company's name.
logo: URL to the company’s logo image.
mission: The company's mission statement.
lobbying: Amount spent by the company on lobbying.
diversityScore, environmentalResponsibility, and politicalIntrigue: Ratings that contribute to a company's Social Responsibility Index (SRI).
This data is used to display information on the web app, which includes listing the companies and showing more detailed views when the user clicks on each company.

3. Backend (Express Server)
Database Setup: The server connects to the PostgreSQL database using the pg library. The credentials for the database connection are stored in the configuration and passed to the Express server.
Routing:
/api/companies: This route is responsible for retrieving the list of companies from the database. When a user visits the homepage, the client JavaScript will send a request to this route, and the server will respond with JSON data of all companies.
/api/companies/:id: This route handles fetching a single company by its ID, which is displayed when a user clicks on a company from the list.
404 Handling: If a user navigates to a route that is not defined, the server will return a custom 404 page.
4. Frontend (HTML/CSS/JavaScript)
HTML:
The basic structure is defined in index.html. It includes a header for the title, a main section where the company list will be displayed, and a footer.
JavaScript:
The client-side JavaScript file (app.js) handles fetching the list of companies from the server using the Fetch API.
It then dynamically creates HTML elements to display each company as a card, showing their name, logo, mission, and lobbying spend. Each company card contains a link to view more details, which will be routed to the detailed view.
CSS:
The web app is styled using a custom CSS file (styles.css). It includes basic styling for the header, company cards, and footer.
The cards are designed to display company information in a clean, user-friendly format with images, titles, and descriptions.
5. Detailed View for Each Company
When a user clicks on a company in the list, they are taken to a detailed view of that company. The /:id route is used to fetch detailed information about the company from the server, which is then displayed dynamically on the client side.

6. Running the App
After setting everything up:

Install necessary dependencies (express, pg).
Set up PostgreSQL and create the companies table.
Run the server using node server/server.js.
Open the app in the browser at http://localhost:3000.
