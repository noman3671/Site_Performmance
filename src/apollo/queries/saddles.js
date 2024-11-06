export const GET_HORSE_SADDLE_FIT = /* GraphQL */ `
  query HorseSaddleFitQuery(
    $horseId: ID!
    $limit: Int
    $nextToken: String
    $sortBy: SortBy
    $filter: SaddleFitFilter
    $sort: SaddleFitSort
  ) {
    listHorseSaddleFit (
      horseId: $horseId
      limit: $limit
      nextToken: $nextToken
      sortBy: $sortBy
      filter: $filter
      sort: $sort
    ) {
      count
      nextToken
      items {
        createdAt
        horseId
        userId
        updatedAt
        score
        saddleId
        price
        saddle {
          amountOfTooling
          backBilletLatigo
          availability
          brandName
          title
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
          hornCapWidth
          hardwareType
          id
          maker
          makerLocation
          material
          model
          newOrUsed
          price
          photo
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
    }
  }
  # query UserSaddlesQuery($limit: Int, $nextToken: String) {
  #   listUserSaddles(limit: $limit, nextToken: $nextToken) {
  #     count
  #     nextToken
  #     items {
  #       amountOfTooling
  #       availability
  #       backBilletLatigo
  #       brandName
  #       cantle
  #       cantleHeight
  #       color
  #       conchoType
  #       condition
  #       createdAt
  #       description
  #       fendersLeathersCutLength
  #       finishedHornHeight
  #       finishedSeatSize
  #       fleece
  #       frontBilletLatigo
  #       frontCinch
  #       gullet
  #       gulletWidth
  #       hardwareType
  #       hornCapWidth
  #       id
  #       maker
  #       makerLocation
  #       material
  #       model
  #       newOrUsed
  #       photo
  #       price
  #       rearCinch
  #       riggingType
  #       saddleFitNumber
  #       scannedAt
  #       serialNumber
  #       size
  #       skirtLength
  #       status
  #       stirrups
  #       strings
  #       style
  #       swellWidth
  #       treeType
  #       treeWarranty
  #       type
  #       typeOfTooling
  #       unTooledPortionsTexture
  #       updatedAt
  #       userId
  #       weight
  #       yearOfManufacture
  #     }
  #   }
  # }
`;

// export const LIST_USER_SADDLES = /* GraphQL */ `
//   query UserSaddlesQuery($limit: Int, $nextToken: String) {
//     listUserSaddles(limit: $limit, nextToken: $nextToken) {
//       count
//       nextToken
//       items {
//         amountOfTooling
//         availability
//         backBilletLatigo
//         brandName
//         cantle
//         cantleHeight
//         color
//         conchoType
//         condition
//         createdAt
//         description
//         fendersLeathersCutLength
//         finishedHornHeight
//         finishedSeatSize
//         fleece
//         frontBilletLatigo
//         frontCinch
//         gullet
//         gulletWidth
//         hardwareType
//         hornCapWidth
//         id
//         maker
//         makerLocation
//         material
//         model
//         newOrUsed
//         photo
//         price
//         rearCinch
//         riggingType
//         saddleFitNumber
//         scannedAt
//         serialNumber
//         size
//         skirtLength
//         status
//         stirrups
//         strings
//         style
//         swellWidth
//         treeType
//         treeWarranty
//         type
//         typeOfTooling
//         unTooledPortionsTexture
//         updatedAt
//         userId
//         weight
//         yearOfManufacture
//       }
//     }
//   }
// `;

export const LIST_USER_SELL_SADDLES = /* GraphQL */ `
  query listUserSellSaddles($limit: Int, $nextToken: String) {
    listUserSellSaddles(limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        size
        brandName
        condition
        discipline
        createdAt
        updatedAt
        price
        status
        photo
      }
    }
  }
`;

export const LIST_MY_SADDLES = /* GraphQL */ `
  query listMySaddles($limit: Int, $nextToken: String) {
    listUserSaddles(limit: $limit, nextToken: $nextToken) {
      count
      nextToken
      items {
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
  }
  
`;


export const GET_SADDLE_DETAIL = /* GraphQL */ `
  query SaddleQuery($saddleId: ID!) {
    saddle(id: $saddleId) {
      amountOfTooling
      availability
      backBilletLatigo
      title
      brandName
      cantle
      cantleHeight
      color
      conchoType
      condition
      createdAt
      description
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
