export interface DataUser {
    username:string,
    phone : number ,
    email : string ,
    role? : {
        type : String,
        default : 'USER'
    } ,
    password ?: string,
}

