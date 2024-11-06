/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const listUserHorses = /* GraphQL */ `query ListUserHorses($limit: Int, $nextToken: String) {
  listUserHorses(limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      dob
      color
      photo
      status
      scannedAt
      weight
      createdAt
      updatedAt
      objLocations
      __typename
    }
    nextToken
    count
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserHorsesQueryVariables,
  APITypes.ListUserHorsesQuery
>;
export const listUserSaddles = /* GraphQL */ `query ListUserSaddles($limit: Int, $nextToken: String) {
  listUserSaddles(limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      type
      material
      price
      brandName
      size
      color
      model
      status
      condition
      yearOfManufacture
      maker
      makerLocation
      finishedSeatSize
      newOrUsed
      serialNumber
      amountOfTooling
      unTooledPortionsTexture
      typeOfTooling
      weight
      skirtLength
      treeType
      treeWarranty
      gulletWidth
      swellWidth
      cantleHeight
      finishedHornHeight
      hornCapWidth
      riggingType
      fleece
      fendersLeathersCutLength
      cantle
      conchoType
      hardwareType
      strings
      stirrups
      frontCinch
      frontBilletLatigo
      rearCinch
      backBilletLatigo
      style
      gullet
      saddleFitNumber
      photo
      description
      availability
      scannedAt
      createdAt
      updatedAt
      objLocations
      __typename
    }
    nextToken
    count
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserSaddlesQueryVariables,
  APITypes.ListUserSaddlesQuery
>;
export const user = /* GraphQL */ `query User {
  user {
    id
    address
    city
    state
    country
    firstName
    lastName
    name
    phone
    photo
    email
    createdAt
    updatedAt
    SaddlePreference {
      style
      brandName
      size
      newOrUsed
      condition
      minFitScore
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<APITypes.UserQueryVariables, APITypes.UserQuery>;
export const saddle = /* GraphQL */ `query Saddle($id: ID!) {
  saddle(id: $id) {
    id
    userId
    type
    material
    price
    brandName
    size
    color
    model
    status
    condition
    yearOfManufacture
    maker
    makerLocation
    finishedSeatSize
    newOrUsed
    serialNumber
    amountOfTooling
    unTooledPortionsTexture
    typeOfTooling
    weight
    skirtLength
    treeType
    treeWarranty
    gulletWidth
    swellWidth
    cantleHeight
    finishedHornHeight
    hornCapWidth
    riggingType
    fleece
    fendersLeathersCutLength
    cantle
    conchoType
    hardwareType
    strings
    stirrups
    frontCinch
    frontBilletLatigo
    rearCinch
    backBilletLatigo
    style
    gullet
    saddleFitNumber
    photo
    description
    availability
    saddleMeasurements {
      x
      y
      z
      __typename
    }
    scannedAt
    createdAt
    updatedAt
    objLocations
    __typename
  }
}
` as GeneratedQuery<APITypes.SaddleQueryVariables, APITypes.SaddleQuery>;
export const horse = /* GraphQL */ `query Horse($id: ID!) {
  horse(id: $id) {
    id
    name
    dob
    color
    photo
    status
    saddleMeasurements {
      x
      y
      z
      __typename
    }
    scannedAt
    weight
    createdAt
    updatedAt
    objLocations
    __typename
  }
}
` as GeneratedQuery<APITypes.HorseQueryVariables, APITypes.HorseQuery>;
export const listHorseSaddleFit = /* GraphQL */ `query ListHorseSaddleFit($horseId: ID!, $limit: Int, $nextToken: String) {
  listHorseSaddleFit(horseId: $horseId, limit: $limit, nextToken: $nextToken) {
    items {
      saddleId
      horseId
      createdAt
      score
      updatedAt
      userId
      saddle {
        id
        price
        photo
        brandName
        size
      }
      __typename
    }
    nextToken
    count
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListHorseSaddleFitQueryVariables,
  APITypes.ListHorseSaddleFitQuery
>;
