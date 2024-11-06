// export const LIST_EVENTS_BY_COUNTRY = /* GraphQL */ `
//   query listEventsByCountry($country: String!) {
//     listEventsByCountry(country: $country) {
//       nextToken
//       count
//       items {
//         bookNowUrl
//         city
//         country
//         date
//         eventLocation
//         image
//         eventName
//         id
//         state
//         userId
//         coordinates {
//           latitude
//           longitude
//         }
//       }
//     }
//   }
// `;

export const AUTHORIZED_DEALERS = /* GraphQL */ `
  query DealersQuery($limit: Int, $nextToken: String) {
    listDealers(limit: $limit, nextToken: $nextToken) {
      count
      nextToken
      items {
        id
        address
        city
        name
        phone
        state
        country
        website
        coordinates {
          latitude
          longitude
        }
      }
    }
  }
`

export const LIST_EVENTS = /* GraphQL */ `
  query listEvents($filter: listEventsFilterInput) {
    listEvents(filter: $filter) {
      items {
        eventName
        description
        id
        image
        eventLocation
        date
        country
        bookNowUrl
        city
        coordinates {
          latitude
          longitude
        }
        profile {
          name
          owner
          type
        }
        startDate
        endDate
        state
        uri
        userId
        visibility
      }
    }
  }
`

// export const LIST_EVENTS = /* GraphQL */ `
//   query listEvent($limit: Int, $nextToken: String) {
//     listEvent(limit: $limit, nextToken: $nextToken) {
//       count
//       nextToken
//       items {
//         city
//         id
//         image
//         bookNowUrl
//         coordinates {
//           latitude
//           longitude
//         }
//         country
//         date
//         eventLocation
//         eventName
//         profile {
//           name
//           owner
//           type
//         }
//         state
//         uri
//         userId
//       }
//     }
//   }
// `;
