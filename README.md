🌍 Concurrency Exchange Website 💸
📜 Overview
This project is focused on creating a Concurrency Exchange platform where users can discuss and comment on different currencies. It's built using Next.js, PostgreSQL, and explores advanced concepts like caching with Redis, microservices with Docker, transaction management with Prisma, and load balancing with Kubernetes.

🚀 The goal is to enhance scalability and functionality through modern technologies, making the platform both efficient and user-friendly.

🔑 Features
🔄 Currency Conversion: View real-time currency conversion rates between different countries, powered by the OpenExchange API.
💬 Currency Discussions: Users can post comments and discuss different currencies and exchange rates.
🛠️ Advanced Technologies: Implementation of Redis for caching, Docker for microservices, Prisma for transaction management, and Kubernetes for load balancing.
🛠️ Development
To start development, make sure you have Docker installed on your system. Then follow the steps below:

🐳 Run the dev_db.sh script to start PostgreSQL and Redis containers.
🧑‍💻 Set up the environment for each application. Be sure to read the README.md files for individual services to configure them correctly.
🚀 Start the development server.
🗂️ Project Structure
The project is divided into several microservices and components, each handling a specific function. Here's a breakdown of the main components:

🏦 Currency API: Handles fetching and updating currency exchange rates.
💬 Comment Service: Manages user discussions and comments on currencies.
💻 Web Interface: The frontend built with Next.js, which provides users a seamless interface.
🚀 Technologies Used
Next.js: A React framework for building server-rendered applications.
PostgreSQL: A relational database used for storing currency data and user information.
Redis: Used for caching currency exchange rates to improve performance.
Docker: Enables a microservice architecture by containerizing each service.
Prisma: A database toolkit to manage and optimize database transactions.
Kubernetes: Manages load balancing and scaling of microservices.

🧑‍💻 Setup Instructions
# 1. Clone the repository
git clone https://github.com/yourusername/204333-project.git

# 2. Navigate to the project directory
cd 204333-project

# 3. Run the Docker Compose script to start the application and services
./run_compose.sh

# After running the script, the application should be available at:
# http://localhost:3000

🚀 To Access the Application:
Once the run_compose.sh script completes, your application should be accessible at http://localhost:3000 in your browser.
