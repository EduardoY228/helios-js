pipeline {
    agent any
    stages {
        stage("Checkout Code") {
            steps {
                git(url: 'https://github.com/EduardoY228/helios-js.git', branch: 'master')
            }
        }

        stage("build") {
            steps {
                sh """
                     docker build -t ses-monitoring-js .
                """
            }
        }


       stage("run") {
            steps {
                sh """
                        lsof -t -i tcp:3034 -s tcp:listen | xargs kill
                        docker run -d -p3034:3034 ses-monitoring-js
                  """
            }
       }
    }
}