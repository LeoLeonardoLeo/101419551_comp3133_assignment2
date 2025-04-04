const Employee = require('./models/Employee')
const User = require('./models/user')

const resolvers ={
    Query:{
        login: async (_, { username, password }) =>{
            //find by username, match password with exsiting password, then return the user
            try{
                //if empty
                if(!username || !password){
                    throw new Error("Fields required")
                }

                const loggedInUser = await User.findOne({username})

                if (!loggedInUser || loggedInUser.password !== password){
                    throw new Error("Wrong username or password")
                }

                var message = `login successful hello, ", ${loggedInUser.username}`
                return message
                
            }
            catch(error){
                console.log("Error logging in")
                throw new Error(error.message)
            }
        },

        getAllEmployees: async () =>{
            try{
                return await Employee.find()
            }
            catch(error){
                console.log("Error getting all employees")
                throw new Error(error.message)
            }
        },

        getEmployeeById: async (_, { id }) =>{
            try{
                if(!id){
                    throw new Error("Employee ID cannot be empty")
                }
                
                const employee = await Employee.findById(id)
                
                if(!employee){
                    throw new Error("Employee could not be found")
                }
                return employee
            }
            catch(error){
                console.log("Error getting by id")
                throw new Error(error.message)
            }
        },

        searchEmployeeDepartment: async (_, { department }) => {
            try{
                if (!department) {
                    throw new Error("Department name is required.");
                }

                const employees = await Employee.find({ department });

                if (employees.length === 0) {
                    throw new Error(`No employees found in the ${department} department.`);
                }

                return employees;
            }
            catch(error){
                console.log("Error getting employee by department")
                throw new Error(error.message)
            }
        }
    },

    Mutation:{
        signUp: async (_, { username, email, password }) => {
            try{
                if (!username || !email || !password) {
                    throw new Error("Username, email, and password are required.");
                }

                const doesUserExist= await User.findOne({username})
                if (doesUserExist){
                    throw new Error("Username already exists")
                }
        
                const newUser = new User({
                    username,
                    email,
                    password
                });
        
                const signUp = await newUser.save();
                console.log("user signed up");
                return signUp;

            } catch (error) {
                console.log("error signing up");
                throw new Error(error.message); 
            }
        },
        

        addEmployee: async (_, {first_name, last_name, email, gender, designation, salary, date_of_joining, department}) =>{
            try{
                if (!first_name || !last_name || !email || !gender || !designation || !salary || !date_of_joining || !department) {
                    throw new Error("Must fill all fields");
                }

                if (salary < 1000.00){
                    throw new Error("Salary must be $1000 or more") 
                }

                const newEmployee = new Employee({
                    first_name, last_name,
                    email,
                    gender,
                    designation,
                    salary,
                    date_of_joining,
                    department
                })

                const emp = await newEmployee.save()
                console.log("employee created")
                return emp
            }
            catch(error){
                console.log("error saving employee", error)
                throw new Error("couldnt save")
            }
        },

        updateEmployee: async (_, {id, first_name, last_name, email, gender, designation, salary, date_of_joining, department}) =>{
            try{
            const findEmp = await Employee.findById(id)

            if(!findEmp){
                return null
            }
            if (first_name) findEmp.first_name = first_name
            if (last_name) findEmp.last_name = last_name
            if (email) findEmp.email = email
            if (gender) findEmp.gender = gender
            if (designation) findEmp.designation = designation
            if (salary) findEmp.salary = salary
            if (date_of_joining) findEmp.date_of_joining = date_of_joining
            if (department) findEmp.department = department

            return await findEmp.save()
            }
            catch(error){
                console.log("could not update employee")
                throw new Error(error.message)  
            }
        },
        
        deleteEmployee: async (_, {id}) =>{
            try{
                if (!id){
                    throw new Error("Employee ID must be added")
                }
                
                const emp = await Employee.findById(id)
                if (!emp){
                    return null
                }

                await emp.deleteOne({_id: id})
                return "employee deleted"

            }
            catch(error){
                console.log("error deleteing employee")
                throw new Error(error.message)
            } 
        }
    }
}


module.exports = resolvers
