export type AuthenticateUserRequest = {
    username: string,
    password: string
}

export type AuthenticateKeyRequest = {
    key: string
}

export type AuthenticateAnswer = {
    token: string,
}