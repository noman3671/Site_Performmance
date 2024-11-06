/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createSaddle = /* GraphQL */ `mutation CreateSaddle($input: CreateSaddleInput!) {
  createSaddle(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateSaddleMutationVariables,
  APITypes.CreateSaddleMutation
>;
export const updateSaddle = /* GraphQL */ `mutation UpdateSaddle($input: UpdateSaddleInput!) {
  updateSaddle(input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateSaddleMutationVariables,
  APITypes.UpdateSaddleMutation
>;
export const deleteSaddle = /* GraphQL */ `mutation DeleteSaddle($id: ID!) {
  deleteSaddle(id: $id) {
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
` as GeneratedMutation<
  APITypes.DeleteSaddleMutationVariables,
  APITypes.DeleteSaddleMutation
>;
export const createHorse = /* GraphQL */ `mutation CreateHorse($input: CreateHorseInput!) {
  createHorse(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateHorseMutationVariables,
  APITypes.CreateHorseMutation
>;
export const updateHorse = /* GraphQL */ `mutation UpdateHorse($input: UpdateHorseInput!) {
  updateHorse(input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateHorseMutationVariables,
  APITypes.UpdateHorseMutation
>;
export const deleteHorse = /* GraphQL */ `mutation DeleteHorse($id: ID!) {
  deleteHorse(id: $id) {
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
` as GeneratedMutation<
  APITypes.DeleteHorseMutationVariables,
  APITypes.DeleteHorseMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const saddleCheckout = /* GraphQL */ `mutation SaddleCheckout($input: SaddleCheckoutInput) {
  saddleCheckout(input: $input) {
    sessionURL
    __typename
  }
}
` as GeneratedMutation<
  APITypes.SaddleCheckoutMutationVariables,
  APITypes.SaddleCheckoutMutation
>;
