export const CATEGORIES = [
  "All",
  "Programming",
  "Design",
  "Business",
  "Data Science",
  "Marketing",
];

export const COURSES = [
  {
    id: "1",
    title: "Modern React Development",
    description:
      "Learn to build modern, scalable web applications with React.js, hooks, context API, and best practices.",
    category: "Programming",
    instructor: "Jane Doe",
    duration: "8 weeks",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    price: 99,
    lessons: [
      {
        id: "l1-1",
        title: "Introduction to React",
        content:
          "<h3>Welcome to React</h3><p>React is a JavaScript library for building user interfaces.</p>",
      },
      {
        id: "l1-2",
        title: "Components and JSX",
        content:
          "<h3>Components</h3><p>Learn how to create reusable components using JSX syntax.</p>",
      },
      {
        id: "l1-3",
        title: "Hooks",
        content:
          "<h3>React Hooks</h3><p>useState, useEffect, and custom hooks explained.</p>",
      },
      {
        id: "l1-4",
        title: "Context API",
        content:
          "<h3>Context API</h3><p>Manage global state without prop drilling.</p>",
      },
    ],
  },
  {
    id: "2",
    title: "UI/UX Design Fundamentals",
    description:
      "Master the fundamentals of user interface and user experience design using Figma and modern design principles.",
    category: "Design",
    instructor: "John Smith",
    duration: "6 weeks",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1586718050588-2d97b7b68d12?w=800&q=80",
    price: 79,
    lessons: [
      {
        id: "l2-1",
        title: "Design Principles",
        content:
          "<h3>Design Principles</h3><p>Balance, contrast, alignment, proximity, and repetition.</p>",
      },
      {
        id: "l2-2",
        title: "Color Theory",
        content:
          "<h3>Color Theory</h3><p>Understanding colors, palettes, and accessibility.</p>",
      },
      {
        id: "l2-3",
        title: "Typography",
        content: "<h3>Typography</h3><p>Choosing fonts and setting type hierarchy.</p>",
      },
    ],
  },
  {
    id: "3",
    title: "Data Science with Python",
    description:
      "Analyze and visualize data using Python, Pandas, NumPy, and Matplotlib.",
    category: "Data Science",
    instructor: "Alice Brown",
    duration: "10 weeks",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    price: 120,
    lessons: [
      {
        id: "l3-1",
        title: "Python Basics",
        content: "<h3>Python Basics</h3><p>Variables, types, functions, and control flow.</p>",
      },
      {
        id: "l3-2",
        title: "Pandas",
        content:
          "<h3>Pandas</h3><p>Data manipulation with DataFrames and Series.</p>",
      },
      {
        id: "l3-3",
        title: "Data Visualization",
        content:
          "<h3>Data Visualization</h3><p>Create charts with Matplotlib and Seaborn.</p>",
      },
    ],
  },
  {
    id: "4",
    title: "Digital Marketing Masterclass",
    description:
      "Learn SEO, social media marketing, email marketing, and paid advertising strategies.",
    category: "Marketing",
    instructor: "Robert Wilson",
    duration: "5 weeks",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1460925895917-af3ab827c52f?w=800&q=80",
    price: 65,
    lessons: [
      {
        id: "l4-1",
        title: "SEO Fundamentals",
        content: "<h3>SEO</h3><p>Search engine optimization basics.</p>",
      },
      {
        id: "l4-2",
        title: "Social Media",
        content: "<h3>Social Media Marketing</h3><p>Growing audiences on social platforms.</p>",
      },
    ],
  },
  {
    id: "5",
    title: "Business Strategy",
    description:
      "Develop winning business strategies, analyze markets, and plan for growth.",
    category: "Business",
    instructor: "Maria Garcia",
    duration: "7 weeks",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    price: 85,
    lessons: [
      {
        id: "l5-1",
        title: "Strategy Intro",
        content: "<h3>Business Strategy</h3><p>Introduction to strategic planning.</p>",
      },
    ],
  },
  {
    id: "6",
    title: "Advanced JavaScript",
    description:
      "Deep dive into modern JavaScript: closures, prototypes, async, and modules.",
    category: "Programming",
    instructor: "James Lee",
    duration: "6 weeks",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1579468118865-00c9c7d2c77b?w=800&q=80",
    price: 90,
    lessons: [
      {
        id: "l6-1",
        title: "Closures",
        content: "<h3>Closures</h3><p>Understanding lexical scope and closures.</p>",
      },
      {
        id: "l6-2",
        title: "Async JS",
        content: "<h3>Async JavaScript</h3><p>Promises, async/await, and fetch.</p>",
      },
    ],
  },
];

export const QUIZZES = {
  "1": [
    {
      id: "q1",
      question: "What is React primarily used for?",
      options: [
        "Building user interfaces",
        "Styling web pages",
        "Managing databases",
        "Running servers",
      ],
      answer: 0,
    },
    {
      id: "q2",
      question: "Which hook is used for state management in functional components?",
      options: ["useEffect", "useState", "useRef", "useMemo"],
      answer: 1,
    },
    {
      id: "q3",
      question: "What does JSX stand for?",
      options: [
        "JavaScript XML",
        "Java Syntax Extension",
        "JavaScript Syntax Extension",
        "JSON XML",
      ],
      answer: 2,
    },
  ],
  "2": [
    {
      id: "q1",
      question: "Which tool is commonly used for UI/UX design?",
      options: ["Figma", "Photoshop", "Illustrator", "All of the above"],
      answer: 3,
    },
    {
      id: "q2",
      question: "What does UX stand for?",
      options: ["User Experience", "User Export", "User Extension", "User Example"],
      answer: 0,
    },
  ],
};
