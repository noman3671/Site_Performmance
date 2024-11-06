export const GET_USER_DATA = /* GraphQL */ `
  query ClientQuery {
    user {
      address
      city
      country
      createdAt
      zipCode
      streetNumber
      streetName
      notification
      email
      firstName
      id
      isPhoneVerified
      lastName
      name
      state
      photo
      phone
      updatedAt
    }
  }
`;
