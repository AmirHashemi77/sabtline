export enum RegisterSteps {
    SELECT_APPROACH = 'SELECT_APPROACH',
    PHONE_NUMBER = 'PHONE_NUMBER',
    OTP = 'OTP',
    LOGIN = 'LOGIN',

    REGISTER_DATA = 'REGISTER_DATA',
}

export const VERIFY_OTP_TOKEN: Readonly<string> = "verifyOtpToken"
export const ACCESS_TOKEN_SSO: Readonly<string> = "accessTokenSSO"
export const CONTRACT_ID: Readonly<string> = "contractId"

export const ShareType = [
    {title: 'دانگ', value: 'Dong'},
    {title: 'درصد', value: 'Percent'},
]
