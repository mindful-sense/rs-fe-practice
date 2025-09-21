import { createClient } from "@libsql/client";

const client = createClient({ url: "file:src/data/blog.db" });

const roles = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Moderator" },
  { id: 3, name: "Reader" },
  { id: 4, name: "Guest" },
];

const users = [
  {
    id: 1,
    login: "john_doe",
    password: "qwerty1234567890",
    registeredAt: "2025-07-01",
    roleId: 1,
  },
];

const posts = [
  {
    id: 1,
    title: "The Modern Web Dev's Toolkit: Essential Extensions for VS Code",
    imageUrl:
      "https://fastly.picsum.photos/id/200/392/240.jpg?hmac=uWoeFlfmRy19iACTtfMwEOUOAt3iNZBYsw1u4DO00pM",
    content:
      "Elevate your coding game with the right tools. This post dives into the world of Visual Studio Code extensions, highlighting those that are crucial for modern web development. From syntax highlighting and linting to powerful debugging and Git integration, we'll explore extensions that save you time, improve code quality, and make your development workflow smoother and more efficient.<br>Discover how to set up your ideal coding environment, transforming VS Code from a simple text editor into a full-fledged development powerhouse. We'll cover must-have extensions for various languages and frameworks, ensuring you're equipped for any project, whether it's a simple HTML page or a complex React application.<br>This guide isn't just a list; it's a roadmap to a more productive and enjoyable coding experience. Learn how to customize your workspace, automate repetitive tasks, and collaborate seamlessly with other developers, all within the comfort of your favorite code editor.",
    publishedAt: "2025-08-01",
  },
  {
    id: 2,
    title: "Beyond console.log(): A Guide to Advanced JavaScript Debugging",
    imageUrl:
      "https://fastly.picsum.photos/id/677/392/240.jpg?hmac=UygV-DBFkzxvOE9PHuSHSdP2SnC964JsTt8BAVZL7TI",
    content:
      "Are you still relying on console.log() to find bugs? It's time to level up your debugging skills. This post explores powerful, often-underutilized debugging techniques and tools available in modern browsers, helping you pinpoint and fix issues faster and more effectively.<br>We'll show you how to use breakpoints, watches, call stacks, and conditional logging to navigate your code and understand its execution flow. Learn to debug asynchronous code, inspect network requests, and analyze performance bottlenecks directly within the browser's developer tools.<br>Mastering these techniques will not only make you a more efficient problem-solver but also give you a deeper understanding of how your code behaves. Say goodbye to guesswork and hello to a systematic, professional approach to squashing bugs.",
    publishedAt: "2025-08-02",
  },
  {
    id: 3,
    title:
      "Demystifying Front-End Frameworks: React, Vue, and Angular Explained",
    imageUrl:
      "https://fastly.picsum.photos/id/952/392/240.jpg?hmac=A13GJbDU_gPpyRPiVDKpqEERSJ2Uexx7egtxthQA26o",
    content:
      "Choosing a front-end framework can feel overwhelming. This article provides a clear, high-level overview of the three most popular options: React, Vue, and Angular. We'll break down their core philosophies, key features, and what kinds of projects they are best suited for, helping you make an informed decision for your next project.<br>We'll compare their component-based architectures, state management approaches, and community support, offering insights into their respective learning curves. Whether you're a newcomer trying to pick your first framework or a seasoned developer looking to expand your skillset, this guide will help you understand the pros and cons of each.<br>By the end of this post, you'll have a solid grasp of what sets these frameworks apart. We'll provide a simple framework for deciding which one aligns best with your project's needs, your team's expertise, and your personal development goals.",
    publishedAt: "2025-08-03",
  },
  {
    id: 4,
    title:
      "From Zero to Hero: Building a Full-Stack App with Node.js and Express",
    imageUrl:
      "https://fastly.picsum.photos/id/645/392/240.jpg?hmac=C7Q64htxeQCf8bptokr1i1Bd7Ph9GmrPtAaYRsIFB_s",
    content:
      "Ready to build your first full-stack application? This step-by-step tutorial will guide you through creating a simple web app from the ground up using Node.js and the Express framework. We'll cover everything from setting up your project and defining API routes to connecting to a database and deploying your app.<br>We'll start with the basics of setting up your server, handling requests, and serving static files. Then, we'll move on to more advanced topics like connecting to a MongoDB database to store and retrieve data. You'll learn the fundamentals of creating a RESTful API to power your front-end.<br>This hands-on guide will give you a practical understanding of how the back-end and front-end work together. By the end, you'll have a complete, working application and the confidence to start building more complex full-stack projects on your own.",
    publishedAt: "2025-08-04",
  },
  {
    id: 5,
    title: "The Art of the Pull Request: Best Practices for Code Collaboration",
    imageUrl:
      "https://fastly.picsum.photos/id/392/392/240.jpg?hmac=9h41o_XC39KDVQqLKpmLne_7wyTStum38Euf_gmTMbw",
    content:
      "Code collaboration is at the heart of modern development, and the pull request is its central ritual. This post outlines the best practices for creating, reviewing, and merging pull requests that make your team's workflow more efficient and less prone to errors. We'll cover everything from writing a clear title and description to linking to relevant issues.<br>Learn how to structure your pull requests to tell a story about your changes. We'll discuss the importance of writing atomic commits, providing a detailed summary of what was changed and why, and using proper branching strategies. This will make your pull requests easier for your teammates to review and understand.<br>Effective pull requests don't just get code merged; they build a culture of shared responsibility and quality. By following these guidelines, you'll not only improve your own contributions but also become a valuable asset to any development team.",
    publishedAt: "2025-08-05",
  },
  {
    id: 6,
    title: "CSS Grid vs. Flexbox: Knowing When to Use What",
    imageUrl:
      "https://fastly.picsum.photos/id/459/392/240.jpg?hmac=mEqy4ALTgvrDR-r1fNcM0-gKfndFwamnzmlIQzUcTYM",
    content:
      "Are you confused about when to use CSS Grid and when to use Flexbox? You're not alone. This article clarifies the distinction between these two powerful layout systems and provides practical examples to help you decide which tool is right for the job. We'll break down their core purposes and capabilities.<br>We'll explore how Flexbox excels at one-dimensional layouts (e.g., aligning items in a row or a column) and is perfect for components like navigation bars and forms. In contrast, we'll see how CSS Grid is a two-dimensional system ideal for creating complex, responsive page layouts.<br>By the end of this guide, you'll have a clear mental model for when to reach for Flexbox and when to use CSS Grid. This knowledge will enable you to write cleaner, more maintainable CSS and build responsive layouts with confidence.",
    publishedAt: "2025-08-06",
  },
  {
    id: 7,
    title:
      "An Introduction to Headless CMS: A Modern Approach to Content Management",
    imageUrl:
      "https://fastly.picsum.photos/id/947/392/240.jpg?hmac=GJdPTuAiKdyj5GAAcPmo6w5pI89q1d4N9vxyqFB6Dl8",
    content:
      "Move beyond traditional, monolithic content management systems. This post introduces the concept of a headless CMS and explains why it's a game-changer for modern web development. We'll explore how it decouples the content from the presentation layer, giving developers the flexibility to use their favorite front-end frameworks.<br>We'll discuss the benefits of a headless approach, including improved performance, enhanced security, and the ability to deliver content to multiple platforms and devices. We'll also look at popular headless CMS options like Strapi and Sanity and how they can streamline your content workflow.<br>This article is for any developer looking to build a more flexible and future-proof website. Learn how to integrate a headless CMS into your stack to create dynamic, data-driven applications that are both powerful and easy to manage.",
    publishedAt: "2025-08-07",
  },
  {
    id: 8,
    title: "Optimizing Web Performance: A Practical Guide to Faster Websites",
    imageUrl:
      "https://fastly.picsum.photos/id/163/392/240.jpg?hmac=saF4jXul1TCKOgUWitCvrQyZLP-hOSFUDTnQQ0BFpNE",
    content:
      "Slow websites frustrate users and hurt your bottom line. This post provides a practical guide to optimizing web performance, covering key metrics and actionable strategies to make your sites load faster. We'll dive into techniques like image optimization, lazy loading, and code splitting.<br>Learn how to use browser developer tools to diagnose performance bottlenecks and identify areas for improvement. We'll show you how to analyze metrics like First Contentful Paint (FCP) and Largest Contentful Paint (LCP) and how to improve them by optimizing your assets and server responses.<br>A fast website is a better website. By following the tips in this guide, you can significantly improve your site's user experience, search engine rankings, and overall success.",
    publishedAt: "2025-08-08",
  },
  {
    id: 9,
    title:
      "Mastering Asynchronous JavaScript: Promises, Async/Await, and Beyond",
    imageUrl:
      "https://fastly.picsum.photos/id/637/392/240.jpg?hmac=TmwFloTB5arGtWTQ31c_t_1T8aC7OuIkwG91ZMeBLnc",
    content:
      "Asynchronous programming is a fundamental part of modern JavaScript. This article demystifies the concepts of Promises and the async/await syntax, providing clear explanations and practical examples to help you handle asynchronous operations without getting tangled in callback hell.<br>We'll start with the basics of what asynchronous code is and why it's necessary. Then, we'll explore how Promises provide a cleaner way to handle async operations, and how the async/await syntax makes your asynchronous code look and behave like synchronous code, making it far easier to read and debug.<br>By the end of this guide, you'll have a solid understanding of how to manage complex asynchronous tasks effectively. This will empower you to write cleaner, more maintainable code for everything from fetching data from an API to handling file I/O.",
    publishedAt: "2025-08-09",
  },
  {
    id: 10,
    title: "The Ultimate Guide to Git: From Basics to Branching Strategies",
    imageUrl:
      "https://fastly.picsum.photos/id/362/392/240.jpg?hmac=tX7aKWFJnOX8b5YnOuhayLLpq0JcSGCdGNkBjDSlFFs",
    content:
      "Git is the cornerstone of modern software development, but it can be intimidating for beginners. This comprehensive guide walks you through the essentials of Git, from basic commands like commit and push to more advanced concepts like branching, merging, and rebasing.<br>We'll start with setting up your Git environment and making your first commit. Then, we'll move on to a deeper dive into branching strategies like Git Flow and GitHub Flow, and how to resolve merge conflicts without losing your mind. We'll also cover essential commands for navigating your commit history.<br>Mastering Git is a skill that will serve you throughout your entire career. This guide will give you the confidence to manage your projects effectively, collaborate seamlessly with your team, and undo mistakes without fear.",
    publishedAt: "2025-08-10",
  },
  {
    id: 11,
    title:
      "Web Accessibility (a11y) for Developers: Building Inclusive Experiences",
    imageUrl:
      "https://fastly.picsum.photos/id/779/392/240.jpg?hmac=vv5hs2fc-WZVhSwyIUOY0CW4EECwd70GQRb-nvRBKMk",
    content:
      "Building accessible websites isn't just a legal requirement; it's a moral imperative. This post introduces the principles of web accessibility (a11y) and provides developers with practical steps to ensure their websites can be used by everyone, regardless of ability. We'll cover topics like semantic HTML, ARIA attributes, and keyboard navigation.<br>We'll explain why semantic HTML is the foundation of accessible web design and how to use it correctly. We'll also show you how to use ARIA roles and attributes to provide context to assistive technologies and how to test your site's accessibility using tools like Lighthouse and screen readers.<br>Building with accessibility in mind from the start is easier than fixing it later. This guide will give you the knowledge and tools to create digital experiences that are not only beautiful but also inclusive and usable for all.",
    publishedAt: "2025-08-11",
  },
  {
    id: 12,
    title:
      "Introduction to Serverless Computing: A Developer's Guide to AWS Lambda",
    imageUrl:
      "https://fastly.picsum.photos/id/877/392/240.jpg?hmac=HWjzlqlfaIalEZA371kUl0Uw_dv6LaFpDZJrnH8H39g",
    content:
      "Ready to build and deploy applications without worrying about servers? This introduction to serverless computing explains the core concepts and shows you how to get started with AWS Lambda. We'll walk through setting up your first Lambda function, a fundamental building block of serverless architecture.<br>We'll cover the benefits of serverless, such as automatic scaling, reduced operational costs, and simplified deployment. We'll also explain how serverless functions work in response to events and how they can be integrated with other AWS services to build powerful and scalable applications.<br>This post is a perfect starting point for any developer curious about serverless technology. By the end, you'll have a clear understanding of what serverless is and how you can use it to build efficient and cost-effective applications.",
    publishedAt: "2025-08-12",
  },
];

