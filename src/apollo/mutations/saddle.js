// export const CREATE_SADDLE = /* GraphQL */ `
//   mutation SaddleMutation($input: CreateSaddleInput!) {
//     createSaddle(input: $input) {
//       id
//       createdAt
//       brandName
//       condition
//       price
//       size
//       material
//       type
//       yearOfManufacture
//       model
//       color
//       updatedAt
//       discipline
//     }
//   }
// `;

export const CREATE_USER_SELL_SADDLE = /* GraphQL */ `
  mutation createUserSellSaddle($input: CreateSaddleInput!) {
    createSaddle(input: $input) {
      id
      title
      description
      size
      brandName
      condition
      price
      discipline
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_My_SADDLE = /* GraphQL */ `
  mutation createMySaddle($input: CreateSaddleInput!) {
    createSaddle(input: $input) {
      amountOfTooling
      availability
      backBilletLatigo
      brandName
      cantle
      cantleHeight
      color
      condition
      createdAt
      conchoType
      description
      discipline
      fendersLeathersCutLength
      finishedHornHeight
      finishedSeatSize
      fleece
      frontBilletLatigo
      frontCinch
      gullet
      gulletWidth
      hardwareType
      hornCapWidth
      id
      maker
      makerLocation
      material
      model
      newOrUsed
      photo
      price
      rearCinch
      riggingType
      saddleFitNumber
      scannedAt
      serialNumber
      size
      skirtLength
      status
      stirrups
      strings
      style
      swellWidth
      title
      treeType
      treeWarranty
      type
      typeOfTooling
      unTooledPortionsTexture
      updatedAt
      userId
      weight
      yearOfManufacture
    }
  }
`;

// mutation MyMutation {
//   updateSaddle(input: {id: "", color: ""}) {
//     color
//   }
// }

// mutation MyMutation {
//   deleteSaddle(ids: "") {
//     id
//   }
// }

export const DELETE_SADDLE = /* GraphQL */ `
  mutation SaddleMutation($ids: [ID!]!) {
    deleteSaddle(ids: $ids) {
      id
    }
  }
`;

export const UPDATE_SADDLE = /* GraphQL */ `
  mutation UpdateSaddleMutation($input: UpdateSaddleInput!) {
    updateSaddle(input: $input) {
      id
      createdAt
      brandName
      condition
      price
      size
      material
      type
      yearOfManufacture
      model
      color
      updatedAt
      discipline
      title
      description
    }
  }
`;

export const UPDATE_MY_SADDLE = /* GraphQL */ `
  mutation UpdateSaddleMutation($input: UpdateSaddleInput!) {
    updateSaddle(input: $input) {
      amountOfTooling
      availability
      backBilletLatigo
      brandName
      cantle
      cantleHeight
      color
      conchoType
      condition
      createdAt
      description
      discipline
      fendersLeathersCutLength
      finishedHornHeight
      finishedSeatSize
      fleece
      frontBilletLatigo
      frontCinch
      gullet
      gulletWidth
      hardwareType
      hornCapWidth
      id
      maker
      makerLocation
      material
      model
      newOrUsed
      photo
      price
      rearCinch
      riggingType
      saddleFitNumber
      scannedAt
      serialNumber
      size
      skirtLength
      status
      stirrups
      strings
      style
      swellWidth
      title
      treeType
      treeWarranty
      type
      typeOfTooling
      unTooledPortionsTexture
      updatedAt
      userId
      weight
      yearOfManufacture
    }
  }
`;

export const SADDLE_CHECKOUT = /* GraphQL */ `
  mutation SaddleCheckoutMutation($input: SaddleCheckoutInput!) {
    saddleCheckout(input: $input) {
      sessionURL
    }
  }
`;

export const CALCULATE_SADDLE_FIT_SCORE = /* GraphQL */ `
  mutation calculateSaddleFitScore($horseId: ID!, $saddleId: ID!) {
    calculateFitScore(horseId: $horseId, saddleId: $saddleId) {
      score
    }
  }
`;

export const UN_SELL_SADDLE = /* GraphQL */ `
  mutation UnSellSaddleMutation($saddleId: ID!) {
    unSaleSaddle(saddleId: $saddleId) {
      amountOfTooling
      availability
      backBilletLatigo
      brandName
      cantle
      cantleHeight
      color
      conchoType
      condition
      createdAt
      description
      discipline
      fendersLeathersCutLength
      finishedHornHeight
      finishedSeatSize
      fleece
      frontBilletLatigo
      frontCinch
      gullet
      gulletWidth
      hardwareType
      hornCapWidth
      id
      maker
      makerLocation
      material
      measurements {
        gulletHeight
        gulletWidth
        barAngle
      }
      model
      newOrUsed
      photo
      price
      rearCinch
      riggingType
      saddleFitNumber
      saddleMeasurements {
        x
        y
        z
      }
      scannedAt
      serialNumber
      size
      skirtLength
      status
      stirrups
      strings
      style
      swellWidth
      title
      treeType
      treeWarranty
      type
      typeOfTooling
      unTooledPortionsTexture
      updatedAt
      userId
      weight
      yearOfManufacture
      gallery
    }
  }
`;
