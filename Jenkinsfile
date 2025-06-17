pipeline {
    agent any

    environment {
        IMAGE_NAME = 'tourism-node-app'
        CONTAINER_NAME = 'tourism-app-container'
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Cloning project from Git...'
                git 'https://github.com/your-username/your-repo.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Run App in Docker') {
            steps {
                echo 'Running the Node.js app using Docker...'
                // Stop and remove existing container if running
                sh '''
                docker stop $CONTAINER_NAME || true
                docker rm $CONTAINER_NAME || true
                docker run -d --name $CONTAINER_NAME -p 3000:3000 $IMAGE_NAME
                '''
            }
        }
    }

    post {
        success {
            echo '✅ App successfully built and running in Docker!'
        }
        failure {
            echo '❌ Something went wrong in the pipeline.'
        }
    }
}
