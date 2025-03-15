// src/dto/user.dto.ts
export class CreateUser {
    name?: string;
    email?: string;
    password?: string;
    salt?:string 
  }
  
  export class UpdateUser {
    name?: string;
    email?: string;
    password?: string;
  }
  