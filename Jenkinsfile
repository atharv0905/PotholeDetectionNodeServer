 pipeline {
        agent any

        stages {
            stage('Build') {
                steps {
                    echo 'Building the application...'
                    // Add your build commands here (e.g., mvn clean install, npm build)
                }
            }
            stage('Test') {
                steps {
                    echo 'Running tests...'
                    // Add your test commands here (e.g., mvn test, npm test)
                }
            }
            stage('Deploy') {
                steps {
                    echo 'Deploying the application...'
                    // Add your deployment commands here
                }
            }
        }
    }
