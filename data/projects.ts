export interface Project {
  title: string;
  description: string;
  link?: string;
  github?: string;
  featured?: boolean;
  tech?: string[];
}

export const projects: Project[] = [
  {
    title: 'GraphQL Typings CodeGen',
    description:
      'A web application to generate the types and interfaces in TypeScript for a GraphQL server.',
    link: 'https://graphqlcodegen.com/',
    github: 'https://github.com/Dendekky/graphql-codegen',
    featured: true,
    tech: ['TypeScript', 'GraphQL', 'Next.js'],
  },
  {
    title: 'Snjallgögn AI Agents',
    description:
      'A smart agent that helps with customer service automation, inquiries resolution, and other things. Exists as a chatbot, and an installable package.',
    link: 'https://www.snjallgogn.is/integrations',
    featured: true,
    tech: ['AI', 'React', 'Node.js'],
  },
  {
    title: 'Snjallgögn Context Suite',
    description: "Snjallgögn's context suite application",
    link: 'https://app.contextsuite.com',
    featured: true,
    tech: ['React', 'GraphQL', 'TypeScript'],
  },
  {
    title: 'Snjallgögn GraphQL Playground',
    description:
      'A beautiful feature-rich GraphQL Client IDE for Quick Lookup Graph API.',
    link: 'https://playground.contextsuite.com/',
    tech: ['GraphQL', 'React', 'TypeScript'],
  },
  {
    title: 'Snjallgögn Self Service Portal',
    description:
      "Snjallgögn's self-service dashboard for admins and provisioning",
    link: 'https://admin.contextsuite.com',
    tech: ['React', 'GraphQL', 'TypeScript'],
  },
  {
    title: 'Klic Game Streaming Platform',
    description: 'A gameplay/events video streaming application',
    link: 'https://klic.gg',
    tech: ['React', 'Node.js', 'WebRTC'],
  },
  {
    title: 'Foodlocker',
    description: 'Online Food Store',
    link: 'https://www.foodlocker.com.ng/',
    tech: ['React', 'Node.js', 'MongoDB'],
  },
  {
    title: 'Foodlocker Africa',
    description:
      'Farming-as-a-Service Platform, Farm Management & Market Access',
    link: 'https://foodlocker.africa/',
    tech: ['React', 'Node.js', 'PostgreSQL'],
  },
];

