import { projects } from '@/data/projects';
import Image from 'next/image';

export const metadata = {
  title: 'Projects | Ibrahim Adeniyi',
  description: "A collection of projects I've worked on.",
};

export default function ProjectsPage() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="mb-8">Projects</h1>
      <p className="text-lg text-lightText mb-12">
        Here are some of my favorite projects that I've worked on.
      </p>

      {featuredProjects.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6">Featured</h2>
          <div className="space-y-8">
            {featuredProjects.map((project) => (
              <div
                key={project.title}
                className="border-b border-lightText/10 pb-8 last:border-0"
              >
                <div className="mb-2">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white no-underline hover:text-lightText font-semibold text-xl"
                    >
                      {project.title}
                    </a>
                  ) : (
                    <h3 className="text-white font-semibold text-xl">
                      {project.title}
                    </h3>
                  )}
                </div>
                <p className="text-lightText mb-4">{project.description}</p>
                {project.tech && project.tech.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs text-lightText/70 bg-lightText/10 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-4">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-lightText hover:text-white transition-colors no-underline"
                    >
                      <Image
                        src="/static/icons/link.svg"
                        width={18}
                        height={18}
                        alt="Link"
                      />
                      <span className="text-sm">Visit</span>
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-lightText hover:text-white transition-colors no-underline"
                    >
                      <Image
                        src="/static/icons/github.svg"
                        width={18}
                        height={18}
                        alt="GitHub"
                      />
                      <span className="text-sm">GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {otherProjects.length > 0 && (
        <section>
          <h2 className="mb-6">Other Projects</h2>
          <div className="space-y-6">
            {otherProjects.map((project) => (
              <div
                key={project.title}
                className="border-b border-lightText/10 pb-6 last:border-0"
              >
                <div className="mb-2">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white no-underline hover:text-lightText font-medium"
                    >
                      {project.title}
                    </a>
                  ) : (
                    <span className="text-white font-medium">
                      {project.title}
                    </span>
                  )}
                </div>
                <p className="text-lightText text-sm">{project.description}</p>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-lightText hover:text-white text-sm no-underline mt-2 inline-block"
                  >
                    Visit →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

