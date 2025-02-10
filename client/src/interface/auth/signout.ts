export interface SignUpForm {
    username: string,
    email: string,
    password: string,
    cpassword: string
}

export interface SignUpFormErr {
    username?: string,
    email?: string,
    password?: string,
    cpassword?: string
}