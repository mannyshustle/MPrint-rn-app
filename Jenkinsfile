pipeline {
    agent any

    stages {
        stage('Prepare') {
            steps {
                sh '''
                    yarn
                '''
            }
        }
        stage('Build') {
            steps {
                withCredentials([file(credentialsId: 'SERVICE_CREDENTIALS_FILE', variable: 'SERVICE_CREDENTIALS_FILE'),
                string(credentialsId: 'FIREBASE_APP_ID', variable: 'FIREBASE_APP_ID')]) {
                    sh '''
                        export SERVICE_CREDENTIALS_FILE=$SERVICE_CREDENTIALS_FILE
                        export FIREBASE_APP_ID=$FIREBASE_APP_ID
                        cd android
                        fastlane android deploy
                    '''
                }
            }
        }
    }
}
