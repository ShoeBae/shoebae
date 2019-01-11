'use strict'

const db = require('../server/db')
const {User, Product, Size} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'admin', password: '123', isAdmin: 'true'}),
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const sizes = await Promise.all([
    Size.create({length: 6}),
    Size.create({length: 7}),
    Size.create({length: 8}),
    Size.create({length: 9}),
    Size.create({length: 10}),
    Size.create({length: 11}),
    Size.create({length: 12}),
    Size.create({length: 13})
  ])

  const products = await Promise.all([
    Product.create({
      model: 'Continental 80',
      imageUrl: '/assets/shoes/adidas-continental80-70.jpg',
      color: 'pink',
      brand: 'Adidas',
      category: 'sneaker',
      price: 70
    }),
    Product.create({
      model: 'Gazelle Superstar',
      imageUrl: '/assets/shoes/adidas-gazellesuperstar-65.jpg',
      color: 'blue',
      brand: 'Adidas',
      category: 'sneaker',
      price: 65
    }),
    Product.create({
      model: 'Stan Smith',
      imageUrl: '/assets/shoes/adidas-stansmith-105.jpg',
      color: 'white',
      brand: 'Adidas',
      category: 'sneaker',
      price: 1145
    }),
    Product.create({
      model: 'Speed Sneaker',
      imageUrl: '/assets/shoes/balenciaga-speedsneakers-750.jpg',
      color: 'red',
      brand: 'Balenciaga',
      category: 'sneaker',
      price: 750
    }),
    Product.create({
      model: 'Chuck 70 Hi Top',
      imageUrl: '/assets/shoes/converse-chuck70Hi-70.jpg',
      color: 'white',
      brand: 'Converse',
      category: 'sneaker',
      price: 70
    }),
    Product.create({
      model: 'Crocodile Embossed Ankle Boots',
      imageUrl: '/assets/shoes/fendi-crocodileembossedankleboots-1550.jpg',
      color: 'yellow',
      brand: 'Fendi',
      category: 'boot',
      price: 1550
    }),
    Product.create({
      model: 'Classic Lace-Up',
      imageUrl: '/assets/shoes/ferragamo-classiclaceup-295.jpg',
      color: 'black',
      brand: 'Ferragamo',
      category: 'dress',
      price: 295
    }),
    Product.create({
      model: 'Ace Sneaker',
      imageUrl: '/assets/shoes/gucci-acesneaker-580.jpg',
      color: 'white',
      brand: 'Gucci',
      category: 'sneaker',
      price: 295
    }),
    Product.create({
      model: 'Dragon Embroidered Lace-Up',
      imageUrl: '/assets/shoes/dragonembroideredlaceupshoes-gucci-1790.jpg',
      color: 'black',
      brand: 'Gucci',
      category: 'dress',
      price: 1790
    }),
    Product.create({
      model: 'Stefan Lace-Up',
      imageUrl: '/assets/shoes/jimmychoo-stefanlaceupshoes-538.jpg',
      color: 'black',
      brand: 'Jimmy Choo',
      category: 'dress',
      price: 538
    }),
    Product.create({
      model: 'Vree T-Bar Pumps',
      imageUrl: '/assets/shoes/manoloblahnik-vreet-barpumps-820.jpg',
      color: 'purple',
      brand: 'Manolo Blahnik',
      category: 'dress',
      price: 820
    }),
    Product.create({
      model: 'Mary Jane 135 Platform Pumps',
      imageUrl: '/assets/shoes/miumiu-maryjane135platformpumps-375.jpg',
      color: 'purple',
      brand: 'Miu Miu',
      category: 'dress',
      price: 375
    }),
    Product.create({
      model: '574',
      imageUrl: '/assets/shoes/newbalance-574sneakers-100.jpg',
      color: 'pink',
      brand: 'New Balance',
      category: 'sneaker',
      price: 100
    }),
    Product.create({
      model: 'Jordan 1 Retro Hi Top',
      imageUrl: '/assets/shoes/nike-airjordan1retrohitop-145.jpg',
      color: 'blue',
      brand: 'Nike',
      category: 'sneaker',
      price: 145
    }),
    Product.create({
      model: 'Cortez Trainers',
      imageUrl: '/assets/shoes/nike-corteztrainers-65.jpg',
      color: 'white',
      brand: 'Nike',
      category: 'sneaker',
      price: 65
    }),
    Product.create({
      model: 'OFF-WHITE x Nike Blazer Mid',
      imageUrl: '/assets/shoes/offwhite-2160-nikeblazermid.jpg',
      color: 'white',
      brand: 'Off White',
      category: 'sneaker',
      price: 2160
    }),
    Product.create({
      model: 'OFF-WHITE x Nike Air Vapormax Flyknit',
      imageUrl: '/assets/shoes/offwhite-airvapormaxflyknit-250.jpg',
      color: 'white',
      brand: 'Off White',
      category: 'sneaker',
      price: 250
    }),
    Product.create({
      model: 'OFF-WHITE x Converse Chuck 70 Hi Top',
      imageUrl: '/assets/shoes/offwhite-chuck70hitop-1250.jpg',
      color: 'white',
      brand: 'Off White',
      category: 'sneaker',
      price: 1250
    }),
    Product.create({
      model: 'OFF-WHITE Scarf Knot Sandal',
      imageUrl: '/assets/shoes/offwhite-scarfknotsandal-500.jpg',
      color: 'green',
      brand: 'Off White',
      category: 'dress',
      price: 500
    }),
    Product.create({
      model: 'OFF-WHITE Industrial Hi Top Trainers',
      imageUrl: '/assets/shoes/offwhite-whiteindustrialhitoptrainers-350.jpg',
      color: 'white',
      brand: 'Off White',
      category: 'sneaker',
      price: 350
    }),
    Product.create({
      model: 'Wyatt 40 Harnness Boots',
      imageUrl: '/assets/shoes/wyatt40harnessboots-saintlaurent-1145.jpg',
      color: 'black',
      brand: 'Saint Laurent',
      category: 'boot',
      price: 1145
    }),
    Product.create({
      model: 'Garavani Rockstud Booties',
      imageUrl: '/assets/shoes/valentino-garavanirockstudbooties-1125.jpg',
      color: 'blue',
      brand: 'Valentino',
      category: 'dress',
      price: 1125
    })
  ])

  const [one, two, three] = products
  const [six, seven, eight, nine, ten, eleven, twelve, thirteen] = sizes

  await one.addSize(six, {through: {quantity: 10}})
  await one.addSize(seven, {through: {quantity: 10}})

  await two.addSize(eight, {through: {quantity: 10}})
  await two.addSize(nine, {through: {quantity: 10}})
  await two.addSize(ten, {through: {quantity: 10}})
  await two.addSize(eleven, {through: {quantity: 10}})
  await two.addSize(twelve, {through: {quantity: 10}})
  await two.addSize(thirteen, {through: {quantity: 10}})
  await two.addSize(seven, {through: {quantity: 10}})

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
