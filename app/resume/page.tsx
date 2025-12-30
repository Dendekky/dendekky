import { resumeData } from '@/data/resume';
import { contact } from '@/data/config';

export const metadata = {
  title: 'Resume',
  description: 'Professional experience, skills, and education of Ibrahim Adeniyi - Senior Software Developer with 7+ years of experience.',
  openGraph: {
    title: 'Resume | Ibrahim Adeniyi',
    description: 'Professional experience and skills.',
  },
};

export default function ResumePage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="mb-2">{resumeData.name}</h1>
        <p className="text-lg text-lightText mb-4">{resumeData.title}</p>
        <div className="flex flex-col gap-2 text-lightText">
          <a
            href={`mailto:${resumeData.email}`}
            className="text-white no-underline hover:text-lightText"
          >
            {resumeData.email}
          </a>
          {resumeData.location && <span>{resumeData.location}</span>}
        </div>
      </div>

      <section className="mb-12">
        <h2 className="mb-6">Experience</h2>
        <div className="space-y-8">
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="border-b border-lightText/10 pb-8 last:border-0">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                <div>
                  <h3 className="mb-1">{exp.role}</h3>
                  <p className="text-white font-medium">{exp.company}</p>
                </div>
                <div className="text-lightText text-sm mt-1 md:mt-0">
                  {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : '- Present'}
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                {exp.description.map((desc, i) => (
                  <li key={i} className="text-lightText">
                    {desc}
                  </li>
                ))}
              </ul>
              {exp.tech && exp.tech.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs text-lightText/70 bg-lightText/10 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6">Education</h2>
        <div className="space-y-6">
          {resumeData.education.map((edu, index) => (
            <div key={index} className="border-b border-lightText/10 pb-6 last:border-0">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="mb-1">{edu.degree}</h3>
                  {edu.field && (
                    <p className="text-lightText text-sm mb-1">{edu.field}</p>
                  )}
                  <p className="text-white font-medium">{edu.institution}</p>
                </div>
                <div className="text-lightText text-sm mt-1 md:mt-0">
                  {edu.startDate} - {edu.endDate}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {resumeData.skills.map((skill) => (
            <span
              key={skill}
              className="text-sm text-lightText bg-lightText/10 px-3 py-1 rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section>
        <a
          href={`mailto:${contact.email}`}
          className="text-white no-underline hover:text-lightText inline-block"
        >
          Get in touch →
        </a>
      </section>
    </div>
  );
}

