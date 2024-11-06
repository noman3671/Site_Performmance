export const UPDATE_USER = /* GraphQL */ `
  mutation UpdateUserMutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      address
      city
      state
      country
      firstName
      lastName
      zipCode
      streetNumber
      streetName
      notification
      name
      phone
      photo
      email
      createdAt
      updatedAt
    }
  }
`;
