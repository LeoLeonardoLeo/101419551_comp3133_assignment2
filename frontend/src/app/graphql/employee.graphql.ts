import { gql } from 'apollo-angular';

export const GET_ALL_EMPLOYEES = gql`
  query GetAllEmployees {
    getAllEmployees {
      id
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      department
    }
  }
`;

export const GET_EMPLOYEE_BY_ID = gql`
  query GetEmployeeById($id: ID!) {
    getEmployeeById(id: $id) {
      id
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      department
    }
  }
`;

export const SEARCH_EMPLOYEE_DEPARTMENT = gql`
  query SearchEmployeeDepartment($department: String!) {
    searchEmployeeDepartment(department: $department) {
      id
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      department
    }
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee(
    $first_name: String!
    $last_name: String!
    $email: String!
    $gender: String!
    $designation: String!
    $salary: Float!
    $date_of_joining: String!
    $department: String!
  ) {
    addEmployee(
      first_name: $first_name
      last_name: $last_name
      email: $email
      gender: $gender
      designation: $designation
      salary: $salary
      date_of_joining: $date_of_joining
      department: $department
    ) {
      id
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      department
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: ID!
    $first_name: String
    $last_name: String
    $email: String
    $gender: String
    $designation: String
    $salary: Float  
    $date_of_joining: String
    $department: String
  ) {
    updateEmployee(
      id: $id
      first_name: $first_name
      last_name: $last_name
      email: $email
      gender: $gender
      designation: $designation
      salary: $salary
      date_of_joining: $date_of_joining
      department: $department
    ) {
      id
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      department
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;