export const shareData = {
    SSO_SABT_LINE: 'oidc.user:https://sso.sabtline.ir:smsgw_ui',
    SSO_APPROACH_SELECTED: 'ssoSelected',
    USER_DATA: 'userData',
    validDataForCreatePerson: (user: any) => {
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            fatherName: user.fatherName,
            nationalCode: user.nationalCode ? user.nationalCode : user.nationalId,
            birthDate: user.birthDateEn ? user.birthDateEn : user.birthDate,
            idNumber: user.shenasnamehNo,
            sex: user.gender === 'MALE' || user.gender === 'MAN' || user.gender === 'مرد' ? 1 : 2,
            postalCode: user.postCode ? user.postCode : user.postalCode,
            mobileNo: user.mobile,
            provinceName: user.address ? user.address.province : user.province,
            townShip: user.address ? user.address.townShip : user.townShip,
            zone: user.address ? user.address.zone : user.zone,
            village: user.address ? user.address.village : user.village,
            localityType: user.address ? user.address.localityType : user.localityType,
            localityName: user.address ? user.address.localityName : user.localityName,
            subLocality: user.address ? user.address.subLocality : user.subLocality,
            street: user.address ? user.address.street : user.street,
            street2: user.address ? user.address.street2 : user.street2,
            houseNumber: user.address ? user.address.houseNumber : user.houseNumber,
            floor: user.address ? user.address.sideFloor : user.sideFloor,
            sideFloor: user.address ? user.address.floor : user.floor,
            buildingName: user.address ? user.address.buildingName : user.buildingName,
            description: user.address ? user.address.description : user.description
        };
    },

}