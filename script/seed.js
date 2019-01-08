'use strict'

const db = require('../server/db')
const {User, Product, Size} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  const products = await Promise.all([
    Product.create({model: '700', brand: 'Yeezy', price: 300}),
    Product.create({model: '1', brand: 'Jordan', price: 180}),
    Product.create({model: '5', brand: 'Jordan', price: 200})
  ])
  const sizes = await Promise.all([
    Size.create({length: 6}),
    Size.create({length: 7}),
    Size.create({length: 8}),
    Size.create({length: 9}),
    Size.create({length: 10}),
    Size.create({length: 11}),
    Size.create({length: 12}),
    Size.create({length: 13}),
    Size.create({length: 14})
  ])
  const [pSeven, pOne, pFive] = products
  const [
    six,
    seven,
    eight,
    nine,
    ten,
    eleven,
    twelve,
    thirteen,
    fourteen
  ] = sizes
  await Promise.all([pSeven.setSizes(six), pOne.setSizes([eight, nine])])
  //pSeven.setSizes(six)
  console.log('pseven', pSeven)
  console.log('six', six)
  // console.log(products, '<<PRODUCTS')
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
