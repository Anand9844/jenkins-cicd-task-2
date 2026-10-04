# Jenkins CI/CD Task 2

## Objective

This project implements the internship Task 2: create a simple Jenkins pipeline for CI/CD.

The assignment asks for Jenkins + Docker, a Jenkinsfile, build/test/deploy stages, triggering from code commits, and testing the pipeline from the Jenkins dashboard.

## Project flow

Developer -> GitHub -> Jenkins -> Checkout -> npm install -> Test -> Docker Build -> Docker Deploy -> Health Check -> Application

## Technologies

- Jenkins
- Docker
- Node.js
- Express
- Git / GitHub

## Project structure

```text
jenkins-cicd-task/
├── app.js
├── package.json
├── test.js
├── Dockerfile
├── .dockerignore
├── Jenkinsfile
├── Jenkinsfile-Windows.groovy
└── README.md
```

## Run locally without Jenkins

Prerequisites:
- Node.js 20+
- Docker Desktop (only needed for Docker run)

### 1. Install dependencies

```bash
npm install
```

### 2. Run tests

```bash
npm test
```

### 3. Run the application

```bash
npm start
```

Open:
- http://localhost:3000
- http://localhost:3000/health

## Run with Docker

Make sure Docker Desktop is running.

```bash
docker build -t jenkins-cicd-demo .
docker run -d --name jenkins-cicd-demo-container -p 3001:3000 jenkins-cicd-demo:latest
```

Open:
- http://localhost:3001
- http://localhost:3001/health

If port 3001 is already used:

```bash
docker run -d --name jenkins-cicd-demo-container -p 3010:3000 jenkins-cicd-demo:latest
```

Then open http://localhost:3010.

## Jenkins setup

### Prerequisites

Jenkins needs:
- Git
- Node.js/npm
- Docker CLI
- Access to a running Docker daemon

For a Windows Jenkins agent, use `Jenkinsfile-Windows.groovy`.
For a Linux Jenkins agent, use the included `Jenkinsfile`.

### Create the Jenkins job

1. Open Jenkins.
2. Select **New Item**.
3. Enter `Jenkins-CICD-Task-2`.
4. Select **Pipeline**.
5. Click **OK**.
6. Under Pipeline, choose **Pipeline script from SCM**.
7. SCM = Git.
8. Enter your GitHub repository URL.
9. Branch = `*/main` (or your actual branch).
10. Script Path = `Jenkinsfile`.
11. Save.
12. Click **Build Now**.

### GitHub commit trigger

For a simple internship demonstration, you can manually click Build Now after pushing code.

For automatic triggering:
1. Configure a GitHub webhook pointing to your Jenkins server.
2. Enable the GitHub hook trigger in the Jenkins job.
3. Push a new commit.
4. Jenkins starts the pipeline.

If Jenkins is running only on your local PC, GitHub cannot normally reach `localhost`. Use a reachable Jenkins server/cloud VM or a suitable secure tunneling solution for webhook testing.

## Pipeline stages

1. Checkout - downloads the repository.
2. Install Dependencies - installs Node.js packages.
3. Test - starts the application and checks `/health`.
4. Build Docker Image - creates a Docker image.
5. Deploy - removes the old container and starts the new container.
6. Verify Deployment - checks the deployed health endpoint.

## Important Windows note

The main `Jenkinsfile` uses Linux shell commands (`sh`). If your Jenkins agent is Windows, use the Windows version:

1. Rename `Jenkinsfile-Windows.groovy` to `Jenkinsfile`, OR
2. Copy its contents into the repository's `Jenkinsfile`.

The Windows pipeline uses `bat` and PowerShell.

## Common Docker problems

### Docker daemon error

If you see:

`failed to connect to the docker API ... dockerDesktopLinuxEngine`

start Docker Desktop and wait until Docker Engine is running.

Check:

```bash
docker version
docker info
```

Both client and server information should be available.

### Port already in use

Check:

```bash
docker ps
```

Stop/remove the old container:

```bash
docker rm -f jenkins-cicd-demo-container
```

Or use another host port:

```bash
docker run -d --name jenkins-cicd-demo-container -p 3010:3000 jenkins-cicd-demo:latest
```

## GitHub commands

```bash
git init
git add .
git commit -m "Add Jenkins CI/CD pipeline"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## What to demonstrate

Show these in your submission:

- GitHub repository
- Jenkins pipeline stages
- Successful Build
- Docker image
- Running Docker container
- Application in browser
- `/health` endpoint
- Jenkins console output

## Interview questions

### 1. What is Jenkins?

Jenkins is an automation server commonly used to implement CI/CD pipelines. It can automatically build, test and deploy software.

### 2. What is a Jenkinsfile?

A Jenkinsfile is a text file stored with the project source code that defines the Jenkins pipeline as code.

### 3. How do you create a Jenkins pipeline?

Create a Jenkins job, select Pipeline, connect it to the Git repository, and configure it to use the repository's Jenkinsfile.

### 4. Common pipeline stages?

Checkout, Build, Test, Package, Docker Build, Deploy and Verify are common stages.

### 5. Declarative vs Scripted Pipeline?

Declarative Pipeline uses a structured `pipeline {}` syntax and is easier to read and maintain. Scripted Pipeline uses Groovy scripting and gives more programming flexibility.

## Submission checklist

- [ ] GitHub repository created
- [ ] Jenkinsfile committed
- [ ] Dockerfile committed
- [ ] Application code committed
- [ ] README.md committed
- [ ] Jenkins build successful
- [ ] Docker container running
- [ ] Browser shows the application
- [ ] Screenshots captured
