import parsePhoneNumberFromString from 'libphonenumber-js'

interface PhoneNumber {
    country: string,
    countryCallingCode: string,
    nationalNumber: string,
    number: string,
}

// Assuming phoneNumberString is the international phone number string
const phoneNumberString = '+1-212-456-7890';

export function parsePhoneNumber(phoneNumberString: string) {
    const phoneNumber = parsePhoneNumberFromString(phoneNumberString)
    if (phoneNumber && phoneNumber.country) {
        phoneNumber.countryCallingCode = "+" + phoneNumber.countryCallingCode
    }
    return phoneNumber
}


export function getCountryCallingCode(phoneNumberString: string) {
    const phoneNumber = parsePhoneNumber(phoneNumberString)
    return phoneNumber?.countryCallingCode;
}

export function getNationalNumber(phoneNumberString: string) {
    const phoneNumber = parsePhoneNumber(phoneNumberString)
    return phoneNumber?.nationalNumber;
}

/*


PhoneNumber {
  country: 'US',
  countryCallingCode: '1',
  nationalNumber: '2124567890',
  number: '+12124567890',
  getMetadata: [Function (anonymous)],
  __countryCallingCodeSource: 'FROM_NUMBER_WITH_PLUS_SIGN'
}



*/