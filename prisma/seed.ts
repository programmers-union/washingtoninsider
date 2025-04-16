import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

// 1) Initialize Prisma Client
const prisma = new PrismaClient()

async function main() {
  try {
   
    await prisma.card.deleteMany({})
    await prisma.category.deleteMany({})

    
    const filePath = path.join(process.cwd(), 'src', 'data', 'categories.json')
    const rawData = fs.readFileSync(filePath, 'utf-8')
    const data = JSON.parse(rawData)

    // Loop over each category key in the JSON object
    for (const key of Object.keys(data)) {
      const categoryData = data[key]

      console.log(`Seeding category: ${categoryData.categorySlug}`)

      // Create a Category with nested Card[] records
      await prisma.category.create({
        data: {
          id: categoryData.id,

          categorySlug:      categoryData.categorySlug,
          mainTitle:         categoryData.mainTitle,
          postCount:         categoryData.postCount,

          // Nested create for Cards
          cards: {
            create: categoryData.cards.map((card: any) => ({
              image:            card.image,
              cardCategory:     card.category,   
              title:            card.title,
              slug:             card.slug,
              author:           card.author,
              date:             card.date,
              excerpt:          card.excerpt,
              content1:         card.content1,
              detailSubtitle:   card.detailSubtitle,
              detailGraphImage: card.detailGraphImage,
              content2:         card.content2
            })),
          },
        },
      })
    }

    console.log('Seeding complete!')
  } catch (error) {
    console.error('Error while seeding:', error)
    process.exit(1)
  } finally {
    //  Disconnect Prisma
    await prisma.$disconnect()
  }
}

// Run the seeding
main()
