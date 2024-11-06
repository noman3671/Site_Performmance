export const LIST_INSTAGRAM_POSTS = /* GraphQL */ `
  query ListInstagramPostsQuery {
    listInstagramPost {
      id
      follows_count
      followers_count
      media_count
      media {
        data {
          caption
          id
          mediaType
          mediaUrl
          timestamp
          permalink
        }
        paging {
          next
          cursors {
            before
            after
          }
        }
      }
    }
  }
`;
