// src/app/components/Projects/Projects.tsx
import Image from 'next/image';
import Link from 'next/link';
import styles from './Projects.module.css';
import prisma from '@/lib/db'; // <-- Prisma client

const Projects = async () => {
  // Fetch the specific category by ID (category3 corresponds to ID: 8)
  const projectCategory = await prisma.category.findUnique({
    where: { id: 8 },
    include: { cards: true },
  });

  if (!projectCategory) return null;

  const projectCards = projectCategory.cards.slice(0, 4);

  const colorMapping: Record<string, string> = {
    'Africa Focus': 'orange',
    'LATAM Focus': 'green',
    '2024 Elections': 'blue',
    'Investigating Russia and the War in Ukraine': 'darkblue',
  };

  return (
    <section className={styles['project-section']}>
      <h2 className={styles['project-section-title']}>
        {projectCategory.mainTitle}
      </h2>
      <div className={styles['project-section-grid']}>
        {projectCards.map((project, index) => {
          const color = colorMapping[project.title] || 'default';

          // Safely handle 'project.content1' using nullish coalescing (??)
          const contentToDisplay = project.content1 ?? '';
          const truncatedContent =
            contentToDisplay.length > 500
              ? contentToDisplay.substring(0, 500) + '...'
              : contentToDisplay;

          return (
            <Link
              key={index}
              href={`/${projectCategory.categorySlug}/${project.slug}`}
              className={styles['project-section-card']}
              title={project.title}
            >
              <div className={styles['project-section-image']}>
                <Image
                  className={styles['project-section-image-img']}
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={200}
                  loading='lazy'
                />
                <div className={styles['project-section-overlay']}>
                  <h3 className={styles['project-section-overlay-title']}>
                    {project.detailSubtitle}
                  </h3>
                </div>
              </div>
              <div
                className={`${styles['project-section-description']} ${styles[`project-section-${color}`]}`}
              >
                <p>{truncatedContent}</p>
                {/* Replace the button with a styled span */}
                <span className={styles['explore-button']}>
                  Explore this news →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
