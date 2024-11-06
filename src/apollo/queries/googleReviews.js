
export const LIST_GOOGLE_REVIEWS = /* GraphQL */`
  query ListGoogleReviewsQuery {
    listGoogleReviews {
      reviews {
        author_name
        author_url
        language
        original_language
        profile_photo_url
        rating
        relative_time_description
        text
        time
        translated
      }
    }
  }
`;