// Basic intent recognition for career chatbot

const intents = [
  {
    name: 'AI Career Pathways',
    keywords: [
      'career path', 'roadmap', 'how to become', 'step by step', 'ml engineer path', 'ai product manager path', 'data scientist path', 'ai career journey'
    ],
    response:
      `AI career pathways are journeys, not just destinations. For example, to become a Machine Learning Engineer: \n1. Learn Python and math basics.\n2. Study machine learning concepts (courses like Coursera ML by Andrew Ng).\n3. Build projects (Kaggle, GitHub).\n4. Apply for internships or junior roles.\n5. Continue learning and specialize.\n\nEveryone's path is different—I'm here to help you find yours. Would you like a roadmap for a specific AI role or advice on getting started?`
  },
  {
    name: 'Portfolio & Project Ideas',
    keywords: [
      'portfolio', 'project ideas', 'what projects', 'showcase', 'github projects', 'real world projects', 'build portfolio'
    ],
    response:
      `A great portfolio tells your story and shows your growth. Strong AI portfolios include projects like: \n- Predictive analytics (e.g., sales forecasting)\n- NLP chatbots\n- Image classification\n- AI-powered web apps\n- Open-source contributions\n\nI can help you brainstorm project ideas that match your interests and goals. Would you like suggestions tailored to your background?`
  },
  {
    name: 'Mentorship & Community',
    keywords: [
      'mentor', 'mentorship', 'community', 'networking group', 'find a mentor', 'ai community', 'slack group', 'discord', 'meet people'
    ],
    response:
      `Mentorship and community are key for growth and support. Connecting with others can open doors and provide encouragement. Join groups like Women in AI, Black in AI, AI Global, or online communities on Discord, Slack, and LinkedIn.\n\nIf you want help finding a mentor or joining a group, just ask! Would you like links to mentorship programs or communities?`
  },
  {
    name: 'Scholarships & Funding',
    keywords: [
      'scholarship', 'grant', 'funding', 'free course', 'discount', 'financial aid', 'affordable ai', 'pay for bootcamp'
    ],
    response:
      `Education should be accessible to everyone. There are scholarships and grants for AI learners—check Coursera, Udacity, DataCamp, and local universities for financial aid. Organizations like Women in Data Science and AI4ALL also offer scholarships.\n\nIf you need help applying or want to know about deadlines, let me know. Would you like a list of current opportunities?`
  },
  {
    name: 'Diversity & Inclusion',
    keywords: [
      'diversity', 'inclusion', 'women in ai', 'black in ai', 'underrepresented', 'support group', 'minority in tech'
    ],
    response:
      `Diversity in AI is growing, and your voice matters. Groups like Women in AI, Black in AI, and LatinX in AI offer support, mentorship, and events.\n\nIf you want to connect with a group or learn about diversity initiatives, I'm here to help. Would you like to connect or learn more?`
  },
  {
    name: 'AI Ethics & Responsible AI',
    keywords: [
      'ethics', 'responsible ai', 'fairness', 'bias', 'explainable ai', 'ethical ai', 'ai for good', 'trustworthy ai'
    ],
    response:
      `Ethical AI is critical for a better future. Learn about fairness, transparency, and responsible development through resources like Partnership on AI, AI Now Institute, and courses on ethical AI.\n\nIf you have questions about ethics or want to discuss real-world examples, just ask. Would you like resources or guidance on responsible AI?`
  },
  {
    name: 'Events & Conferences',
    keywords: [
      'conference', 'meetup', 'ai event', 'ai summit', 'ai expo', 'local event', 'virtual event', 'hackathon'
    ],
    response:
      `AI events and conferences are great for learning, networking, and inspiration. Look for NeurIPS, CVPR, AI Expo, Women in AI events, and local meetups.\n\nIf you want tips on making the most of events or finding local groups, I can help. Would you like info on upcoming events or how to find local meetups?`
  },
  {
    name: 'Continuous Learning',
    keywords: [
      'stay updated', 'latest ai', 'ai news', 'newsletter', 'research paper', 'continuous learning', 'keep learning', 'ai trends'
    ],
    response:
      `AI is always evolving—continuous learning keeps you ahead. Subscribe to newsletters (e.g., The Batch, Import AI), follow arXiv for new research, and join online communities.\n\nIf you want help building a learning routine or finding the best resources, just ask. Would you like a list of recommended newsletters or resources?`
  },
  {
    name: 'Career Crisis',
    keywords: [
      'losing my job', 'career crisis', 'ai is taking my job', 'laying people off', 'job is being automated',
      'scared', 'not needed anymore', 'jobs are safe from ai', 'switch careers fast', 'skills are outdated', 'new direction'
    ],
    response: "I'm truly sorry you're feeling this way. Career changes can be overwhelming, but you're not alone. Let's talk about your strengths and explore new opportunities together. Would you like a skill assessment, job suggestions, or just someone to listen?"
  },
  {
    name: 'AI Jobs',
    keywords: [
      'ai jobs', 'jobs can someone like me do', 'jobs without a tech degree', 'entry level', 'pay the most',
      'remote', 'don’t require coding', 'easiest ai job', 'fit my background', 'which states', 'hot career paths', 'growing fastest', 'safe from automation'
    ],
    response:
      `AI jobs span many roles, including Data Analyst, Machine Learning Engineer, AI Product Manager, Prompt Engineer, and AI Support Specialist.\n\n` +
      `Top states for AI jobs in the US include California, New York, Texas, Massachusetts, and Washington, with many remote opportunities available nationwide.\n\n` +
      `Hot and fast-growing AI career paths: Machine Learning, Natural Language Processing, Computer Vision, AI Ethics, and AI Product Management.\n\n` +
      `Jobs less likely to be automated include roles requiring creativity, emotional intelligence, and complex problem-solving, such as AI research, strategy, and human-centered design.\n\n` +
      `To prepare for AI jobs, consider training programs like Coursera's AI Specializations, Udacity's AI Nanodegree, DataCamp, fast.ai, and university bootcamps. Many offer beginner to advanced tracks.\n\n` +
      `Look for AI hiring fairs and virtual career expos hosted by companies, universities, and organizations like AI Expo, Women in AI, and local tech meetups.\n\n` +
      `Remember, everyone starts somewhere—your background and unique perspective are valuable in AI. Would you like to see entry-level roles, remote jobs, or jobs that fit your experience?`
  },
  {
    name: 'Skill Assessment',
    keywords: [
      'skills', 'jobs match', 'skills do I need', 'learn first', 'certifications', 'switch careers',
      'fastest way to get ai skills', 'learn python', 'prompt engineering'
    ],
    response: "Let's take a thoughtful look at your current skills and see what matches best with your goals. I can help you identify strengths, suggest areas for growth, and recommend personalized training. Would you like to take a skill assessment or get tailored learning recommendations?"
  },
  {
    name: 'Resume Help',
    keywords: [
      'resume', 'rewrite my resume', 'professional', 'bullet points', 'list ai skills', 'transferable skills',
      'cover letter', 'keywords', 'not getting interviews'
    ],
    response: "A strong resume is your story—let's make it shine! I can help you highlight your unique experience, rewrite bullet points, and suggest keywords to pass ATS. Would you like to upload your resume, get feedback, or see examples for AI job applications?"
  },
  {
    name: 'Interview Prep',
    keywords: [
      'interview', 'interview questions', 'tell me about yourself', 'explain my job loss', 'ai skills I’m still learning',
      'practice an interview', 'negotiate salary'
    ],
    response: "Interviewing can be stressful, but preparation builds confidence. I can help you practice common questions, craft your story, and even role-play an interview. What role are you preparing for, or is there a specific question you want to work on?"
  },
  {
    name: 'Job Search',
    keywords: [
      'find ai jobs', 'companies hiring', 'remote job', 'no experience', 'linkedin', 'network', 'apply for jobs', 'how many jobs', 'which companies', 'who is hiring', 'ai employers'
    ],
    response:
      `Many top companies are hiring for AI roles, including Google, Microsoft, Amazon, Meta, Apple, NVIDIA, OpenAI, and startups in healthcare, finance, and robotics.\n\n` +
      `Entry-level AI jobs are available in data annotation, support, QA, and junior analyst roles.\n\n` +
      `If you need help with applications, networking, or finding the right fit, I can guide you step by step. Would you like to see a list of current openings, remote jobs, or tips for applying?`
  },
  {
    name: 'Salary Negotiation',
    keywords: [
      'salary', 'negotiate pay', 'ask for more money', 'benefits', 'offer fair', 'counteroffer'
    ],
    response: "Negotiating salary can feel intimidating, but you deserve to be paid fairly. I can help you research salary ranges, prepare talking points, and practice negotiation scenarios. Would you like to discuss salary data, negotiation tips, or benefits to ask for?"
  },
  {
    name: 'Career Transition',
    keywords: [
      'move from', 'switch careers', 'too late', 'ai job for beginners', 'fit someone with my background', 'first step', 'build a portfolio'
    ],
    response: "Changing careers is a big step, but it's never too late. I can help you map out a transition plan, suggest beginner-friendly AI jobs, and recommend ways to build your portfolio. Would you like to explore transition strategies or see success stories?"
  },
  {
    name: 'Training',
    keywords: [
      'learn first', 'best course', 'certifications', 'cheapest way', 'project portfolio', 'tools', 'prompt engineering'
    ],
    response:
      `Learning is a journey, and there are many paths. Top programs include Coursera's Machine Learning by Andrew Ng, DeepLearning.AI, Udacity's AI Nanodegree, DataCamp, and fast.ai.\n\n` +
      `Many universities and bootcamps now offer AI and data science certificates, often with scholarships or financial aid.\n\n` +
      `You can also attend AI hiring fairs and virtual career expos to meet employers and learn about open roles.\n\n` +
      `If you want advice on choosing a course or balancing learning with life, I'm here to help. Are you looking for beginner resources, advanced training, or info on upcoming hiring events?`
  },
  {
    name: 'General Guidance',
    keywords: [
      'help with my career', 'don’t know what to do', 'jobs fit my personality', 'good career', 'get promoted', 'switch industries', 'future of work'
    ],
    response: "Your career journey is unique, and I'm here to support you every step of the way. Whether you want to talk about your goals, explore new opportunities, or just need encouragement, I'm here to listen and help. Would you like to discuss your aspirations or see new possibilities?"
  }
];

export function detectCareerIntent(message) {
  const lower = message.toLowerCase();
  for (const intent of intents) {
    if (intent.keywords.some(keyword => lower.includes(keyword))) {
      return intent.response;
    }
  }
  return "I'm here to help with your career questions. Can you tell me more about what you need?";
}
