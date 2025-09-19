# stockledger-backend

## Project Setup

### Install packages
Install all NodeJS packages for the project

"""
    npm install
"""

### Create JWT Key
Creates an JWT Key for signing JWT Tokens
"""
    ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
"""

### Environment Variables
Fill out template.env file and save it as .env file