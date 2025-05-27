export interface IGreenPaper {
  bookletNumber: string;
  barcode: string;
  ownerNationalCode: string;
  nationalCode: string;
  type: number;
}

export interface IReturnBank {
  initialInquiryRequestBusinessId: string;
}

export interface IVerifyInquiry {
  inquiryCode: string;
  verificationCode: string;
}

export interface ICreateEmpty {
  approvedInquiryRequestBusinessId: string;
}

export interface IContractDetails {
  businessId: string;
  amount: string;
  date: string;
  description: string;
}

export interface IAddPayment {
  contractBusinessId: string;
  amount: string;
  payDate: string;
  type: string;
  description: string;
}

export interface IGetPersonByType {
  ContractBusinessId: string;
  Type: string;
}

export interface IGetPayment {
  ContractBusinessId: string;
}

export interface ContractResponse {
  contract: Contract;
  contractPayments: ContractPayment[];
  contractBuyers: ContractParty[];
  contractSellers: ContractParty[];
  approvedInquiryRequest: ApprovedInquiryRequest;
}

export interface Contract {
  id: number;
  businessId: string;
  userId: string;
  date: string;
  type: "Online" | "Offline";
  approvedInquiryRequestBusinessId: string;
  carType: BaseEntityWithTitle;
  carSystem: BaseEntityWithTitle;
  carManufactureYear: number;
  color: BaseEntityWithTitle;
  plateNumber: string;
  motorNumber: string;
  chassisNumber: string;
  amount: number;
  amountInWords: string;
  damageAmount: number;
  notaryDate: string;
  notaryNumber: string;
  notaryFeePayer: "None" | string;
  notaryFeePayerDescription: string;
  typeDescription: string;
  vehicleDeliveryDate: string;
  carDocumentHolder: "None" | string;
  carDocumentHolderDescription: string;
  contractState: "Draft" | string;
  description: string;
}

export interface BaseEntityWithTitle {
  id: number;
  businessId: string;
  title: string | null;
}

export interface ContractPayment {
  id: number;
  businessId: string;
  contractBusinessId: string;
  amount: number;
  payDate: string;
  type: string;
  typeDescription: string;
  description: string;
}

export interface ContractParty {
  id: number;
  businessId: string;
  contractBusinessId: string;
  person: Person;
  contractSide: "Buyer" | "Seller" | string;
  sharePersentage: number;
  shareType: "Dong" | string;
  shareTypeDescription: string;
}

export interface Person {
  id: number;
  businessId: string;
  firstName: string;
  lastName: string;
  fatherName: string;
  identificationNumber: string;
  birthPlace: string;
  birthDate: string;
  certificateIssuanceCity: string;
  postalCode: string;
  nationalCode: string;
  address: string;
  phoneNumber: string;
}

export interface ApprovedInquiryRequest {
  id: number;
  businessId: string;
  initialInquiryRequestBusinessId: string;
  responseJson: InquiryResponse;
}

export interface InquiryResponse {
  infraction: InquiryResult;
  freeWayToll: InquiryResult;
  tax: InquiryResult;
  technicalDiagnosis: {
    fuelSystem: string;
    validityDate: string;
    status: string;
    done: boolean;
  };
  factoryInformation: {
    warranty: WarrantyInfo;
  };
  insurance: {
    start: string;
    end: string;
    done: boolean;
    report: InsuranceReport[];
  };
  vehicle: {
    color: string;
    system: string;
    tip: string;
    usage: string;
    subUsage: string;
    model: string;
    fuel: string;
    countNumbering: string;
  };
  status: string;
  done: boolean;
  trackingCode: string;
}

export interface InquiryResult {
  status: string;
  price: string;
  done: boolean;
}

export interface WarrantyInfo {
  startDate: string;
  endDate: string;
  status: string;
  done: boolean;
}

export interface InsuranceReport {
  date: string;
  price: string;
  message: string;
  done: boolean;
}

export interface IRemovePerson {
  personBusinessId: string;
  contractBusinessId: string;
}

export interface IRemovePayment {
  contractPaymentBusinessId: string;
  contractBusinessId: string;
}

///////////////////////////////////////////////

export interface InquiryResultResponse {
  data: {
    inquiryResult: InquiryResult;
    approvedInquiryRequestBusinessId: string;
  };
}

export interface InquiryResult {
  infraction: InquiryStatus;
  freeWayToll: InquiryStatus;
  tax: InquiryStatus;
  technicalDiagnosis: TechnicalDiagnosis;
  factoryInformation: FactoryInformation;
  insurance: Insurance;
  vehicle: Vehicle;
  status: string;
  done: boolean;
  trackingCode: string;
}

export interface InquiryStatus {
  status: string;
  price: string;
  done: boolean;
}

export interface TechnicalDiagnosis {
  fuelSystem: string;
  validityDate: string;
  status: string;
  done: boolean;
}

export interface FactoryInformation {
  warranty: Warranty;
}

export interface Warranty {
  startDate: string;
  endDate: string;
  status: string;
  done: boolean;
}

export interface Insurance {
  start: string;
  end: string;
  done: boolean;
  report: InsuranceReport[];
}

export interface InsuranceReport {
  date: string;
  price: string;
  message: string;
  done: boolean;
}

export interface Vehicle {
  color: string;
  system: string;
  tip: string;
  usage: string;
  subUsage: string;
  model: string;
  fuel: string;
  countNumbering: string;
}
