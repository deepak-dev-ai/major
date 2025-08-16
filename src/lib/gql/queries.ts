export const LOGIN_USER = `
query LOGIN_USER($userCred: String!, $password: String!) {
  loginUser(userCred: $userCred, password: $password)
}
`;
export const GET_ALL_USERS = `
query GetAllUsers {
  getAllUsers {
    name
    email
    username
    role
    avatar
    id
  }
}
`;
export const GET_ALL_PRODUCTS = `
query GetAllProducts {
  getAllProducts {
    id
    title
    description
    category
    image
    price
    stock
  }
}
`;
export const GET_PRODUCT_BY_ID = `
query GetProductById($id: String!) {
  getProductById(id: $id) {
    id
    title
    description
    category
    image
    price
    stock
    sale {
      id
      productId
      quantity
      createdAt
    }
  }
}
`;
