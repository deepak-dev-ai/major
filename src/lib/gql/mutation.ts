export const CREATE_USER = `
mutation CreateUser($name: String!, $email: String!, $password: String!, $username: String!, $role: String!) {
  createUser(name: $name, email: $email, password: $password, username: $username, role: $role) {
    name
    email
    password
    username
    role
  }
}`;
export const CREATE_PRODUCT = `
mutation AddProduct($title: String!, $description: String!, $category: String!, $image: String!, $price: Float!, $stock: Int!) {
  addProduct(title: $title, description: $description, category: $category, image: $image, price: $price, stock: $stock) {
    id
    title
    description
    category
    image
    price
    stock
  }
}`;
export const CREATE_SALE = `
mutation CreateSale($id: String!, $quantity: Int!) {
  createSale(id: $id, quantity: $quantity)
}`;
