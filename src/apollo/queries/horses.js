export const listUserHorses = /* GraphQL */ `
  query listUserHorses($limit: Int, $nextToken: String) {
    listUserHorses(limit: $limit, nextToken: $nextToken) {
      count
      items {
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
      nextToken
    }
  }
`;
