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
                      sh ./run_container.sh
                  """
            }
       }
    }
}