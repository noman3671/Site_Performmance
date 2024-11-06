import { gql } from "@apollo/client";

export const CHECK_EMAIL_EXISTENCE = gql`
  query IsEmailExistQuery($email: String!) {
    isEmailExist(email: $email)
  }
`;