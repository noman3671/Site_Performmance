export const LIST_BANNER = /* GraphQL */ `
  query listBannerQuery($filter: listBannerFilterInput) {
    listBanner(filter: $filter) {
      id
      contentHead
      contentDescription
      contentBtn
      video
      image
      btnUrl
      overlayColor
      position
      type
      createdAt
      updatedAt
    }
  }
`;