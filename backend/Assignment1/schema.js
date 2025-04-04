    const { gql } = require('apollo-server-express');

    const schema = gql`
        type User{
            id: ID!
            username: String!
            email: String!
            password: String!
            created_at: String
            updated_at: String
        }
        
        type Employee{
            id: ID!
            first_name: String!
            last_name: String!
            email: String!
            gender: String!
            designation: String!
            salary: Float!
            date_of_joining: String!
            department: String!
            employee_photo: String
            created_at: String
            updated_at: String
        }

        type Query{
            login(username: String!, password: String!): String
            getAllEmployees: [Employee]
            getEmployeeById(id: ID!): Employee
            searchEmployeeDepartment(designation: String, department: String): [Employee!]
        } 

        type Mutation{
            signUp(username: String!, email: String!, password: String!): User
            
            addEmployee(
                first_name: String!
                last_name: String!
                email: String!
                gender: String!
                designation: String!
                salary: Float!
                date_of_joining: String!
                department: String!
                employee_photo: String
            ): Employee
            
            updateEmployee(
                id: ID! 
                first_name: String
                last_name: String
                email: String
                gender: String
                designation: String
                salary: Float
                date_of_joining: String
                department: String
                employee_photo: String
            ): Employee
        
            deleteEmployee(id: ID!): String

        }
    `;

    module.exports = schema;