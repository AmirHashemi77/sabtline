export interface IUserRegistration {
    phoneNumber: string
}

export interface IVerityToken {
    phoneNumber: string;
    protectedToken: string;
    verifyToken: string;
}