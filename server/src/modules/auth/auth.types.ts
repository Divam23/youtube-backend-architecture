export interface RegisterUserInput{
    username:string,
    password:string,
    email:string,
    bio:string,
    avatarUrl:string
}

export interface loginUserInput{
    email:string,
    password:string,
    username:string
}

interface logoutUserInput{

}