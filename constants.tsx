
import { Guideline, Company, QAQuestion, SeniorMistake, SeniorLearningPost } from './types';

export const DOMAINS = [
  'DSA', 
  'Web Development', 
  'App Development', 
  'Core Subjects', 
  'HR & Behavioral', 
  'Internships', 
  'Off-campus',
  'General'
];

export const MOCK_LEARNINGS: SeniorLearningPost[] = [
  {
    id: 'l1',
    title: 'How I Cracked Amazon SDE-1 Technical Rounds',
    type: 'Interview Learning',
    company: 'Amazon',
    role: 'SDE-1',
    year: '2023',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200',
    whatIDid: 'I practiced 200 medium LeetCode questions focusing on Graphs and Trees. I also conducted 5 mock interviews focusing specifically on Amazon Leadership Principles.',
    whatWentWrong: 'I initially struggled with the Bar Raiser round because I was too brief with my behavioral answers. I didn\'t use the STAR method properly.',
    whatILearned: 'Technical skills are only 50% of the game at Amazon. The STAR method for behavioral questions is absolutely mandatory for success.',
    keyTakeaway: 'Master the STAR method for behavioral questions as much as you master Graphs and Dynamic Programming.',
    seniorId: 's6',
    seniorName: 'Ishita Roy',
    seniorCompany: 'Amazon',
    seniorCollege: 'BITS Pilani',
    isApproved: true,
    createdAt: '2023-11-20T10:00:00Z'
  },
  {
    id: 'l2',
    title: 'Preparation Roadmap for Frontend Engineers',
    type: 'Preparation Tip',
    company: 'Adobe',
    role: 'Frontend Developer',
    year: '2024',
    imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1200',
    whatIDid: 'Built 3 production-grade React projects and dove deep into JavaScript internals like the Event Loop and Closures.',
    whatWentWrong: 'I ignored basic CSS layouts (Flexbox/Grid) assuming they were "too easy", which cost me time during the machine coding round.',
    whatILearned: 'Don\'t ignore the fundamentals. Interviewers often test your depth in core technologies before looking at your framework knowledge.',
    keyTakeaway: 'JS Internals + Solid CSS + One solid framework is the perfect recipe for Frontend roles.',
    seniorId: 's1',
    seniorName: 'Rahul Sharma',
    seniorCompany: 'Google',
    seniorCollege: 'IIT Bombay',
    isApproved: true,
    createdAt: '2024-01-15T14:30:00Z'
  },
  {
    id: 'l3',
    title: 'The Hidden Reality of Off-Campus Applications',
    type: 'Experience',
    company: 'Zomato',
    role: 'SDE Intern',
    year: '2023',
    imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200',
    whatIDid: 'Cold messaged 50+ recruiters on LinkedIn and asked for referrals from alumni. I focused on building a niche portfolio in Next.js.',
    whatWentWrong: 'I applied to 100+ roles without tailoring my resume. I got zero callbacks for the first month.',
    whatILearned: 'Referrals are 10x more powerful than cold applying. Quality of application > Quantity.',
    keyTakeaway: 'Find an insider, get a referral, and tailor your resume to the specific job description.',
    seniorId: 's2',
    seniorName: 'Priya Malhotra',
    seniorCompany: 'Microsoft',
    seniorCollege: 'NIT Trichy',
    isApproved: true,
    createdAt: '2024-02-10T11:00:00Z'
  }
];

