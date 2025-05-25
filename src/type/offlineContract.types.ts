export interface IOfflineContract {
  sellerName: string;
  sellerFatherName: string;
  sellerIdNumber: string;
  sellerCity: string;
  sellerBirthDate: string;
  sellerNationalCode: string;
  sellerAddress: string;
  sellerPhone: string;

  buyerName: string;
  buyerFatherName: string;
  buyerIdNumber: string;
  buyerCity: string;
  buyerBirthDate: string;
  buyerNationalCode: string;
  buyerAddress: string;
  buyerPhone: string;

  priceNumber: string;
  alphNumber: string;
  depositAmount: string;
  remainingAmount: string;
  damageaAmount: string;

  contractDate: string;
  notaryNumber: string;

  notaryPrice: string;

  parkingDate: string;
  parkingClock: string;

  documents: string;

  description: string;
}

export interface IOfflineContractCarInformation {
  carTypeBusinessId: string;
  carSystemBusinessId: string;
  carManufactureYear: number | null;
  colorBusinessId: string;
  plateNumber?: string;
  motorNumber: string;
  amount: number | null;
  amountInWords: string;
  damageAmount: number | null;
  notaryDate: string;
  notaryNumber: string | number | null;
  notaryFeePayer: string;
  vehicleDeliveryDate: string;
  carDocumentHolder: string;
  description?: string;
  date: string;
  chassisNumber: string;
}

export interface ICarSystemResponse {
  businessId: string;
  title: string;
}



export interface ContractDetailsResponse {
  id: number;
  businessId: string;
  userId: string;
  date: string; 
  type: "Offline" | "Online"; 
  approvedInquiryRequestBusinessId: string | null;
  carType: CarInfo;
  carSystem: CarInfo;
  carManufactureYear: number;
  color: CarInfo;
  plateNumber: string;
  motorNumber: string;
  chassisNumber: string;
  amount: number;
  amountInWords: string;
  damageAmount: number;
  notaryDate: string; 
  notaryNumber: string;
  notaryFeePayer: "Buyer" | "Seller" ; 
  vehicleDeliveryDate: string; 
  carDocumentHolder: "Buyer" | "Seller" ;
  contractState: "Draft" | "Signed" | "Pendding" | "Canceld"; 
  description: string;
}

export interface CarInfo {
  id: number;
  businessId: string;
  title: string;
}
