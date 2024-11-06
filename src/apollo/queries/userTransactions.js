export const GET_USER_TRANSACTIONS = /* GraphQL */ `
  query getUserTransactions {
    getUserTransactions {
      soldSaddles {
        id
        status
        receiptUrl
        shippingDetails {
          labelUrl
          orderId
          rateId
          status
          trackingNumber
          trackingUrlProvider
        }
        buyer {
          id
          firstName
          lastName
          name
          email
          photo
          phone
          customerId
          streetName
          streetNumber
          city
          state
          zipCode
          country
          SaddlePreference {
            brandName
            condition
            minFitScore
            newOrUsed
            size
            style
          }
          createdAt
          updatedAt
        }
        seller {
          id
          firstName
          lastName
          name
          email
          photo
          phone
          customerId
          streetName
          streetNumber
          city
          state
          zipCode
          country
          SaddlePreference {
            brandName
            condition
            minFitScore
            newOrUsed
            size
            style
          }
          createdAt
          updatedAt
        }
        saddle {
          id
          title
          brandName
          condition
          description
          discipline
          price
          size
          status
          userId
          createdAt
          updatedAt
        }
        saddleId
        buyerId
        sellerId
        createdAt
        updatedAt
      }
      boughtSaddles {
        id
        status
        shippingDetails {
          labelUrl
          orderId
          rateId
          status
          trackingNumber
          trackingUrlProvider
        }
        buyer {
          id
          firstName
          lastName
          name
          email
          photo
          phone
          customerId
          streetName
          streetNumber
          city
          state
          zipCode
          country
          SaddlePreference {
            brandName
            condition
            minFitScore
            newOrUsed
            size
            style
          }
          createdAt
          updatedAt
        }
        seller {
          id
          firstName
          lastName
          name
          email
          photo
          phone
          customerId
          streetName
          streetNumber
          city
          state
          zipCode
          country
          SaddlePreference {
            brandName
            condition
            minFitScore
            newOrUsed
            size
            style
          }
          createdAt
          updatedAt
        }
        saddle {
          id
          title
          brandName
          condition
          description
          discipline
          price
          size
          status
          userId
          createdAt
          updatedAt
        }
        saddleId
        buyerId
        sellerId
        createdAt
        updatedAt
      }
    }
  }
`;