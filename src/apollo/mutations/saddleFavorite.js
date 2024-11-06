export const CREATE_SADDLE_FAVOURITE = /* GraphQL */ `
  mutation LikeSaddleFitFavorite($saddleId: ID!, $horseId: ID!) {
    likeSaddleFitFavorite(saddleId: $saddleId, horseId: $horseId) {
      userId
      horseId
      saddleId
      isFavorite
      updatedAt
      createdAt
      discipline
      newOrUsed
      score
      saddle {
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
    # mutation SaddleFavouriteMutation($saddleId: ID!, $horseId: ID!) {
    #     createSaddleFavorite(saddleId: $saddleId, horseId: $horseId) {
    #         createdAt
    #         saddleId
    #         updatedAt
    #         userId
    #         saddle {
    #         amountOfTooling
    #         availability
    #         backBilletLatigo
    #         brandName
    #         cantle
    #         cantleHeight
    #         color
    #         conchoType
    #         condition
    #         createdAt
    #         description
    #         fendersLeathersCutLength
    #         finishedHornHeight
    #         finishedSeatSize
    #         fleece
    #         frontBilletLatigo
    #         frontCinch
    #         gullet
    #         gulletWidth
    #         hornCapWidth
    #         hardwareType
    #         id
    #         maker
    #         makerLocation
    #         material
    #         model
    #         newOrUsed
    #         photo
    #         price
    #         rearCinch
    #         riggingType
    #         saddleFitNumber
    #         scannedAt
    #         serialNumber
    #         size
    #         skirtLength
    #         status
    #         stirrups
    #         strings
    #         style
    #         swellWidth
    #         treeType
    #         treeWarranty
    #         type
    #         typeOfTooling
    #         unTooledPortionsTexture
    #         updatedAt
    #         userId
    #         weight
    #         yearOfManufacture
    #         }
    #     }
    # }
`;





export const DELETE_SADDLE_FAVOURITE = /* GraphQL */ `
  mutation UnlikeSaddleFitFavorite($saddleId: ID!, $horseId: ID!) {
    unlikeSaddleFitFavorite(saddleId: $saddleId, horseId: $horseId) {
      isFavorite
      horseId
      saddleId
      updatedAt
      userId
      createdAt
      discipline
      newOrUsed
      score
      saddle {
        amountOfTooling
        availability
        backBilletLatigo
        brandName
        cantle
        color
        cantleHeight
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
  # mutation DeleteSaddleFavoriteMutation($saddleId: ID!, $horseId: ID!) {
  #   deleteSaddleFavorite(saddleId: $saddleId,  horseId: $horseId) {
  #     createdAt
  #     saddleId
  #     updatedAt
  #     userId
  #     saddle {
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
  #       model
  #       material
  #       photo
  #       newOrUsed
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
