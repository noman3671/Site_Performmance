export const LIST_SADDLE_FAVORITES = /* GraphQL */ `
  query ListHorseSaddleFitFavorites($horseId: ID!) {
    listHorseSaddleFitFavorites(horseId: $horseId) {
      count
      items {
        isFavorite
        saddleId
        horseId
        userId
        saddle {
          brandName
          amountOfTooling
          availability
          backBilletLatigo
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
        createdAt
        discipline
        score
        updatedAt
        newOrUsed
      }
    }
  }
  # query SaddleFavoritesQuery($horseId: ID!) {
  #   listSaddleFavorites(horseId: $horseId) {
  #     userId
  #     horseId
  #     saddleId
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
  #       finishedSeatSize
  #     }
  #   }
  # }
`;


export const LIST_SADDLE_FAVOURITES_BY_USER = /* GraphQL */ `
  query ListUserSaddleFitFavorites {
    listUserSaddleFitFavorites {
      count
      items {
        createdAt
        discipline
        horseId
        isFavorite
        newOrUsed
        saddleId
        score
        updatedAt
        userId
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
  }
  # query SaddleFavoritesByUserQuery {
  #   listSaddleFavouriteByUser {
  #     createdAt
  #     horseId
  #     saddleId
  #     updatedAt
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
  #       discipline
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
  #       saddleFitNumber
  #       serialNumber
  #       scannedAt
  #       size
  #       skirtLength
  #       status
  #       stirrups
  #       strings
  #       style
  #       swellWidth
  #       title
  #       treeType
  #       treeWarranty
  #       type
  #       typeOfTooling
  #       unTooledPortionsTexture
  #       updatedAt
  #       weight
  #       yearOfManufacture
  #       riggingType
  #     }
  #   }
  # }
`;