export const MOCK_MISTAKES: SeniorMistake[] = [
  {
    id: 'm1',
    title: 'Skipping Fundamentals for Competitive Programming',
    category: 'DSA',
    mistake: 'I jumped straight into LeetCode hard problems without understanding basic recursion and complexity analysis.',
    consequence: 'Failed the first 3 OAs because I couldn\'t solve even the basic dry-run questions correctly.',
    lesson: 'Master the basics first. Understand "why" a data structure works, not just "how" to code it.',
    seniorId: 's1',
    seniorName: 'Rahul Sharma',
    isApproved: true,
    createdAt: '2023-10-15T10:00:00Z'
  },
  {
    id: 'm2',
    title: 'Neglecting HR Round & Culture Fit',
    category: 'Interview',
    mistake: 'I assumed HR rounds were just "formalities" and didn\'t research the company values or leadership principles.',
    consequence: 'Got rejected at the final stage of Amazon despite clearing all technical rounds with top scores.',
    lesson: 'Treat every round with equal respect. Behavioral questions are often the deciding factor in final selections.',
    seniorId: 's6',
    seniorName: 'Ishita Roy',
    isApproved: true,
    createdAt: '2023-11-05T09:00:00Z'
  },
  {
    id: 'm3',
    title: 'Fabricating Project Details on Resume',
    category: 'Resume',
    mistake: 'I added a Machine Learning project to my resume that I had only watched a tutorial on, but never actually built.',
    consequence: 'The interviewer grilled me on the specific math behind the model, and I went blank. It ruined the rest of the interview.',
    lesson: 'Be 100% honest. If you didn\'t build it, don\'t list it. Interviewers value honesty over fake complexity.',
    seniorId: 's2',
    seniorName: 'Priya Malhotra',
    isApproved: true,
    createdAt: '2023-12-01T14:20:00Z'
  },
  {
    id: 'm4',
    title: 'Ignoring Operating Systems & DBMS',
    category: 'Skills',
    mistake: 'I focused only on C++ and DSA, ignoring core computer science subjects like OS, DBMS, and Computer Networks.',
    consequence: 'Cisco rejected me because 40% of their technical interview was based on OSI layers and Networking protocols.',
    lesson: 'Product companies don\'t just hire coders; they hire Computer Science Engineers. Your basics must be rock solid.',
    seniorId: 's3',
    seniorName: 'Amit Kumar',
    isApproved: true,
    createdAt: '2024-01-10T11:00:00Z'
  },
  {
    id: 'm5',
    title: 'Panic during Online Assessment (OA) Time Constraint',
    category: 'Exam',
    mistake: 'I spent 45 minutes of a 60-minute test trying to optimize the very first problem instead of moving to the easier ones.',
    consequence: 'I couldn\'t even attempt the last two easy questions and failed to reach the cutoff score.',
    lesson: 'Strategic time management is key. Scan the paper, solve the easiest ones first, and then tackle the tough ones.',
    seniorId: 's7',
    seniorName: 'Vikram Lal',
    isApproved: true,
    createdAt: '2024-02-15T16:45:00Z'
  },
  {
    id: 'm6',
    title: 'Waiting for "The Perfect Project" to Start Applying',
    category: 'Internship',
    mistake: 'I delayed applying for summer internships because I thought my portfolio wasn\'t "good enough" yet.',
    consequence: 'By the time I felt ready, all the Tier-1 company applications had closed for the season.',
    lesson: 'Start early. Apply with what you have and improve along the way. Perfection is the enemy of progress.',
    seniorId: 's4',
    seniorName: 'Ananya Pandey',
    isApproved: true,
    createdAt: '2024-03-05T08:30:00Z'
  },
  {
    id: 'm7',
    title: 'Poor LinkedIn Professional Presence',
    category: 'General',
    mistake: 'I had an unprofessional profile picture and a vague bio on LinkedIn, and I never posted about my achievements.',
    consequence: 'A recruiter from a startup reached out to my friend for a role but skipped me, even though we had similar skills.',
    lesson: 'Your LinkedIn is your digital identity. Keep it updated, professional, and highlight your specific technical interests.',
    seniorId: 's5',
    seniorName: 'Rohan Gupta',
    isApproved: true,
    createdAt: '2024-04-12T10:15:00Z'
  }
];

export const MOCK_GUIDELINES: Guideline[] = [
  { id: '1', category: 'DSA', question: 'How much Graph theory is actually required?', advice: 'Focus on BFS, DFS and Dijkstra. Most interviews don\'t go beyond simple shortest path problems.', author: 'Rahul S.', authorId: 's1', authorRole: 'Placed', likes: 24 },
];

