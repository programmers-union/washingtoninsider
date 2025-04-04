// src/app/components/Projects/Projects.tsx
import Image from 'next/image';
import Link from 'next/link';
import styles from './Projects.module.css';
import prisma from '@/lib/db'; // <-- Prisma client

const Projects = async () => {
  // Fetch the specific category by ID (category3 corresponds to ID: 3)
  const projectCategory = await prisma.category.findUnique({
    where: { id: 3 },
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
      <h2 className={styles['project-section-title']}>{projectCategory.mainTitle}</h2>
      <div className={styles['project-section-grid']}>
        {projectCards.map((project, index) => {
          const color = colorMapping[project.title] || 'default';

          return (
            <Link
              key={index}
              href={`/${projectCategory.categorySlug}/${project.slug}`}
              className={styles['project-section-card']}
            >
              <div className={styles['project-section-image']}>
                <Image
                  className={styles['project-section-image-img']}
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className={styles['project-section-overlay']}>
                  <h3 className={styles['project-section-overlay-title']}>
                    {project.title}
                  </h3>
                </div>
              </div>
              <div
                className={`${styles['project-section-description']} ${styles[`project-section-${color}`]}`}
              >
                <p>{project.excerpt}</p>
                <button>Explore this Project →</button>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
