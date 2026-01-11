import Database from "better-sqlite3";
import path from "path";
import { randomUUID } from "crypto";

const dbPath = path.join(process.cwd(), "src", "data", "blog.db");
const db = new Database(dbPath /* { verbose: console.log } */);
db.pragma("journal_mode = WAL");

const getRandomDate = () => {
  const startDateMs = Date.parse("2025-01-01");
  return new Date(startDateMs + Math.random() * (Date.now() - startDateMs))
    .toISOString()
    .split("T")[0];
};

const roles = [
  { id: 0, name: "Admin" },
  { id: 1, name: "Moderator" },
  { id: 2, name: "Reader" },
  { id: 3, name: "Guest" },
];

const users = [
  {
    id: randomUUID(),
    login: "admin",
    password:
      "4b48dc0043beb3863889abd3fd5ff7b3165f40a3dae1a2175ba8452f63367c5daa6f5d47bd1f931522d7ea470281d93f9abfe96be7f98d40658b845fc83053b0", // awdawd3!
    salt: "5c1c7574ba9c848b77a8dd60ceb562a4",
    roleId: 0,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: randomUUID(),
    login: "qwdqwdadawdsadawaw",
    password:
      "23ed9a0c623c092cf4419690bd9a5caa66df260b8e5178938da46de118d0d792418ac2a3bcff977d54722e12c41a7af7ab127f50fb4a36bcdc6778213416d660", // qwe123!
    salt: "178fe49b2fedfb0b6ce0f8956117cdbd",
    roleId: 1,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: randomUUID(),
    login: "test",
    password:
      "0028a4657f9a76dd56ade87f3c3452bdada45ae59dc297a61e2e6a915e3a5db22dfb90086a038ea2154a262dac3fa606010873a12a81226e3c0a54b5789b731a", // qwe123!
    salt: "dd3f5c090238b0241707dfec8b15af35",
    roleId: 1,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: randomUUID(),
    login: "user_vova",
    password:
      "9462fd0379112a5ffd8c7e65c98ea098f196eff2345b7a93f82319f022ef6f78ab49ec925bc22ff2151d2428f12a2143e5b1729d0089394501cc16a536c14933", // qwe123!
    salt: "89064e539061c45e3fd3b0958444d54a",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: randomUUID(),
    login: "sergey_dev",
    password:
      "c05fea44b4a8611af03dbb815719aaa3ddefd065871a2e8fd49246de8d11a339e9821d66b3ce1651d421984ffd7c8d91d3fc2830f5492fcd51585b1c34230fa0", // qwe123!
    salt: "f0f65c7df1a4a1234e5a09bfd3ae16e8",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: randomUUID(),
    login: "kate_rock",
    password:
      "3c0791b78b2bdf8d47fd3792f13437e321e554689e8dc4f496563c4821b5a1cd76550c0a4180d491e4122c81e4f1a49223fd0a29fb197be69072032a5499da8f", // qwe123!
    salt: "6af845dd78106cfbd59ffb2b5b08c693",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: randomUUID(),
    login: "denis_pro",
    password:
      "ea0bea3edb183dcbad68f34463823e442d7e7f617bde5ef528ed1ce3f8e293db9f94c1c65cd4fcc4d9c427dc868c86cbcfa4bc5267dff0fa7e49a6dce3b6a8cb", // qwe123!
    salt: "7f883ec89626df93ca2487649ce90c56",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: randomUUID(),
    login: "lisa_m",
    password:
      "c216978a8c1ab2c5011200498c487af5e221a92eff5fc485ae17c21d79c9250e50a9171ca12d563f5296f0b9cdc614bf9bfe1e86c8c44c4736f305e3fdefebdf", // qwe123!
    salt: "149b7f3c19135b10137f5ca27dfb51bc",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: randomUUID(),
    login: "ivan_ivanov",
    password:
      "495b98be200794323316abe3d1238ba7b45e877dbc62d1de3fe1f665eb9a3cfc4f5f89b55b14c97dfbbcbdea9bb7bc0fb19325f38cb3b3e280b1500c08c7936a", // qwe123!
    salt: "d6def408f9ea16e53c0e91d85fb0441a",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: randomUUID(),
    login: "tech_lead",
    password:
      "0aa25d286b0a52141bc7890a327d389349ed50c05dee33507ded3ffa82d464e9a164aa50d1686a9b5bba19a63a72219dbd7f0d539ea609f9e12fb887cae1649e", // qwe123!
    salt: "8e9452d07843f09e6f8b937761ba62fd",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: randomUUID(),
    login: "guest_99",
    password:
      "829a14f87a5caefb07c9d23e064b1c9eeb74a88759e56c030a3a8d9ecb8b5f3b58ebb644de3019bc8e56e65d443de39d04e55dd74dccd65baa95cbe6cb1c5abb", // qwe123!
    salt: "3baa3dc4ce88651e2f09d8c2796aee6e",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: randomUUID(),
    login: "olga_art",
    password:
      "1e8f8e2c337d06c141672249be3d9dc29468731123620afab8ec7633c9e3324001c6c7568ed57e4aa10fda5a5d8094ccf3d7e3efc1c8a25b1762b8679f526f1f", // qwe123!
    salt: "bdb10556f80cd146b8aae8289a00b87b",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: randomUUID(),
    login: "max_power",
    password:
      "a124c227349911af7b46c663d10cde0a7078ce8ac36e31de3771e49c8aa2270a5b185bf9365ec3302340b26f51d6695b0416720ad697c1e49c350fa66d095717", // qwe123!
    salt: "7cc622950b1fe2a861fcab042e5e6086",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: randomUUID(),
    login: "dmitry_k",
    password:
      "6a25b596e147579c08cf972018672cb198de4c2df03b93bf5172af1aeb32a489fc90633f5bd24ac287b3c7fbf59a47d319cd7c94e39004558b4efe0291e1be1e", // qwe123!
    salt: "d6b3cd34014f34c82f3fd092f6d89a34",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: randomUUID(),
    login: "anna_joy",
    password:
      "0986365d6ac76aab8a21e5ba36f1cb8a61c8b1c9234c3a9fd7c90edc01e6139e6eabed6abe332f7e5395a5bcf453893bf5f55b3d2efdb24fdc0c08885ab833ac", // qwe123!
    salt: "2dda9355b34854e6d38ec2f0c3199b6d",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: randomUUID(),
    login: "boris_t",
    password:
      "03498336f109a86e99dd492bd01844c90d12811cce72f4ae546fb4dc9b325678d73520c20aa5fbe118614ce1a1cb5d0dc99a7ed30e901cd099e8674e7e2e51b7", // qwe123!
    salt: "c82f1867c3fa5d41f572dcd9f268b5c3",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: randomUUID(),
    login: "elena_w",
    password:
      "9bcfb82b6f4d5c45b230fc6255d62d32616007e99b70dfd7c9f20da6593c81b4d8e61d659488b662247ecb90552e72387a8a8b41d945f2ff8c964da4ab273849", // qwe123!
    salt: "2f32e9cd2b238d5e08297743643e4278",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: randomUUID(),
    login: "pavel_88",
    password:
      "91283b15083db926506d9c747cdb92b443b372b02882f523d8c3d0683fa7fc8e543074dc276637acdc0fa92f5ab8fae388e2b4c0053beddb7ad8059971f5f625", // qwe123!
    salt: "8515325f57dadee6481de3aaed92a117",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: randomUUID(),
    login: "igor_dev",
    password:
      "2dbb4dbc8e085e09c12a2bf57dae9c5a39508c0c7434c06fab8868390609e1ca6d6bfe78f1a8659bf7e8d50b580c6c533ff46b4f1c145f6e4b40a62648f274fc", // qwe123!
    salt: "b062d17d3ea1e0a955c817d113d771d6",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: randomUUID(),
    login: "nina_sky",
    password:
      "1ad3dfd995eb438b8aa53dd3614fbe4f27cc500ae34c6ffdbf83d6ba7d4f7ad8c04a290eb30c62c725ffc58b7d500429eb875a67f3d5dc6f95f3ea18bb00d0d8", // qwe123!
    salt: "6a2ef1456fb6146f513ffec08bf768e9",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
];

const posts = [
  {
    id: randomUUID(),
    title: "The Modern Web Dev's Toolkit: Essential Extensions for VS Code",
    imageUrl:
      "https://fastly.picsum.photos/id/200/392/240.jpg?hmac=uWoeFlfmRy19iACTtfMwEOUOAt3iNZBYsw1u4DO00pM",
    content:
      "Elevate your coding game with the right tools. This post dives into the world of Visual Studio Code extensions, highlighting those that are crucial for modern web development. From syntax highlighting and linting to powerful debugging and Git integration, we'll explore extensions that save you time, improve code quality, and make your development workflow smoother and more efficient.<br>Discover how to set up your ideal coding environment, transforming VS Code from a simple text editor into a full-fledged development powerhouse. We'll cover must-have extensions for various languages and frameworks, ensuring you're equipped for any project, whether it's a simple HTML page or a complex React application.<br>This guide isn't just a list; it's a roadmap to a more productive and enjoyable coding experience. Learn how to customize your workspace, automate repetitive tasks, and collaborate seamlessly with other developers, all within the comfort of your favorite code editor.",
    publishedAt: getRandomDate(),
  },
  {
    id: randomUUID(),
    title: "Beyond console.log(): A Guide to Advanced JavaScript Debugging",
    imageUrl:
      "https://fastly.picsum.photos/id/677/392/240.jpg?hmac=UygV-DBFkzxvOE9PHuSHSdP2SnC964JsTt8BAVZL7TI",
    content:
      "Are you still relying on console.log() to find bugs? It's time to level up your debugging skills. This post explores powerful, often-underutilized debugging techniques and tools available in modern browsers, helping you pinpoint and fix issues faster and more effectively.<br>We'll show you how to use breakpoints, watches, call stacks, and conditional logging to navigate your code and understand its execution flow. Learn to debug asynchronous code, inspect network requests, and analyze performance bottlenecks directly within the browser's developer tools.<br>Mastering these techniques will not only make you a more efficient problem-solver but also give you a deeper understanding of how your code behaves. Say goodbye to guesswork and hello to a systematic, professional approach to squashing bugs.",
    publishedAt: getRandomDate(),
  },
  {
    id: randomUUID(),
    title:
      "Demystifying Front-End Frameworks: React, Vue, and Angular Explained",
    imageUrl:
      "https://fastly.picsum.photos/id/952/392/240.jpg?hmac=A13GJbDU_gPpyRPiVDKpqEERSJ2Uexx7egtxthQA26o",
    content:
      "Choosing a front-end framework can feel overwhelming. This article provides a clear, high-level overview of the three most popular options: React, Vue, and Angular. We'll break down their core philosophies, key features, and what kinds of projects they are best suited for, helping you make an informed decision for your next project.<br>We'll compare their component-based architectures, state management approaches, and community support, offering insights into their respective learning curves. Whether you're a newcomer trying to pick your first framework or a seasoned developer looking to expand your skillset, this guide will help you understand the pros and cons of each.<br>By the end of this post, you'll have a solid grasp of what sets these frameworks apart. We'll provide a simple framework for deciding which one aligns best with your project's needs, your team's expertise, and your personal development goals.",
    publishedAt: getRandomDate(),
  },
  {
    id: randomUUID(),
    title:
      "From Zero to Hero: Building a Full-Stack App with Node.js and Express",
    imageUrl:
      "https://fastly.picsum.photos/id/645/392/240.jpg?hmac=C7Q64htxeQCf8bptokr1i1Bd7Ph9GmrPtAaYRsIFB_s",
    content:
      "Ready to build your first full-stack application? This step-by-step tutorial will guide you through creating a simple web app from the ground up using Node.js and the Express framework. We'll cover everything from setting up your project and defining API routes to connecting to a database and deploying your app.<br>We'll start with the basics of setting up your server, handling requests, and serving static files. Then, we'll move on to more advanced topics like connecting to a MongoDB database to store and retrieve data. You'll learn the fundamentals of creating a RESTful API to power your front-end.<br>This hands-on guide will give you a practical understanding of how the back-end and front-end work together. By the end, you'll have a complete, working application and the confidence to start building more complex full-stack projects on your own.",
    publishedAt: getRandomDate(),
  },
  {
    id: randomUUID(),
    title: "The Art of the Pull Request: Best Practices for Code Collaboration",
    imageUrl:
      "https://fastly.picsum.photos/id/392/392/240.jpg?hmac=9h41o_XC39KDVQqLKpmLne_7wyTStum38Euf_gmTMbw",
    content:
      "Code collaboration is at the heart of modern development, and the pull request is its central ritual. This post outlines the best practices for creating, reviewing, and merging pull requests that make your team's workflow more efficient and less prone to errors. We'll cover everything from writing a clear title and description to linking to relevant issues.<br>Learn how to structure your pull requests to tell a story about your changes. We'll discuss the importance of writing atomic commits, providing a detailed summary of what was changed and why, and using proper branching strategies. This will make your pull requests easier for your teammates to review and understand.<br>Effective pull requests don't just get code merged; they build a culture of shared responsibility and quality. By following these guidelines, you'll not only improve your own contributions but also become a valuable asset to any development team.",
    publishedAt: getRandomDate(),
  },
  {
    id: randomUUID(),
    title: "CSS Grid vs. Flexbox: Knowing When to Use What",
    imageUrl:
      "https://fastly.picsum.photos/id/459/392/240.jpg?hmac=mEqy4ALTgvrDR-r1fNcM0-gKfndFwamnzmlIQzUcTYM",
    content:
      "Are you confused about when to use CSS Grid and when to use Flexbox? You're not alone. This article clarifies the distinction between these two powerful layout systems and provides practical examples to help you decide which tool is right for the job. We'll break down their core purposes and capabilities.<br>We'll explore how Flexbox excels at one-dimensional layouts (e.g., aligning items in a row or a column) and is perfect for components like navigation bars and forms. In contrast, we'll see how CSS Grid is a two-dimensional system ideal for creating complex, responsive page layouts.<br>By the end of this guide, you'll have a clear mental model for when to reach for Flexbox and when to use CSS Grid. This knowledge will enable you to write cleaner, more maintainable CSS and build responsive layouts with confidence.",
    publishedAt: getRandomDate(),
  },
  {
    id: randomUUID(),
    title:
      "An Introduction to Headless CMS: A Modern Approach to Content Management",
    imageUrl:
      "https://fastly.picsum.photos/id/947/392/240.jpg?hmac=GJdPTuAiKdyj5GAAcPmo6w5pI89q1d4N9vxyqFB6Dl8",
    content:
      "Move beyond traditional, monolithic content management systems. This post introduces the concept of a headless CMS and explains why it's a game-changer for modern web development. We'll explore how it decouples the content from the presentation layer, giving developers the flexibility to use their favorite front-end frameworks.<br>We'll discuss the benefits of a headless approach, including improved performance, enhanced security, and the ability to deliver content to multiple platforms and devices. We'll also look at popular headless CMS options like Strapi and Sanity and how they can streamline your content workflow.<br>This article is for any developer looking to build a more flexible and future-proof website. Learn how to integrate a headless CMS into your stack to create dynamic, data-driven applications that are both powerful and easy to manage.",
    publishedAt: getRandomDate(),
  },
  {
    id: randomUUID(),
    title: "Optimizing Web Performance: A Practical Guide to Faster Websites",
    imageUrl:
      "https://fastly.picsum.photos/id/163/392/240.jpg?hmac=saF4jXul1TCKOgUWitCvrQyZLP-hOSFUDTnQQ0BFpNE",
    content:
      "Slow websites frustrate users and hurt your bottom line. This post provides a practical guide to optimizing web performance, covering key metrics and actionable strategies to make your sites load faster. We'll dive into techniques like image optimization, lazy loading, and code splitting.<br>Learn how to use browser developer tools to diagnose performance bottlenecks and identify areas for improvement. We'll show you how to analyze metrics like First Contentful Paint (FCP) and Largest Contentful Paint (LCP) and how to improve them by optimizing your assets and server responses.<br>A fast website is a better website. By following the tips in this guide, you can significantly improve your site's user experience, search engine rankings, and overall success.",
    publishedAt: getRandomDate(),
  },
  {
    id: randomUUID(),
    title:
      "Mastering Asynchronous JavaScript: Promises, Async/Await, and Beyond",
    imageUrl:
      "https://fastly.picsum.photos/id/637/392/240.jpg?hmac=TmwFloTB5arGtWTQ31c_t_1T8aC7OuIkwG91ZMeBLnc",
    content:
      "Asynchronous programming is a fundamental part of modern JavaScript. This article demystifies the concepts of Promises and the async/await syntax, providing clear explanations and practical examples to help you handle asynchronous operations without getting tangled in callback hell.<br>We'll start with the basics of what asynchronous code is and why it's necessary. Then, we'll explore how Promises provide a cleaner way to handle async operations, and how the async/await syntax makes your asynchronous code look and behave like synchronous code, making it far easier to read and debug.<br>By the end of this guide, you'll have a solid understanding of how to manage complex asynchronous tasks effectively. This will empower you to write cleaner, more maintainable code for everything from fetching data from an API to handling file I/O.",
    publishedAt: getRandomDate(),
  },
  {
    id: randomUUID(),
    title: "The Ultimate Guide to Git: From Basics to Branching Strategies",
    imageUrl:
      "https://fastly.picsum.photos/id/362/392/240.jpg?hmac=tX7aKWFJnOX8b5YnOuhayLLpq0JcSGCdGNkBjDSlFFs",
    content:
      "Git is the cornerstone of modern software development, but it can be intimidating for beginners. This comprehensive guide walks you through the essentials of Git, from basic commands like commit and push to more advanced concepts like branching, merging, and rebasing.<br>We'll start with setting up your Git environment and making your first commit. Then, we'll move on to a deeper dive into branching strategies like Git Flow and GitHub Flow, and how to resolve merge conflicts without losing your mind. We'll also cover essential commands for navigating your commit history.<br>Mastering Git is a skill that will serve you throughout your entire career. This guide will give you the confidence to manage your projects effectively, collaborate seamlessly with your team, and undo mistakes without fear.",
    publishedAt: getRandomDate(),
  },
  {
    id: randomUUID(),
    title:
      "Web Accessibility (a11y) for Developers: Building Inclusive Experiences",
    imageUrl:
      "https://fastly.picsum.photos/id/779/392/240.jpg?hmac=vv5hs2fc-WZVhSwyIUOY0CW4EECwd70GQRb-nvRBKMk",
    content:
      "Building accessible websites isn't just a legal requirement; it's a moral imperative. This post introduces the principles of web accessibility (a11y) and provides developers with practical steps to ensure their websites can be used by everyone, regardless of ability. We'll cover topics like semantic HTML, ARIA attributes, and keyboard navigation.<br>We'll explain why semantic HTML is the foundation of accessible web design and how to use it correctly. We'll also show you how to use ARIA roles and attributes to provide context to assistive technologies and how to test your site's accessibility using tools like Lighthouse and screen readers.<br>Building with accessibility in mind from the start is easier than fixing it later. This guide will give you the knowledge and tools to create digital experiences that are not only beautiful but also inclusive and usable for all.",
    publishedAt: getRandomDate(),
  },
  {
    id: randomUUID(),
    title:
      "Introduction to Serverless Computing: A Developer's Guide to AWS Lambda",
    imageUrl:
      "https://fastly.picsum.photos/id/877/392/240.jpg?hmac=HWjzlqlfaIalEZA371kUl0Uw_dv6LaFpDZJrnH8H39g",
    content:
      "Ready to build and deploy applications without worrying about servers? This introduction to serverless computing explains the core concepts and shows you how to get started with AWS Lambda. We'll walk through setting up your first Lambda function, a fundamental building block of serverless architecture.<br>We'll cover the benefits of serverless, such as automatic scaling, reduced operational costs, and simplified deployment. We'll also explain how serverless functions work in response to events and how they can be integrated with other AWS services to build powerful and scalable applications.<br>This post is a perfect starting point for any developer curious about serverless technology. By the end, you'll have a clear understanding of what serverless is and how you can use it to build efficient and cost-effective applications.",
    publishedAt: getRandomDate(),
  },
];

const schema = `
  DROP TABLE IF EXISTS comments;
  DROP TABLE IF EXISTS posts;
  DROP TABLE IF EXISTS sessions;
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS roles;

  CREATE TABLE roles (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
  );

  CREATE TABLE users (
    id TEXT PRIMARY KEY,
    login TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    salt TEXT NOT NULL,
    role_id INTEGER NOT NULL,
    registered_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles (id)
  );

  CREATE TABLE sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    expires_at INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
  );

  CREATE TABLE posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    content TEXT NOT NULL,
    published_at TEXT NOT NULL
  );

  CREATE TABLE comments (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    author_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES users (id),
    FOREIGN KEY (post_id) REFERENCES posts (id)
  );

  CREATE INDEX IF NOT EXISTS idx_users_login ON users (login);
  CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions (user_id);
  CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions (expires_at);
`;

console.log("Initializing schema...");
db.exec(schema);
console.log("Seeding data...");

const insertRole = db.prepare(`
  INSERT INTO roles (id, name)
  VALUES (@id, @name)
`);
const insertUser = db.prepare(`
  INSERT INTO users (id, login, password, salt, role_id, registered_at, updated_at)
  VALUES (@id, @login, @password, @salt, @roleId, @registeredAt, @updatedAt);
`);
const insertPost = db.prepare(`
  INSERT INTO posts (id, title, image_url, content, published_at)
  VALUES (@id, @title, @imageUrl, @content, @publishedAt);
`);

const seed = db.transaction(() => {
  roles.forEach((role) => insertRole.run(role));
  users.forEach((user) => insertUser.run(user));
  posts.forEach((post) => insertPost.run(post));
});

seed();
db.close();
console.log("Database is created.");