const sqls = [
  "DROP TABLE IF EXISTS roles;",
  "DROP TABLE IF EXISTS users;",
  "DROP TABLE IF EXISTS posts;",
  "DROP TABLE IF EXISTS comments;",
  `CREATE TABLE roles (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
  );`,
  `CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    login TEXT NOT NULL,
    password TEXT NOT NULL,
    registered_at TEXT NOT NULL,
    role_id INTEGER NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles (id)
  );`,
  `CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    content TEXT NOT NULL,
    published_at TEXT NOT NULL
  );`,
  `CREATE TABLE comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    author_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    FOREIGN KEY (author_id) REFERENCES users (id),
    FOREIGN KEY (post_id) REFERENCES posts (id)
  );`,
];

roles.forEach(({ id, name }) =>
  sqls.push({
    sql: "INSERT INTO roles (id, name) VALUES (?, ?);",
    args: [id, name],
  }),
);

users.forEach(({ id, login, password, registeredAt, roleId }) =>
  sqls.push({
    sql: "INSERT INTO users (id, login, password, registered_at, role_id) VALUES (?, ?, ?, ?, ?);",
    args: [id, login, password, registeredAt, roleId],
  }),
);

posts.forEach(({ id, title, imageUrl, content, publishedAt }) =>
  sqls.push({
    sql: "INSERT INTO posts (id, title, image_url, content, published_at) VALUES (?, ?, ?, ?, ?);",
    args: [id, title, imageUrl, content, publishedAt],
  }),
);

await client.batch(sqls, "write");
client.close();
console.log("Database is created.");
