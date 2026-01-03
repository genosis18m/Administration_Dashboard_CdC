import { PrismaClient } from '../generated/client'

// @ts-ignore
const prisma = new PrismaClient()

async function main() {
  // Create Admin User
  const user = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: 'admin', // In production, hash the password
      role: 'ADMIN'
    }
  })
  console.log('Created user:', user)

  // Create Categories
  const electronics = await prisma.category.create({
    data: { name: 'Electronics' }
  })
  const clothing = await prisma.category.create({
    data: { name: 'Clothing' }
  })
  const home = await prisma.category.create({
    data: { name: 'Home' }
  })
  console.log('Created categories')

  // Create Dummy Products
  const products = [
    // Electronics (7)
    { name: 'iPhone 15', price: 999.99, stock: 10, categoryId: electronics.id },
    { name: 'MacBook Pro 16"', price: 2499.99, stock: 5, categoryId: electronics.id },
    { name: 'Samsung Galaxy S24', price: 799.99, stock: 15, categoryId: electronics.id },
    { name: 'Sony WH-1000XM5 Headphones', price: 349.99, stock: 20, categoryId: electronics.id },
    { name: 'Dell XPS 13 Laptop', price: 1299.99, stock: 8, categoryId: electronics.id },
    { name: 'Apple Watch Series 9', price: 399.99, stock: 12, categoryId: electronics.id },
    { name: 'Nintendo Switch OLED', price: 349.99, stock: 25, categoryId: electronics.id },

    // Clothing (7)
    { name: 'Nike Air Max Sneakers', price: 129.99, stock: 30, categoryId: clothing.id },
    { name: 'Levi\'s 501 Jeans', price: 89.99, stock: 40, categoryId: clothing.id },
    { name: 'Adidas Ultraboost Shoes', price: 179.99, stock: 20, categoryId: clothing.id },
    { name: 'H&M Cotton T-Shirt', price: 19.99, stock: 50, categoryId: clothing.id },
    { name: 'Zara Wool Coat', price: 199.99, stock: 15, categoryId: clothing.id },
    { name: 'Uniqlo Down Jacket', price: 149.99, stock: 25, categoryId: clothing.id },
    { name: 'Gucci Leather Belt', price: 299.99, stock: 10, categoryId: clothing.id },

    // Home (6)
    { name: 'IKEA Billy Bookcase', price: 79.99, stock: 18, categoryId: home.id },
    { name: 'Dyson V15 Vacuum', price: 699.99, stock: 7, categoryId: home.id },
    { name: 'West Elm Sofa', price: 1299.99, stock: 3, categoryId: home.id },
    { name: 'Philips Hue Smart Bulb', price: 49.99, stock: 35, categoryId: home.id },
    { name: 'Cuisinart Coffee Maker', price: 99.99, stock: 22, categoryId: home.id },
    { name: 'Tempur-Pedic Mattress', price: 1999.99, stock: 4, categoryId: home.id }
  ]

  for (const product of products) {
    await prisma.product.create({ data: product })
  }
  console.log('Created 20 products')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })