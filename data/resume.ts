export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string[];
  tech?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate: string;
}

export interface ResumeData {
  name: string;
  title: string;
  email: string;
  location?: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
}

export const resumeData: ResumeData = {
  name: 'Ibrahim Adeniyi',
  title: 'Senior Software Developer',
  email: 'adeniyiib360@gmail.com',
  location: 'Remote',
  experience: [
    {
      company: 'Snjallgögn',
      role: 'Senior Software Developer',
      startDate: 'June 2021',
      description: [
        'Built and maintained multiple production applications using React, TypeScript, and Node.js',
        'Developed AI-powered customer service automation tools',
        'Led development of developer tooling and context suite applications',
        'Collaborated with cross-functional teams to deliver scalable solutions',
      ],
      tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'AI', 'WebSockets'],
    },
    {
      company: 'Conectar',
      role: 'Fullstack Engineer',
      startDate: 'November 2020',
      endDate: 'June 2021',
      description: [
        'Led a team developing a video streaming web application with Next.js, AWS Lambda, AWS AppSync, and DynamoDB',
        'Designed and built the backend of the application',
        'Worked in a team to develop a videoconferencing learning platform with React and TypeScript',
        'Led and oversaw the development of whiteboard features to improve the teaching and learning process',
        'Implemented real-time chats and notifications using WebSockets and events',
      ],
      tech: ['Next.js', 'React', 'TypeScript', 'AWS Lambda', 'AWS AppSync', 'DynamoDB', 'WebSockets'],
    },
    {
      company: 'Foodlocker',
      role: 'Fullstack Engineer',
      startDate: 'March 2020',
      endDate: 'December 2020',
      description: [
        'Worked in a team of 3 to deliver a project management application that upscaled production capacity of smallholder farmers by 250%',
        'Led the team in overhauling the application\'s UI design, serving thousands of customers faster with modern web technologies',
        'Monitored loading speed and ensured the application scored above 90% consistently on Google Lighthouse',
        'Improved performance of the company\'s e-commerce platform by over 60% through code optimization and serving static assets in web-optimized formats',
      ],
      tech: ['React', 'JavaScript', 'Node.js', 'Performance Optimization'],
    },
    {
      company: 'BuildLabs',
      role: 'FullStack Developer',
      startDate: '2018',
      endDate: '2020',
      description: [
        'Worked in a team of two to develop a service listing platform employing AGILE methodologies',
        'Integrated payment processor (Paystack) for transactions on the service listing web application',
        'Orchestrated efficient large-scale software deployments, including testing features and correcting code',
        'Discussed project progress with senior engineers and managers, collected feedback and directly addressed concerns',
        'Delivered performance-driven and user-centric websites that met all business requirements',
      ],
      tech: ['React', 'Node.js', 'JavaScript', 'Paystack', 'AGILE'],
    },
  ],
  education: [
    {
      institution: 'University of Abuja',
      degree: 'Master of Science',
      field: 'Computer Science',
      startDate: '2020',
      endDate: '2022',
    },
    {
      institution: 'University of Ibadan',
      degree: 'Bachelor of Science',
      field: 'Human Physiology',
      startDate: '2014',
      endDate: '2018',
    },
  ],
  skills: [
    'HTML',
    'CSS',
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Git',
    'Node.js',
    'Express',
    'GraphQL',
    'Apollo',
    'AWS',
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'Kafka',
  ],
};

