## How to run the application:
The project uses Docker Compose to run the frontend and backend services. To run the application, you need to have Docker and Docker Compose installed on your machine. If you don't have Docker and Docker Compose installed, you can download them from the following links:
#### [Install Docker](https://docs.docker.com/get-docker/)
#### [Install Docker Compose](https://docs.docker.com/compose/install/)

---
## Starting the application:
### 1. Build the Docker images:
To build the Docker images, run the following command in the root directory of the project:
```bash
docker-compose build
```

### 2. Run the application:
To run the application, run the following command in the root directory of the project:
```bash
docker-compose up
```
If you want to run the application in the background, you can use the `-d` flag:

### 3. Access the web site:
Visit the following URL in your browser to access the application:
```
http://localhost:8000
```
---
## Utilities:
### Test the backend server:
To test the backend server, visit the following URL in your browser:
```
http://localhost:8000/api/test/
```

### Stop the application:
To stop the application, run the following command in the root directory of the project:
```bash
docker-compose down
```

### Tips for local development:
It can be useful to download dependencies locally to get better IDE support. To do this, you can run the following command in the `frontend` directory:
```bash
npm install
```



