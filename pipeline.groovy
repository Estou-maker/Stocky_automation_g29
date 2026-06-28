pipeline {
    agent any
    
    environment {
        NODE_HOME = 'C:\\Program Files\\nodejs'
        PATH = "${env.PATH};${NODE_HOME}"
    }

    stages {
        stage('Verify Environment') {
            steps {
                echo 'Verifying Env Setup...'
                bat 'node -v'
                bat 'npm -v'
                bat 'git --version'
            }
        }

        stage('Clean Json Report') {
            steps {
                bat 'del /S /Q *.json'
            }
        }

        stage('Checkout Code') {
            steps {
                echo 'Checking out code from github...'
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/Estou-maker/Stocky_automation_g29.git'
                        credentialsId: 'TKNG29'
                    ]]
                ])
            }
        }

        stage('Install dependencies') {
            steps {
                echo 'Installing Project Dependencies'
                bat 'npm install'
            }
        }

        stage('Create Reports Dir') {
            steps {
                bat '''
                if not exist "cypress\\reports\\.json" mkdir "cypress\\reports\\.json"
                if not exist "cypress\\reports\\html_reports" mkdir "cypress\\reports\\html_reports"
                '''
            }
        }

        stage('Run Cypress Tests') {
            steps {
                echo 'Running Tests in headless Mode'
                bat 'npx Cypress run --headless --browser chrome'
            }
        }

    }   
}