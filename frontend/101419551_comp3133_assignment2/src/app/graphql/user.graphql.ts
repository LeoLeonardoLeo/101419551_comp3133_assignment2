import { gql } from 'apollo-angular';

export const LOGIN = gql`
  query Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`

export const SIGNUP = gql`
  mutation SignUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`