export const MOCK_COMPANIES: Company[] = [
  {
    id: 'google',
    name: 'Google',
    logo: 'https://logo.clearbit.com/google.com',
    description: 'The world leader in search and cloud computing.',
    branch: ['CSE', 'IT', 'ECE'],
    placedCount: 12,
    eligibility: { cgpa: 8.5, skills: ['Data Structures', 'Algorithms', 'System Design'] },
    process: ['Online Assessment', 'Technical Round 1', 'Technical Round 2', 'Technical Round 3', 'Googlyness (HR)'],
    mustHaveSkills: ['C++/Java/Python', 'Strong Problem Solving', 'OS Fundamentals'],
    goodToHaveSkills: ['Cloud Knowledge', 'Distributed Systems'],
    seniorInsights: ['They value "Googlyness" - being humble and collaborative.', 'Focus on time complexity optimization.'],
    preparationPriority: ['LeetCode Medium/Hard', 'Mock Interviews', 'Review OS/CN basics']
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    logo: 'https://logo.clearbit.com/microsoft.com',
    description: 'Empowering every person and every organization on the planet to achieve more.',
    branch: ['CSE', 'IT', 'ECE', 'EEE'],
    placedCount: 25,
    eligibility: { cgpa: 8.0, skills: ['C#', 'OOPS', 'SQL'] },
    process: ['Coding Test', 'Tech Interview 1', 'Tech Interview 2', 'AA (As Appropriate) Round'],
    mustHaveSkills: ['OOPS', 'C++', 'DBMS'],
    goodToHaveSkills: ['Web Dev', 'Azure basics'],
    seniorInsights: ['They focus heavily on clean code.', 'Explain your thought process clearly.'],
    preparationPriority: ['OOPS Concepts', 'Top 100 Interview Questions', 'SQL Joins']
  },
  {
    id: 'amazon',
    name: 'Amazon',
    logo: 'https://logo.clearbit.com/amazon.com',
    description: 'Earth\'s most customer-centric company and world leader in e-commerce.',
    branch: ['CSE', 'IT', 'ECE'],
    placedCount: 45,
    eligibility: { cgpa: 7.5, skills: ['Data Structures', 'Algorithms'] },
    process: ['Online Assessment', 'Technical Round 1', 'Technical Round 2', 'Bar Raiser Round'],
    mustHaveSkills: ['DSA', 'System Design Basics', 'Problem Solving'],
    goodToHaveSkills: ['Distributed Systems', 'AWS Knowledge'],
    seniorInsights: ['Leadership Principles are everything.', 'Behavioral questions carry 50% weight.'],
    preparationPriority: ['LeetCode Patterns', 'Amazon Leadership Principles', 'Mock Behavioral Rounds']
  },
  {
    id: 'apple',
    name: 'Apple',
    logo: 'https://logo.clearbit.com/apple.com',
    description: 'Building the most innovative hardware and software in the world.',
    branch: ['CSE', 'IT', 'ECE', 'EEE'],
    placedCount: 8,
    eligibility: { cgpa: 8.5, skills: ['Objective-C', 'Swift', 'C++'] },
    process: ['Initial Screen', 'Tech Assessment', '4-5 Interview Rounds'],
    mustHaveSkills: ['Memory Management', 'Operating Systems', 'Low-level optimization'],
    goodToHaveSkills: ['iOS Development', 'Hardware Knowledge'],
    seniorInsights: ['They care deeply about user privacy and UI/UX.', 'Explain your code at a low level.'],
    preparationPriority: ['OS Internals', 'DSA with Memory constraints', 'Swift basics']
  },
  {
    id: 'meta',
    name: 'Meta',
    logo: 'https://logo.clearbit.com/meta.com',
    description: 'Connecting people through social technology and the metaverse.',
    branch: ['CSE', 'IT'],
    placedCount: 6,
    eligibility: { cgpa: 8.5, skills: ['Algorithms', 'System Design'] },
    process: ['Phone Screen', 'Technical Onsite 1', 'Technical Onsite 2', 'Behavioral Onsite'],
    mustHaveSkills: ['High-performance coding', 'Scalable systems', 'Product Sense'],
    goodToHaveSkills: ['React', 'PHP/Hack'],
    seniorInsights: ['Coding speed and accuracy are crucial.', 'Focus on production-level code.'],
    preparationPriority: ['LeetCode Hard', 'Distributed Systems', 'Product Design']
  },
  {
    id: 'adobe',
    name: 'Adobe',
    logo: 'https://logo.clearbit.com/adobe.com',
    description: 'Changing the world through digital experiences.',
    branch: ['CSE', 'IT'],
    placedCount: 18,
    eligibility: { cgpa: 8.0, skills: ['C++', 'JavaScript', 'Object Oriented Programming'] },
    process: ['Cognitive Test', 'Technical Interview 1', 'Technical Interview 2', 'Director Round'],
    mustHaveSkills: ['Strong OOPS', 'C++/Java', 'Basic Frontend'],
    goodToHaveSkills: ['Photoshop Basics', 'Modern JS'],
    seniorInsights: ['They ask very creative puzzle-like coding questions.', 'Strong focus on academic fundamentals.'],
    preparationPriority: ['Puzzles & Logic', 'OOPS Deep Dive', 'Core CS Subjects (OS/DBMS)']
  },
  {
    id: 'netflix',
    name: 'Netflix',
    logo: 'https://logo.clearbit.com/netflix.com',
    description: 'The world\'s leading streaming entertainment service.',
    branch: ['CSE', 'IT'],
    placedCount: 3,
    eligibility: { cgpa: 9.0, skills: ['Java', 'Microservices', 'Distributed Systems'] },
    process: ['Phone Tech', 'Onsite Technical 1', 'Onsite Technical 2', 'Culture Fit Round'],
    mustHaveSkills: ['Java/Spring Boot', 'Cloud Architecture', 'Distributed Databases'],
    goodToHaveSkills: ['Docker', 'Kubernetes'],
    seniorInsights: ['"Netflix Culture: Freedom and Responsibility" is a must-read.', 'They only hire top-tier problem solvers.'],
    preparationPriority: ['Microservices Design', 'Advanced System Design', 'Netflix Culture Memo']
  },
  {
    id: 'nvidia',
    name: 'NVIDIA',
    logo: 'https://logo.clearbit.com/nvidia.com',
    description: 'The engine of AI, visual computing, and gaming.',
    branch: ['CSE', 'ECE', 'EEE'],
    placedCount: 15,
    eligibility: { cgpa: 8.0, skills: ['C', 'C++', 'Computer Architecture'] },
    process: ['OA', 'Technical Round 1', 'Technical Round 2', 'Manager Round'],
    mustHaveSkills: ['Computer Architecture', 'C/C++', 'Parallel Programming'],
    goodToHaveSkills: ['CUDA', 'Machine Learning Basics'],
    seniorInsights: ['Deep understanding of hardware is expected.', 'Questions on pointers and memory are common.'],
    preparationPriority: ['Microprocessor Arch', 'Advanced C Pointers', 'Parallel Computing']
  },
  {
    id: 'uber',
    name: 'Uber',
    logo: 'https://logo.clearbit.com/uber.com',
    description: 'Moving the world through flexible earnings and seamless mobility.',
    branch: ['CSE', 'IT'],
    placedCount: 7,
    eligibility: { cgpa: 8.0, skills: ['Go', 'Java', 'Distributed Systems'] },
    process: ['CodeSignal OA', 'Tech Interview 1', 'Tech Interview 2', 'System Design'],
    mustHaveSkills: ['Concurrency', 'High-level DSA', 'Networking'],
    goodToHaveSkills: ['GoLang', 'Kafka'],
    seniorInsights: ['They focus heavily on real-time systems.', 'Coding rounds are usually fast-paced.'],
    preparationPriority: ['Multi-threading', 'System Design Patterns', 'Advanced Graphs']
  },
  {
    id: 'tcs',
    name: 'TCS',
    logo: 'https://logo.clearbit.com/tcs.com',
    description: 'A global leader in IT services, consulting & business solutions.',
    branch: ['CSE', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil'],
    placedCount: 150,
    eligibility: { cgpa: 6.0, skills: ['Aptitude', 'Programming Basics'] },
    process: ['NQT Assessment', 'Technical Interview', 'HR Interview'],
    mustHaveSkills: ['Aptitude', 'C/Java/Python Basics', 'Verbal Skills'],
    goodToHaveSkills: ['Project Knowledge', 'Certifications'],
    seniorInsights: ['Aptitude round is the major filter.', 'Be confident in your basic technical knowledge.'],
    preparationPriority: ['Quantitative Aptitude', 'Verbal Reasoning', 'Common HR Questions']
  }
];

export const MOCK_QA: QAQuestion[] = [
  {
    id: 'q1',
    author: 'Sunil V.',
    text: 'What is the best way to prepare for OAs of product based companies in 2 months?',
    domain: 'DSA',
    timestamp: '2 hours ago',
    answers: [
      { id: 'a1', author: 'Ishita R.', authorId: 's6', text: 'Stick to LeetCode and solve the "Blind 75" list. It covers almost everything.', likes: 12, timestamp: '1 hour ago' }
    ]
  }
];
