export const LIST_CART_BY_USERID = /* GraphQL */ `
  query listCartByUserId($limit: Int, $nextToken: String) {
    listCartByUserId(limit: $limit, nextToken: $nextToken) {
      count
      nextToken
      items {
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
  }
`;
