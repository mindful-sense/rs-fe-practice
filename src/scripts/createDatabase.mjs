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

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

const getPostId = (title) => `${slugify(title)}-${randomUUID().split("-")[0]}`;

const roles = [
  { id: 0, name: "Admin" },
  { id: 1, name: "Moderator" },
  { id: 2, name: "Reader" },
  { id: 3, name: "Guest" },
];

const userIds = {
  userVova: randomUUID(),
  sergeyDev: randomUUID(),
  kateRock: randomUUID(),
  denisPro: randomUUID(),
  lisaM: randomUUID(),
  ivanIvanov: randomUUID(),
  techLead: randomUUID(),
  guest99: randomUUID(),
  olgaArt: randomUUID(),
  maxPower: randomUUID(),
  dmitriyK: randomUUID(),
  annaJoy: randomUUID(),
  borisT: randomUUID(),
  elenaW: randomUUID(),
  pavel88: randomUUID(),
  igorDev: randomUUID(),
  ninaSky: randomUUID(),
};

const postIds = [
  getPostId("The Quiet Revolution: Mastering Mindfulness in a Noisy World"),
  getPostId("Unlocking Flow: How Mindfulness Fuels Peak Performance"),
  getPostId("The Inner Fortress: Emotional Resilience Through Mindfulness"),
  getPostId("Silence in the Static: Mindfulness Strategies for Anxiety Relief"),
  getPostId("From Chaos to Clarity: Mindfulness as a Catalyst for Creativity"),
  getPostId("The Age of Connection: Mindfulness and Detachment"),
  getPostId("The Sleep Sanctuary: Mindfulness for Restorative Rest"),
  getPostId("Transforming Relationships Through Mindful Communication"),
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
    id: userIds.userVova,
    login: "user_vova",
    password:
      "9462fd0379112a5ffd8c7e65c98ea098f196eff2345b7a93f82319f022ef6f78ab49ec925bc22ff2151d2428f12a2143e5b1729d0089394501cc16a536c14933", // qwe123!
    salt: "89064e539061c45e3fd3b0958444d54a",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: userIds.sergeyDev,
    login: "sergey_dev",
    password:
      "c05fea44b4a8611af03dbb815719aaa3ddefd065871a2e8fd49246de8d11a339e9821d66b3ce1651d421984ffd7c8d91d3fc2830f5492fcd51585b1c34230fa0", // qwe123!
    salt: "f0f65c7df1a4a1234e5a09bfd3ae16e8",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: userIds.kateRock,
    login: "kate_rock",
    password:
      "3c0791b78b2bdf8d47fd3792f13437e321e554689e8dc4f496563c4821b5a1cd76550c0a4180d491e4122c81e4f1a49223fd0a29fb197be69072032a5499da8f", // qwe123!
    salt: "6af845dd78106cfbd59ffb2b5b08c693",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: userIds.denisPro,
    login: "denis_pro",
    password:
      "ea0bea3edb183dcbad68f34463823e442d7e7f617bde5ef528ed1ce3f8e293db9f94c1c65cd4fcc4d9c427dc868c86cbcfa4bc5267dff0fa7e49a6dce3b6a8cb", // qwe123!
    salt: "7f883ec89626df93ca2487649ce90c56",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: userIds.lisaM,
    login: "lisa_m",
    password:
      "c216978a8c1ab2c5011200498c487af5e221a92eff5fc485ae17c21d79c9250e50a9171ca12d563f5296f0b9cdc614bf9bfe1e86c8c44c4736f305e3fdefebdf", // qwe123!
    salt: "149b7f3c19135b10137f5ca27dfb51bc",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: userIds.ivanIvanov,
    login: "ivan_ivanov",
    password:
      "495b98be200794323316abe3d1238ba7b45e877dbc62d1de3fe1f665eb9a3cfc4f5f89b55b14c97dfbbcbdea9bb7bc0fb19325f38cb3b3e280b1500c08c7936a", // qwe123!
    salt: "d6def408f9ea16e53c0e91d85fb0441a",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: userIds.techLead,
    login: "tech_lead",
    password:
      "0aa25d286b0a52141bc7890a327d389349ed50c05dee33507ded3ffa82d464e9a164aa50d1686a9b5bba19a63a72219dbd7f0d539ea609f9e12fb887cae1649e", // qwe123!
    salt: "8e9452d07843f09e6f8b937761ba62fd",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: userIds.guest99,
    login: "guest_99",
    password:
      "829a14f87a5caefb07c9d23e064b1c9eeb74a88759e56c030a3a8d9ecb8b5f3b58ebb644de3019bc8e56e65d443de39d04e55dd74dccd65baa95cbe6cb1c5abb", // qwe123!
    salt: "3baa3dc4ce88651e2f09d8c2796aee6e",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: userIds.olgaArt,
    login: "olga_art",
    password:
      "1e8f8e2c337d06c141672249be3d9dc29468731123620afab8ec7633c9e3324001c6c7568ed57e4aa10fda5a5d8094ccf3d7e3efc1c8a25b1762b8679f526f1f", // qwe123!
    salt: "bdb10556f80cd146b8aae8289a00b87b",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: userIds.maxPower,
    login: "max_power",
    password:
      "a124c227349911af7b46c663d10cde0a7078ce8ac36e31de3771e49c8aa2270a5b185bf9365ec3302340b26f51d6695b0416720ad697c1e49c350fa66d095717", // qwe123!
    salt: "7cc622950b1fe2a861fcab042e5e6086",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: userIds.dmitriyK,
    login: "dmitry_k",
    password:
      "6a25b596e147579c08cf972018672cb198de4c2df03b93bf5172af1aeb32a489fc90633f5bd24ac287b3c7fbf59a47d319cd7c94e39004558b4efe0291e1be1e", // qwe123!
    salt: "d6b3cd34014f34c82f3fd092f6d89a34",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: userIds.annaJoy,
    login: "anna_joy",
    password:
      "0986365d6ac76aab8a21e5ba36f1cb8a61c8b1c9234c3a9fd7c90edc01e6139e6eabed6abe332f7e5395a5bcf453893bf5f55b3d2efdb24fdc0c08885ab833ac", // qwe123!
    salt: "2dda9355b34854e6d38ec2f0c3199b6d",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: userIds.borisT,
    login: "boris_t",
    password:
      "03498336f109a86e99dd492bd01844c90d12811cce72f4ae546fb4dc9b325678d73520c20aa5fbe118614ce1a1cb5d0dc99a7ed30e901cd099e8674e7e2e51b7", // qwe123!
    salt: "c82f1867c3fa5d41f572dcd9f268b5c3",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: userIds.elenaW,
    login: "elena_w",
    password:
      "9bcfb82b6f4d5c45b230fc6255d62d32616007e99b70dfd7c9f20da6593c81b4d8e61d659488b662247ecb90552e72387a8a8b41d945f2ff8c964da4ab273849", // qwe123!
    salt: "2f32e9cd2b238d5e08297743643e4278",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: userIds.pavel88,
    login: "pavel_88",
    password:
      "91283b15083db926506d9c747cdb92b443b372b02882f523d8c3d0683fa7fc8e543074dc276637acdc0fa92f5ab8fae388e2b4c0053beddb7ad8059971f5f625", // qwe123!
    salt: "8515325f57dadee6481de3aaed92a117",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: userIds.igorDev,
    login: "igor_dev",
    password:
      "2dbb4dbc8e085e09c12a2bf57dae9c5a39508c0c7434c06fab8868390609e1ca6d6bfe78f1a8659bf7e8d50b580c6c533ff46b4f1c145f6e4b40a62648f274fc", // qwe123!
    salt: "b062d17d3ea1e0a955c817d113d771d6",
    roleId: 2,
    registeredAt: getRandomDate(),
    updatedAt: getRandomDate(),
  },
  {
    id: userIds.ninaSky,
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
    id: postIds[0],
    h1: "The Quiet Revolution: Mastering Mindfulness in\u00A0a\u00A0Noisy World",
    lead: "In an era defined by constant connectivity and information overload, the ancient practice of mindfulness has transitioned from a spiritual luxury to a cognitive necessity. This guide explores how silence can become your loudest asset.",
    content: JSON.stringify([
      {
        paragraphs: [
          "For decades, meditation was viewed through a purely mystical lens, but modern neuroscience has radically shifted this perspective. MRI scans of long-term practitioners reveal increased gray matter density in the prefrontal cortex, the area responsible for executive function and emotional regulation.",
          "Simultaneously, the practice shrinks the amygdala, the brain's \u201Cfight or flight\u201D center. This biological restructuring explains why mindfulness isn't just about feeling good in the moment; it is a fundamental training of the brain to process stress differently.",
        ],
      },
      {
        h3: "Core Techniques for Beginners",
        paragraphs: [
          "Starting a meditation practice does not require a retreat in the mountains or complete silence. It begins with the simple intention to pay attention. Below are the foundational pillars of a sustainable practice.",
          "The foundational pillars of a sustainable practice include focused attention on the rhythm of the breath to anchor the mind, body scanning to release physical tension by moving awareness through the body, open monitoring to observe thoughts without judgment, and cultivating loving-kindness to dissolve feelings of isolation and anger.",
        ],
      },
      {
        h3: "Navigating Common Obstacles",
        paragraphs: [
          "The most common misconception is that meditation requires you to \u201Cstop thinking\u201D. This is biologically impossible and sets beginners up for failure. The goal is not to silence the mind, but to change your relationship with your thoughts.",
          "When distraction occurs—and it will—the practice lies in the moment you notice the distraction. That split second of awareness is the \u201Crep\u201D that strengthens your mental muscle, not the duration of silence itself.",
          "Consistency trumps intensity. Five minutes of daily practice yields better neurological results than a single hour-long session once a week. Building the habit is the primary challenge.",
        ],
      },
      {
        h3: "Integrating Awareness into Daily Life",
        paragraphs: [
          "True mindfulness extends beyond the cushion. It is the act of washing dishes while only washing dishes, listening to a colleague without planning your response, and tasting your food without scrolling through a phone.",
          "By bringing this quality of attention to mundane tasks, we transform routine into ritual. This integration creates a \u201Cbuffer zone\u201D in our psyche, allowing us to respond to life's challenges with clarity rather than reacting with impulse.",
        ],
      },
    ]),
    conclusion:
      "Mindfulness is not a destination of eternal bliss, but a courageous journey of returning to the here and now, again and again.",
    publishedAt: getRandomDate(),
    imagePreview: "https://picsum.photos/id/10/392/240",
    imageLead: "https://picsum.photos/id/10/1024/400",
  },
  {
    id: postIds[1],
    h1: "Unlocking Flow: How Mindfulness Fuels Peak Performance",
    lead: "In the high-stakes world of modern business and athletics, the competitive edge is no longer just physical—it is mental. Discover how silencing the noise can amplify your potential and induce the flow state.",
    content: JSON.stringify([
      {
        paragraphs: [
          "Many view meditation merely as a stress-relief tool, akin to a warm bath. While relaxation is a welcome byproduct, the primary utility of mindfulness for high performers is cognitive optimization.",
          "By training the mind to focus on a single point of reference, we counteract the fragmentation caused by digital distractions. This creates a state of \u201Calert relaxation\u201D, which is the optimal baseline for deep work and creativity.",
        ],
      },
      {
        h3: "The Science of Cognitive Control",
        paragraphs: [
          "Neuroplasticity research indicates that regular mindfulness practice strengthens the anterior cingulate cortex. This brain region is pivotal for attention regulation and error detection.",
          "When we practice returning our attention to the breath, we are essentially doing \u201Creps\u201D for our focus muscles. Over time, this results in the ability to sustain concentration for longer periods without mental fatigue.",
          "Furthermore, reduced cortisol levels prevent the brain from shifting into survival mode, preserving energy for creative problem-solving and strategic thinking.",
        ],
      },
      {
        h3: "Actionable Protocols for Leaders",
        paragraphs: [
          "Integrating mindfulness into a busy schedule requires micro-habits rather than massive lifestyle overhauls. Here are effective strategies used by industry leaders to maintain clarity.",
          "Effective strategies used by industry leaders involve taking a transition pause with three conscious breaths before new tasks, checking for email apnea to resume normal breathing, practicing walking meditation to ground awareness physically, utilizing the \u201CJust Like Me\u201D practice to build compassion, implementing a digital sunset one hour before sleep, and using gratitude bookends to shift cognitive bias towards positivity.",
        ],
      },
      {
        h3: "Sustaining the Practice",
        paragraphs: [
          "The journey to mindful peak performance is non-linear. There will be days of clarity and days of noise. The victory lies not in constant silence, but in the commitment to return to the present moment, regardless of the chaos around you.",
        ],
      },
    ]),
    conclusion:
      "True power is not control over the external world, but mastery over your internal landscape.",
    publishedAt: getRandomDate(),
    imagePreview: "https://picsum.photos/id/11/392/240",
    imageLead: "https://picsum.photos/id/11/1024/400",
  },
  {
    id: postIds[2],
    h1: "The Inner Fortress: Emotional Resilience Through Mindfulness",
    lead: "In a world characterized by rapid change and uncertainty, emotional resilience is the definitive skill of the 21st century. Mindfulness offers not just a refuge, but a rigorous training ground for the mind to withstand and grow from adversity.",
    content: JSON.stringify([
      {
        paragraphs: [
          "Most of us live in a state of constant reactivity. An email triggers anxiety; a comment sparks anger. This stimulus-response loop is biologically hardwired for survival, yet in the modern world, it often leads to chronic stress and burnout.",
          "Mindfulness introduces a critical wedge of awareness between the trigger and the reaction. Viktor Frankl famously called this the \u201Cspace\u201D where our freedom lies. By cultivating this space, we transition from being victims of circumstance to architects of our emotional experience.",
        ],
      },
      {
        h3: "The Anatomy of Resilience",
        paragraphs: [
          "Resilience is often mistaken for toughness or the suppression of emotion. True resilience, however, is the ability to bounce back—to feel deeply but recover quickly. A mindful approach to emotional health involves several key components.",
          "The anatomy of resilience is built upon emotional granularity to name feelings, non-judgmental observation of emotions as passing weather, acceptance of reality to create a foundation for action, and self-compassion to accelerate recovery, supported by micro-habits such as a sixty-second reset, mindful listening, and daily gratitude journaling.",
        ],
      },
      {
        h3: "Micro-Habits for Mental Strength",
        paragraphs: [
          "Building resilience doesn't require hours of silence. It is built through small, consistent acts of awareness throughout the day.",
          "Once a day, stop everything for one minute. Close your eyes and focus solely on the sensation of air entering your nostrils. In your next conversation, listen to understand rather than to reply. Notice when your mind drifts to your own agenda and gently bring it back. Write down three things that went well today. This trains the brain to scan the environment for positives, counteracting our natural negativity bias.",
        ],
      },
      {
        h3: "The Long-Term Shift",
        paragraphs: [
          "Over time, these practices physically alter the brain's structure. The connection between the prefrontal cortex and the emotional centers becomes stronger, allowing for better top-down regulation of feelings.",
          "This doesn't mean life stops being difficult. It means you stop adding unnecessary suffering to the inevitable pain of life. You become the mountain, grounded and unshakeable, regardless of the weather passing around you.",
        ],
      },
    ]),
    conclusion:
      "Resilience is a practice, not a personality trait. Start where you are, breathe, and begin again.",
    publishedAt: getRandomDate(),
    imagePreview: "https://picsum.photos/id/12/392/240",
    imageLead: "https://picsum.photos/id/12/1024/400",
  },
  {
    id: postIds[3],
    h1: "Silence in\u00A0the\u00A0Static: Mindfulness Strategies for\u00A0Anxiety Relief",
    lead: "In an age of perpetual uncertainty, anxiety has become a silent epidemic. Mindfulness offers a proven antidote, not by eliminating stress, but by fundamentally altering our physiological and psychological response to it.",
    content: JSON.stringify([
      {
        paragraphs: [
          "Anxiety is often described as a mental state, but it is primarily a physiological event. When the amygdala perceives a threat—real or imagined—it floods the body with cortisol and adrenaline. This ancient survival mechanism, designed to outrun predators, is now triggered by email notifications and deadline pressures.",
          "Mindfulness acts as a manual override for this system. By consciously directing attention to the breath or bodily sensations, we engage the parasympathetic nervous system. This signals to the brain that the immediate danger has passed, allowing the heart rate to slow and clarity to return.",
        ],
      },
      {
        h3: "Immediate Grounding Techniques",
        paragraphs: [
          "When anxiety spikes, abstract philosophy is useless. You need concrete, somatic tools to anchor yourself back in the present reality.",
          "Immediate grounding involves the 5-4-3-2-1 method to engage the senses, box breathing to downregulate the nervous system, and tactile anchoring to shock the system out of panic loops, while a non-anxious lifestyle is cultivated through caffeine consciousness, news rationing, nature immersion, and prioritizing sleep as a non-negotiable need.",
        ],
      },
      {
        h3: "Cognitive Defusion: You Are Not Your Thoughts",
        paragraphs: [
          "A core tenet of mindfulness is the realization that thoughts are mental events, not facts. Anxiety thrives on fusion—the belief that the catastrophic story your mind is telling is absolute truth.",
          "Through practice, we learn to observe these thoughts with detachment, much like watching clouds drift across the sky. We note them—\u201CThere is a worry about the future\u201D—without boarding the train of that thought. This distance prevents the spiral from taking hold.",
          "This shift from \u201CI am anxious\u201D to \u201CI am experiencing a feeling of anxiety\u201D is subtle but transformative. It creates a container large enough to hold the emotion without being consumed by it.",
        ],
      },
      {
        h3: "Cultivating a Non-Anxious Lifestyle",
        paragraphs: [
          "Prevention is more effective than cure. Specific lifestyle adjustments can lower your baseline arousal levels, making you less susceptible to triggers.",
          "Be aware that caffeine mimics the symptoms of anxiety (racing heart, jitters). Reducing intake can significantly lower physiological noise. Limit consumption of news to specific windows. Constant exposure to global crises keeps the amygdala in a state of hyper-vigilance.",
          "Spending 20 minutes in a green space has been clinically shown to lower cortisol levels and restore attention span. Prioritize sleep as a non-negotiable biological need. A sleep-deprived brain is significantly more reactive to negative stimuli.",
        ],
      },
    ]),
    conclusion:
      "Anxiety may be a part of the human experience, but it does not have to be the driver. With mindfulness, we reclaim the steering wheel.",
    publishedAt: getRandomDate(),
    imagePreview: "https://picsum.photos/id/13/392/240",
    imageLead: "https://picsum.photos/id/13/1024/400",
  },
  {
    id: postIds[4],
    h1: "From Chaos to\u00A0Clarity: Mindfulness as\u00A0a\u00A0Catalyst for\u00A0Creativity",
    lead: "In a world obsessed with relentless productivity, true innovation often requires the courage to pause. Mindfulness is not just a tool for relaxation; it is the ultimate hack for unlocking the latent creative potential within the human mind.",
    content: JSON.stringify([
      {
        paragraphs: [
          "Creativity is often romanticized as a mystical strike of lightning, but neurologically, it relies on the brain's ability to make novel connections between disparate ideas. Stress and mental clutter inhibit this process by keeping the brain in a high-beta wave state, focused on immediate survival and execution.",
          "Mindfulness shifts the brain into an alpha wave state, associated with relaxation and daydreaming. It quiets the \u201CDefault Mode Network\u201D—the inner critic that constantly edits and judges our thoughts—allowing wild, unconventional ideas to bubble up to the surface without premature censorship.",
        ],
      },
      {
        h3: "Breaking the Autopilot Loop",
        paragraphs: [
          "Most of our daily lives are spent in cognitive autopilot, reacting to stimuli based on past patterns. While efficient for survival, this is the enemy of creativity, which demands seeing the familiar in a new light. Mindfulness disrupts these automatic patterns through specific cognitive shifts.",
          "Disrupting autopilot requires de-automating perception, embracing ambiguity, enhancing divergent thinking, and reducing cognitive rigidity, aided by rituals such as open monitor sessions, mindful walking, sensory grounding before work, non-judgmental brainstorming, and deep listening to instrumental music.",
        ],
      },
      {
        h3: "Cultivating \u201CShoshin\u201D (Beginner's Mind)",
        paragraphs: [
          "In Zen Buddhism, \u201CShoshin\u201D refers to the \u201Cbeginner's mind\u201D—an attitude of openness and eagerness, and lack of preconceptions. The expert asks: \u201CDoes this work?\u201D The beginner asks: \u201CWhat is this?\u201D",
          "Mindfulness trains us to return to this state of wonder. By stripping away our expertise and expectations, we can approach a blank canvas, a coding problem, or a business strategy with fresh eyes, seeing possibilities that experience often blinds us to.",
        ],
      },
      {
        h3: "Practical Rituals for Creative Flow",
        paragraphs: [
          "You do not need to be a monk to harness this power. Integrating simple mindfulness rituals into your creative workflow can act as a trigger for the flow state.",
          "Sit for five minutes and simply observe sounds and thoughts as they pass, without latching onto them. This clears the mental cache. Take a walk without a destination or a phone. Focus solely on the rhythm of your gait. Many great thinkers, from Nietzsche to Jobs, swore by this for idea generation. Before starting work, spend one minute feeling the texture of your desk or the weight of your body in the chair to anchor your focus.",
          "Practice generating ideas while explicitly suspending the critical voice. Write down everything, no matter how absurd, to bypass the internal editor. Listen to a piece of instrumental music, tracking a single instrument. This hones the muscle of sustained attention required for deep work.",
        ],
      },
    ]),
    conclusion:
      "Creativity is a whisper that can only be heard when the noise stops. Mindfulness provides the silence.",
    publishedAt: getRandomDate(),
    imagePreview: "https://picsum.photos/id/14/392/240",
    imageLead: "https://picsum.photos/id/14/1024/400",
  },
  {
    id: postIds[5],
    h1: "The\u00A0Age of\u00A0Connection: Mindfulness and\u00A0Detachment",
    lead: "We live in a world that demands our constant availability. But true connection—to ourselves and others—requires the ability to disconnect. Here is how mindfulness serves as the ultimate digital shield.",
    content: JSON.stringify([
      {
        paragraphs: [
          "In the attention economy, your focus is the product. Every notification, ping, and infinite scroll is engineered to fragment your awareness. The result is a state of \u201Ccontinuous partial attention\u201D, where we are present everywhere digitally, but nowhere physically.",
          "Mindfulness stands in direct opposition to this algorithmic design. It is the radical act of reclaiming your cognitive sovereignty. By training the mind to notice when it has been hijacked by a screen, we move from compulsive consumption to conscious choice.",
        ],
      },
      {
        h3: "Recognizing Digital Fatigue",
        paragraphs: [
          "The impact of screen dependency is not just psychological; it is physiological. Recognizing the symptoms is the first step toward reclaiming your health.",
          "Symptoms of digital fatigue including phantom vibrations, screen apnea, doomscrolling, and morning urgency are mitigated by protocols like grayscale mode, no-phone zones, the 20-20-20 rule for optical reset, single-tasking during deep work, batching notifications, and observing analog weekends.",
        ],
      },
      {
        h3: "Rewiring Dopamine Pathways",
        paragraphs: [
          "Social media platforms utilize variable reward schedules—the same mechanism found in slot machines—to release dopamine. This creates a loop of anticipation and seeking that overrides our higher executive functions.",
          "Mindfulness breaks this loop by introducing a pause. When the urge to check arises, we observe the craving without acting on it. This \u201Curge surfing\u201D weakens the neural pathway of addiction over time.",
          "Crucially, this practice teaches us to sit with boredom. Boredom is not a defect; it is the fertile soil from which creativity and self-reflection grow. When we numb boredom with screens, we kill our potential for depth.",
        ],
      },
      {
        h3: "Protocols for Mindful Tech Usage",
        paragraphs: [
          "Digital detachment does not mean becoming a Luddite. It means using technology as a tool rather than a pacifier. Here are practical boundaries to establish.",
          "Switch your phone to black and white. Removing color makes the screen less stimulating and reduces the dopamine hit. Designate specific areas, such as the bedroom or the dining table, as sacred spaces where devices are physically banned. Every 20 minutes, look at something 20 feet away for 20 seconds to reset your optical focus and mental perspective.",
          "Commit to having only one browser tab open at a time during deep work sessions. Configure apps to deliver notifications only at set times during the day, rather than in real-time. Commit to a 24-hour period once a week where you disconnect completely to reset your baseline stimulation levels.",
        ],
      },
      {
        h3: "The Return to Reality",
        paragraphs: [
          "As the digital fog lifts, the richness of the physical world returns. Conversations become deeper, food tastes better, and the anxiety of \u201Cmissing out\u201D is replaced by the joy of missing out (JOMO).",
          "This is the ultimate promise of digital mindfulness: to be fully alive in a real world, rather than half-alive in a virtual one.",
        ],
      },
    ]),
    conclusion:
      "The device in your pocket is a portal to the world, but don't let it become a barrier to your soul.",
    publishedAt: getRandomDate(),
    imagePreview: "https://picsum.photos/id/15/392/240",
    imageLead: "https://picsum.photos/id/15/1024/400",
  },
  {
    id: postIds[6],
    h1: "The Sleep Sanctuary: Mindfulness for\u00A0Restorative Rest",
    lead: "Sleep is not merely the absence of waking; it is a complex biological restoration. In a culture of burnout, mindfulness bridges the gap between a racing mind and the deep surrender required for true rest.",
    content: JSON.stringify([
      {
        paragraphs: [
          "Modern insomnia is rarely about an inability to sleep; it is about an inability to stop trying to sleep. The brain, stuck in a loop of problem-solving and anticipation, views the pillow as another task to be managed.",
          "Mindfulness dismantles this loop by shifting the objective. Instead of striving for unconsciousness—which is a paradox, as you cannot \u201Ctry\u201D to relax—we aim simply to rest the body. We give up the battle for sleep and accept the offer of rest.",
          "This surrender sends a powerful safety signal to the parasympathetic nervous system. When we stop fighting the wakefulness, the adrenaline spike subsides, and sleep often follows naturally as a byproduct of peace.",
        ],
      },
      {
        h3: "Designing the Pre-Sleep Ritual",
        paragraphs: [
          "The transition from the high-beta waves of the workday to the delta waves of deep sleep requires a buffer zone. A mindful evening routine is a series of cues that tell the body it is safe to power down.",
          "This ritual is not a chore list, but a sacred deceleration. It involves engaging the senses to ground the mind in the physical present, away from the abstract worries of tomorrow.",
        ],
      },
      {
        h3: "Emergency Protocols for Night Waking",
        paragraphs: [
          "Waking up at 3 AM is a common phenomenon known as \u201Cmaintenance insomnia\u201D. The key is to avoid the panic spiral that usually ensues.",
          "A restorative evening ritual consists of a digital twilight period, journaling to externalize worries, thermal regulation through warm baths, utilizing scent association for sleep cues, and reflecting on gratitude, while night waking is managed through the twenty-minute rule, cognitive shuffling, and non-sleep deep rest techniques.",
        ],
      },
    ]),
    conclusion:
      "Rest is a biological imperative, not a negotiation. By respecting the transition into darkness, we reclaim our days.",
    publishedAt: getRandomDate(),
    imagePreview: "https://picsum.photos/id/16/392/240",
    imageLead: "https://picsum.photos/id/16/1024/400",
  },
  {
    id: postIds[7],
    h1: "Transforming Relationships Through Mindful Communication",
    lead: "In an era of digital noise, the quality of our attention has become the ultimate currency of love. Mindful communication moves us from transactional exchanges to transformative connections.",
    content: JSON.stringify([
      {
        paragraphs: [
          "Most of us do not listen with the intent to understand; we listen with the intent to reply. We are constantly drafting our rebuttal or advice while the other person is still speaking, effectively severing the connection before it even begins.",
          "Mindful listening requires a radical suspension of the self. It means dropping your agenda, your judgments, and your need to be right, creating a vacuum of space where the other person can truly be heard and felt.",
        ],
      },
      {
        h3: "The Sacred Pause",
        paragraphs: [
          "Between a stimulus (what is said) and your response lies a moment of choice. Cultivating this pause is the difference between a constructive dialogue and a destructive argument.",
          "Cultivating the sacred pause involves the three-second rule before responding, performing a somatic check-in to relax tension, mirroring to validate the speaker, and anchoring focus with eye contact, while conflict is navigated using 'I' statements, avoiding absolutes, validating perspectives, making repair attempts, seeking compassionate closure, and maintaining silent presence.",
        ],
      },
      {
        h3: "Speaking with Intention",
        paragraphs: [
          "Mindful speech is not about being passive; it is about being precise. It filters impulsive reactions through the gate of wisdom.",
          "Before speaking, apply the ancient filter: Is it true? Is it necessary? Is it kind? If it fails these tests, silence is often the more powerful contribution.",
          "This discipline prevents the leakage of toxic energy that often occurs when we vent without awareness, protecting the emotional safety of the relationship.",
        ],
      },
      {
        h3: "Navigating Conflict with Grace",
        paragraphs: [
          "Conflict is inevitable, but combat is optional. Mindfulness allows us to disagree without becoming disagreeable.",
          "Use \u201CI\u201D statements (\u201CI feel overwhelmed\u201D) rather than accusatory \u201CYou\u201D statements (\u201CYou are messy\u201D), which trigger defensiveness. Eliminate words like \u201Calways\u201D and \u201Cnever\u201D from your vocabulary. They are rarely factually true and always escalate tension. Acknowledge the other person's perspective as valid for them, even if you disagree with their conclusion.",
          "Learn to recognize when a conversation has gone off the rails and have the courage to say, \u201CCan we start over?\u201D. End difficult conversations with an affirmation of the relationship's value, ensuring the connection survives the conflict. Sometimes the most profound communication happens in shared silence, holding space for emotions that words cannot contain.",
        ],
      },
    ]),
    conclusion:
      "Communication is the bridge between souls. Build it with the bricks of presence and the mortar of kindness.",
    publishedAt: getRandomDate(),
    imagePreview: "https://picsum.photos/id/17/392/240",
    imageLead: "https://picsum.photos/id/17/1024/400",
  },
];

