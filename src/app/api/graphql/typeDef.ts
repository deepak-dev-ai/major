import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    loginUser(userCred: String!, password: String!): Boolean
    currentUser: User
    getAllUsers: [User]
    getAllProducts: [Product]
    getProductById(id: String!): Product
  }
  type Mutation {
    logoutUser: Boolean
    createUser(
      name: String!
      email: String!
      password: String!
      username: String!
      role: String!
    ): User
    createSale(id: String!, quantity: Int!): Boolean
    updateUserRole(userId: String!, role: String!): Boolean
    updateUserProfile(
      userId: String
      name: String
      email: String
      username: String
      avatar: String
    ): Boolean

    addProduct(
      title: String!
      description: String!
      category: String!
      image: String!
      price: Float!
      stock: Int!
    ): Product
  }
  type Sale {
    id: String
    productId: String
    quantity: Int
    createdAt: String
  }
  type Product {
    id: String
    title: String
    description: String
    category: String
    image: String
    price: Float
    stock: Int
    sale: [Sale]
  }

  type User {
    id: String
    name: String
    email: String
    password: String
    username: String
    avatar: String
    role: String
  }
`;
export default typeDefs;
