// import URI from './Uri'
// import API from './Api'
// import axios from 'axios'
// import RNFetchBlob from 'rn-fetch-blob'



// var Email = "felisitusbryan@yahoo.com";
// let query =
//     `query {
//       customers(email:"${Email}"){
//         names
//         phoneNumber
//         email
//         city
//         gender
//       }
//     }`
// fetch(URI.PROFILE_API, {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     },
//     body: JSON.stringify({ query })
// })
//     .then(response => {
//         return response.json()
//             .then((json) => {
//                 console.warn(`${JSON.stringify(json)}`)
//                 const dataCustomer = json.data.customers;
//                 this.setState({
//                     firstName: dataCustomer[0].names[0],
//                     lastName: dataCustomer[0].names[1],
//                     phoneNumber: dataCustomer[0].phoneNumber,
//                     email: dataCustomer[0].email,
//                     city: dataCustomer[0].city,
//                 })
//                 this.genderFunc(dataCustomer[0].gender)
//             })
//     })
//     .catch(error => console.error(`'Error: ' + ${JSON.stringify(error)}`))
//   }