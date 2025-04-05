// prisma/seed.ts
console.log("DATABASE_URL from seed.ts:", process.env.DATABASE_URL)
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

    // 4) Loop over each category key in the JSON object
    for (const key of Object.keys(data)) {
      const categoryData = data[key]

      console.log(`Seeding category: ${categoryData.categorySlug}`)

      // 5) Create a Category with nested Card[] records
      await prisma.category.create({
        data: {
          // If you want to set Category.id from JSON, include it here:
          id: categoryData.id,

          categorySlug:      categoryData.categorySlug,
          mainTitle:         categoryData.mainTitle,
          searchPlaceholder: categoryData.searchPlaceholder,
          postCount:         categoryData.postCount,

          // Nested create for Cards
          cards: {
            create: categoryData.cards.map((card: any) => ({
              image:            card.image,
              cardCategory:     card.category,   // JSON "category" -> DB "cardCategory"
              title:            card.title,
              slug:             card.slug,
              author:           card.author,
              date:             card.date,
              excerpt:          card.excerpt,
              content1:         card.content1,
              content2:         card.content2,
              detailSubtitle:   card.detailSubtitle,
              detailGraphImage: card.detailGraphImage,
              chapterLabel:     card.chapterLabel,
              chapters:         card.chapters || [],
              more:             card.more,
              variant:          card.variant,
              type:             card.type,
              description:      card.description,
              cta:              card.cta,
              // For jobs, store it as JSON if present
              jobs: card.jobs ? card.jobs : undefined,
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
    // 6) Disconnect Prisma
    await prisma.$disconnect()
  }
}

// 7) Run the seeding
main()
