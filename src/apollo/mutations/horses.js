export const CREATE_HORSE = /* GraphQL */ `
  mutation HorseMutation($input: CreateHorseInput!) {
    createHorse(input: $input) {
      color
      createdAt
      dob
      height
      id
      name
      photo
      scannedAt
      status
      updatedAt
      weight
      discipline
    }
  }
`;


export const UPDATE_HORSE = /* GraphQL */ `
  mutation HorseMutation($input: UpdateHorseInput!) {
    updateHorse(input: $input) {
      color
      createdAt
      dob
      height
      id
      name
      photo
      scannedAt
      status
      updatedAt
      weight
      discipline
    }
  }
`;


export const DELETE_HORSES = /* GraphQL */ `
  mutation HorseMutation($ids: [ID!]!) {
    deleteHorse(ids: $ids) {
      id
    }
  }
`;