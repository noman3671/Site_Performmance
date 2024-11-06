export const CREATE_CART = /* GraphQL */ `
  mutation createCart($input: CreateCartInput!) {
    createCart(input: $input) {
      createdAt
      saddleId
      updatedAt
      userId
      saddleData {
        brandName
        createdAt
        description
        discipline
        id
        price
        photo
        model
        newOrUsed
        scannedAt
        size
        title
        status
        userId
        updatedAt
        type
        condition
      }
    }
  }
`;

export const DELETE_CART = /* GraphQL */ `
  mutation deleteCart($input: DeleteCartInput!) {
    deleteCart(input: $input) {
      id
    }
  }
`;