const comments = [
  {
    id: randomUUID(),
    content:
      "Finally, an explanation that doesn't just say \u201Cclear your mind\u201D. The point about brain plasticity is fascinating.",
    authorId: userIds.annaJoy,
    postId: postIds[0],
  },
  {
    id: randomUUID(),
    content:
      "I've been doing the body scan for a week and my sleep has improved drastically.",
    authorId: userIds.borisT,
    postId: postIds[0],
  },
  {
    id: randomUUID(),
    content:
      "The \u201CConsistency trumps intensity\u201D part is exactly what I needed to hear. I was trying too hard.",
    authorId: userIds.denisPro,
    postId: postIds[0],
  },
  {
    id: randomUUID(),
    content:
      "Can you elaborate more on the Loving-Kindness practice? I struggle with that one.",
    authorId: userIds.dmitriyK,
    postId: postIds[0],
  },
  {
    id: randomUUID(),
    content:
      "The \u201CEmail Apnea\u201D check caught me off guard—I was literally holding my breath while reading this!",
    authorId: userIds.elenaW,
    postId: postIds[1],
  },
  {
    id: randomUUID(),
    content:
      "Walking meditation is the only way I can get through my commute without road rage.",
    authorId: userIds.guest99,
    postId: postIds[1],
  },
  {
    id: randomUUID(),
    content: "Digital Sunset is a game changer for my morning energy levels.",
    authorId: userIds.igorDev,
    postId: postIds[1],
  },
  {
    id: randomUUID(),
    content:
      "I use the \u201CJust Like Me\u201D practice before board meetings. It changes the whole room's dynamic.",
    authorId: userIds.ivanIvanov,
    postId: postIds[1],
  },
  {
    id: randomUUID(),
    content:
      "Great tips for leaders. We need more of this in corporate culture.",
    authorId: userIds.kateRock,
    postId: postIds[1],
  },
  {
    id: randomUUID(),
    content:
      "Viktor Frankl's concept of \u201Cspace\u201D saved my marriage. Thank you for this reminder.",
    authorId: userIds.lisaM,
    postId: postIds[2],
  },
  {
    id: randomUUID(),
    content:
      "Naming the emotion really does take the power out of it. \u201CName it to tame it\u201D.",
    authorId: userIds.maxPower,
    postId: postIds[2],
  },
  {
    id: randomUUID(),
    content:
      "I struggle with self-compassion. It's so much easier to be kind to others than myself.",
    authorId: userIds.ninaSky,
    postId: postIds[2],
  },
  {
    id: randomUUID(),
    content:
      "The 5-4-3-2-1 method pulled me out of a panic attack yesterday. It really works.",
    authorId: userIds.olgaArt,
    postId: postIds[3],
  },
  {
    id: randomUUID(),
    content:
      "Box breathing is standard issue for Navy SEALs for a reason. Simple but effective.",
    authorId: userIds.pavel88,
    postId: postIds[3],
  },
  {
    id: randomUUID(),
    content:
      "Holding an ice cube sounds intense, but I'm willing to try anything to stop the spiral.",
    authorId: userIds.sergeyDev,
    postId: postIds[3],
  },
  {
    id: randomUUID(),
    content: "Cognitive Defusion is such a helpful term. I am not my thoughts!",
    authorId: userIds.techLead,
    postId: postIds[3],
  },
  {
    id: randomUUID(),
    content:
      "Caffeine was my biggest trigger. Cut it out and anxiety dropped by 50%.",
    authorId: userIds.userVova,
    postId: postIds[3],
  },
  {
    id: randomUUID(),
    content:
      "Nature immersion is underrated. Just looking at trees lowers my heart rate.",
    authorId: userIds.annaJoy,
    postId: postIds[3],
  },
  {
    id: randomUUID(),
    content: "Shoshin (Beginner's Mind) is the secret to all good design work.",
    authorId: userIds.borisT,
    postId: postIds[4],
  },
  {
    id: randomUUID(),
    content:
      "I never connected the \u201CDefault Mode Network\u201D to my inner critic before. Makes total sense.",
    authorId: userIds.denisPro,
    postId: postIds[4],
  },
  {
    id: randomUUID(),
    content: "Mindful walking without a phone... sounds scary but I'll try it.",
    authorId: userIds.dmitriyK,
    postId: postIds[4],
  },
  {
    id: randomUUID(),
    content:
      "The non-judgmental brainstorm is hard! My internal editor is loud.",
    authorId: userIds.elenaW,
    postId: postIds[4],
  },
  {
    id: randomUUID(),
    content: "Grayscale mode makes my phone look so boring, I love it.",
    authorId: userIds.guest99,
    postId: postIds[5],
  },
  {
    id: randomUUID(),
    content:
      "JOMO > FOMO. I deleted Instagram last month and haven't looked back.",
    authorId: userIds.igorDev,
    postId: postIds[5],
  },
  {
    id: randomUUID(),
    content: "Phantom Vibration Syndrome is real. I thought I was going crazy.",
    authorId: userIds.ivanIvanov,
    postId: postIds[5],
  },
  {
    id: randomUUID(),
    content: "The 20-20-20 rule saved my eyesight during coding marathons.",
    authorId: userIds.kateRock,
    postId: postIds[5],
  },
  {
    id: randomUUID(),
    content:
      "It's terrifying how accurate the \u201Cdopamine loop\u201D description is.",
    authorId: userIds.lisaM,
    postId: postIds[5],
  },
  {
    id: randomUUID(),
    content: "Analog weekends are the highlight of my week now.",
    authorId: userIds.maxPower,
    postId: postIds[5],
  },
  {
    id: randomUUID(),
    content: "Single-tasking feels like a superpower in this distracted world.",
    authorId: userIds.ninaSky,
    postId: postIds[5],
  },
  {
    id: randomUUID(),
    content:
      "Cognitive shuffling (the random word thing) knocks me out in 5 minutes flat.",
    authorId: userIds.olgaArt,
    postId: postIds[6],
  },
  {
    id: randomUUID(),
    content:
      "I wake up at 3 AM every single night. The advice not to stay in bed is counterintuitive but I'll try it.",
    authorId: userIds.pavel88,
    postId: postIds[6],
  },
  {
    id: randomUUID(),
    content: "NSDR scripts on YouTube are a lifesaver.",
    authorId: userIds.sergeyDev,
    postId: postIds[6],
  },
  {
    id: randomUUID(),
    content:
      "Journaling the chaos before bed clears my mind like nothing else.",
    authorId: userIds.techLead,
    postId: postIds[6],
  },
  // {
  //   id: randomUUID(),
  //   content:
  //     "The 3-second rule is torture for an interrupter like me, but it works.",
  //   authorId: userIds.userVova,
  //   postId: postIds[7],
  // },
  // {
  //   id: randomUUID(),
  //   content:
  //     "Removing \u201Calways\u201D and \u201Cnever\u201D instantly de-escalated a fight with my partner.",
  //   authorId: userIds.annaJoy,
  //   postId: postIds[7],
  // },
  // {
  //   id: randomUUID(),
  //   content: "Active listening is so rare these days. Great post.",
  //   authorId: userIds.borisT,
  //   postId: postIds[7],
  // },
  // {
  //   id: randomUUID(),
  //   content: "Eye contact anchoring really does keep you present.",
  //   authorId: userIds.denisPro,
  //   postId: postIds[7],
  // },
  // {
  //   id: randomUUID(),
  //   content: "Repair attempts are the most important part of any relationship.",
  //   authorId: userIds.dmitriyK,
  //   postId: postIds[7],
  // },
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
    h1 TEXT NOT NULL,
    lead TEXT NOT NULL,
    content BLOB NOT NULL,
    conclusion TEXT NOT NULL,
    published_at TEXT NOT NULL,
    image_preview TEXT NOT NULL,
    image_lead TEXT NOT NULL
  );

  CREATE TABLE comments (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    author_id TEXT,
    post_id TEXT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE SET NULL,
    FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_users_login ON users (login);
  CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions (user_id);
  CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions (expires_at);
`;

console.log("Initializing schema...");
db.exec(schema);
console.log("Seeding data...");

const statements = {
  insertRole: db.prepare(`
    INSERT INTO roles (id, name)
    VALUES (@id, @name);
  `),
  insertUser: db.prepare(`
    INSERT INTO users (id, login, password, salt, role_id, registered_at, updated_at)
    VALUES (@id, @login, @password, @salt, @roleId, @registeredAt, @updatedAt);
  `),
  insertPost: db.prepare(`
    INSERT INTO posts (id, h1, lead, content, conclusion, published_at, image_preview, image_lead)
    VALUES (@id, @h1, @lead, jsonb(@content), @conclusion, @publishedAt, @imagePreview, @imageLead);
  `),
  insertComment: db.prepare(`
    INSERT INTO comments (id, content, author_id, post_id)
    VALUES (@id, @content, @authorId, @postId)
  `),
};

const seed = db.transaction(() => {
  roles.forEach((role) => statements.insertRole.run(role));
  users.forEach((user) => statements.insertUser.run(user));
  posts.forEach((post) => statements.insertPost.run(post));
  comments.forEach((comment) => statements.insertComment.run(comment));
});

seed();
db.close();
console.log("Database is created.");
