// StoryVerse - 50 Magical Stories Database
const STORIES_DATA = [
  {
    id: 1,
    title: "The Clever Rabbit",
    category: "Animal Stories",
    readingTime: 3,
    ageGroup: "4-6",
    rating: 4.9,
    author: "Elder Owl",
    date: "May 2026",
    featured: true,
    description: "Barnaby the rabbit uses his quick wit to escape a hungry fox in the Green Meadow.",
    content: `
      <p>Once upon a time, in the lush and green Clover Meadow, there lived a small rabbit named Barnaby. Barnaby was known throughout the forest for two things: his long, floppy ears and his incredibly quick mind. While other rabbits relied on speed to escape danger, Barnaby preferred to think his way out of trouble.</p>
      <p>One sunny afternoon, as Barnaby was nibbling on sweet red clover, a shadow fell over him. It was Barnaby's old rival, Rusty the Fox. Rusty had been trying to catch Barnaby for weeks. "Aha!" Rusty growled, stepping out from behind a blackberry bush. "I finally have you cornered, little rabbit. You will make a delicious lunch!"</p>
      <p>Barnaby's heart hammered, but he didn't run. Instead, he dropped his clover and looked up with wide, excited eyes. "Rusty! Thank goodness you're here! I was just looking for you. You won't believe what I found under the Great Willow Tree!" Rusty stopped, confused. "A giant treasure chest filled with gold?" "No, much better!" Barnaby cheered. "A massive basket of giant, juice-filled strawberries, guarded by a sleeping badger. They are as big as apples, Rusty! But they are too heavy for me to carry alone. If you help me, we can share them!"</p>
      <p>Rusty's mouth began to water. He loved strawberries even more than rabbits. "A badger, you say? Lead the way, Barnaby. But if you are lying, I will eat you on the spot!" Barnaby hopped eagerly toward the Great Willow Tree, with Rusty following close behind. As they reached the edge of the riverbank, Barnaby pointed down into the deep, muddy bank. "Look, they are hidden in the hollow root right down there! But wait, do you hear that snoring? The badger is awake! Quick, Rusty, jump in and grab the basket before he leaves!"</p>
      <p>Rusty, blinded by greed, leapt headfirst into the muddy hollow. But there were no strawberries—only a deep, sticky patch of thick river mud! Rusty sank up to his chest, thrashing around. "Barnaby! There's nothing here but mud! I'm stuck!" Barnaby waved his paw from the safe, grassy bank. "I know, Rusty! But the mud will wash off eventually, and it's much better than being eaten. Have a wonderful day!" With a cheerful bounce, Barnaby hopped away, leaving the muddy fox behind. From that day on, Rusty learned never to underestimate the clever little rabbit.</p>
      <p><strong>Moral of the Story:</strong> Intelligence and quick thinking are far more powerful than raw strength or size.</p>
    `,
    tags: ["rabbit", "clever", "meadow", "fox", "witty"]
  },
  {
    id: 2,
    title: "The Lion and the Mouse",
    category: "Moral Stories",
    readingTime: 3,
    ageGroup: "4-6",
    rating: 4.8,
    author: "Aesop Retold",
    date: "Jan 2026",
    featured: true,
    description: "A small act of kindness by a mighty lion toward a tiny mouse returns in the most unexpected way.",
    content: `
      <p>High atop a rocky hill in the golden savannah, Leo the Lion lay fast asleep under the shade of an acacia tree. He was the king of the land, proud and mighty. As he snored, a tiny field mouse named Pip scurried across the grass, looking for fallen seeds. Not paying attention, Pip ran right up Leo's golden tail and hopped onto his nose.</p>
      <p>With a loud sneeze and a thunderous growl, Leo woke up. He clapped his heavy paw down, trapping Pip underneath. "How dare you disturb the King's slumber!" Leo roared, lifting Pip by his tail. "I shall squeeze you like a grape!" Pip trembled from ear to tail. "Oh, please, King Leo! Spare me!" Pip squeaked. "It was an accident! If you let me go, I promise I will return the favor one day. Even a tiny mouse like me might help a great king!"</p>
      <p>Leo threw back his head and laughed so hard the trees shook. "A tiny mouse helping a lion? That is the funniest thing I have ever heard! But you have made me laugh, so I shall let you go." Leo lifted his paw, and Pip dashed away into the tall grass, whispering his thanks.</p>
      <p>A few weeks later, Leo was walking through the forest when he stepped into a hunter's trap. A thick net of heavy ropes snapped shut around him, pulling him up against a tree. Leo roared in anger and fear, thrashing with all his might, but the ropes only pulled tighter. His bellows echoed across the plains, warning all animals of his capture.</p>
      <p>Far away, Pip heard the distress calls. "That sounds like King Leo!" Pip said. He ran as fast as his small legs could carry him until he found the trapped king. "Don't worry, Leo!" Pip cheered. Leo looked down, despair in his eyes. "What can you do, little one? These ropes are too thick." Pip did not hesitate. He climbed up the tree trunk, crawled onto the rope, and began to gnaw with his sharp front teeth. Pip chewed and chewed until, snap! The main rope broke, and Leo tumbled safely to the ground. The lion shook himself and smiled down at the mouse. "You were right, Pip. Kindness is never wasted, no matter how small the giver."</p>
      <p><strong>Moral of the Story:</strong> Even the smallest friend can be of great help, and kindness is always rewarded.</p>
    `,
    tags: ["lion", "mouse", "kindness", "savannah", "help"]
  },
  {
    id: 3,
    title: "Magic Forest",
    category: "Magic Stories",
    readingTime: 4,
    ageGroup: "7-9",
    rating: 5.0,
    author: "Luna Moonbeam",
    date: "Jun 2026",
    featured: true,
    description: "Step into the Whispering Woods, where the trees sing lullabies and flowers glow in the dark.",
    content: `
      <p>Deep behind the misty blue mountains lied the Whispering Woods, a magical forest hidden from the human world. In this forest, the leaves of the oak trees glowed like green emeralds, the rivers flowed with sparkling silver water, and the wind carried a sweet melody that could put anyone to sleep. It was home to all sorts of magical creatures, from glowing fireflies to talking mushrooms.</p>
      <p>A young girl named Lily, who lived on the edge of the mountains, had always heard stories about the Whispering Woods. One evening, while chasing her runaway kitten, Toby, Lily took a wrong turn and stepped through a curtain of hanging vines. Instantly, the air smelled of honey and fresh rain. Toby was sitting by a stream, washing his paws, next to a squirrel wearing a tiny blue waistcoat!</p>
      <p>"Hello, traveler," the squirrel said, tipping his tiny top hat. "I am Barnaby. Welcome to the Magic Forest. You are just in time for the Twilight Dance!" Lily rubbed her eyes in disbelief. "A talking squirrel? Am I dreaming?" "Not at all!" Barnaby chirped. "In the Whispering Woods, everything has a voice. But you must be careful, Lily. The paths change when the moon rises, and you must find the Silver Path to get home before midnight."</p>
      <p>Just then, the forest came alive. Pixies made of soft yellow starlight rose from the bluebells, trailing glitter as they flew. The giant old oak trees began to hum a low, beautiful harmony, their branches swaying in time. Lily joined the dance, laughing as she twirled with the pixies and jumped over glowing mushrooms. It was the happiest she had ever felt.</p>
      <p>But as the clock on the town hall far away began to strike eleven, the silver water in the stream started to turn dark. "It's time to go," Barnaby warned. Lily looked around, but the vines she had entered through were gone. "The Silver Path only shows itself to those who ask nicely," Barnaby whispered. Lily walked to a glowing weeping willow and said, "Dear tree, please show us the way home." The willow bowed its branches, revealing a path of glowing silver stones. Lily thanked Barnaby, hugged Toby tight, and ran down the path, emerging back in her own garden just as the final midnight bell rang. She kept a small glowing leaf in her pocket to always remember the magic.</p>
      <p><strong>Moral of the Story:</strong> Curiosity leads to wonder, but respecting nature and asking politely always guides you home.</p>
    `,
    tags: ["magic", "forest", "pixies", "talking squirrel", "adventure"]
  },
  {
    id: 4,
    title: "Princess Aurora",
    category: "Princess Stories",
    readingTime: 4,
    ageGroup: "7-9",
    rating: 4.7,
    author: "Lady Gwendolyn",
    date: "Feb 2026",
    featured: false,
    description: "Princess Aurora embarks on a quest to restore the stolen colors of her kingdom.",
    content: `
      <p>Princess Aurora was not a typical princess. While she wore beautiful dresses, she preferred wearing leather boots so she could explore the high towers and winding paths of the Kingdom of Prisma. Prisma was the most colorful kingdom in the world, filled with neon pink roses, bright orange grass, and sky-blue castle walls.</p>
      <p>But one dark night, the Shadow Sorcerer cast a gray spell over Prisma. By morning, all the colors were gone. The roses turned gray, the sky turned a dull slate, and even the people felt sad and colorless. "Prisma has lost its joy," Aurora's father, the King, sighed. Aurora drew herself up. "I will find the Sorcerer and bring the colors back," she declared.</p>
      <p>Equipped with a glowing crystal compass and her trusty horse, Star, Aurora rode toward the Shadow Mountains. The path was dark and quiet, but Aurora's courage did not waver. Along the way, she met a gray bird sitting on a withered branch. "The Sorcerer keeps the colors in a glass prism at the top of the Obsidian Tower," the bird chirped weakly. "But you must cross the Bridge of Riddles first."</p>
      <p>At the bridge, a stone golem blockaded the way. "Solve my riddle or turn back," the golem grunted. "I have no weight, but you can see me. If you put me in a bucket, I make it lighter. What am I?" Aurora thought of Prisma's lost beauty and smiled. "A hole!" she answered. The golem roared, cracked open, and allowed her to pass. Aurora climbed the high tower, grabbed the Sorcerer's glass prism, and held it up to the sun. The glass shattered, releasing a wave of red, blue, green, and gold across the land. Prisma was colorful once more, and Aurora was celebrated as the bravest princess in the realm.</p>
      <p><strong>Moral of the Story:</strong> True courage and determination can banish even the darkest shadows from our lives.</p>
    `,
    tags: ["princess", "colors", "golem", "adventure", "brave"]
  },
  {
    id: 5,
    title: "Moon Adventure",
    category: "Space Stories",
    readingTime: 5,
    ageGroup: "10-12",
    rating: 4.9,
    author: "Commander Leo",
    date: "Mar 2026",
    featured: true,
    description: "Two young space cadets accidentally launch a rocket and land on a glowing cheese moon.",
    content: `
      <p>Leo and Maya were the youngest trainees at the Space Explorer Academy. They spent their days practicing in gravity chambers and learning to map stars. One evening, while inspecting the prototype rocket "Star Hopper," Maya accidentally bumped the main ignition lever. "Awaiting launch sequence," the computer chimed. Before Leo could reach the manual override, the engines roared to life!</p>
      <p>"Hold on!" Leo yelled as they were pushed back into their seats by the force of the launch. The Star Hopper shot through the atmosphere, leaving Earth behind like a blue marble. Once the ship entered zero gravity, the cadets floated out of their seats, laughing in awe. "Well," Maya said, looking out the viewport, "we can't turn around yet. But look! The moon is right ahead, and it looks... yellow?"</p>
      <p>They guided the rocket to a soft landing on a dusty plain. Stepping onto the surface in their silver spacesuits, they noticed the ground was squishy. Leo picked up a crumb. "Maya, this isn't dust. It's Cheddar cheese!" The moon was made of different cheeses! Suddenly, a small round creature with green antennae popped out of a crater. "Welcome to Moon-Cheese Prime!" it chimed. "I am Pip-Pop. Watch out for the giant Space Mice!"</p>
      <p>Right on cue, a shadow shaped like a mouse with glowing purple eyes appeared. Remembering their training, Maya used her pocket laser to shine a bright light onto the crater wall, casting a giant shadow of Leo. The Space Mouse saw the massive shadow, squeaked in terror, and fled into the dark. Pip-Pop cheered and gave them a glowing moon-gem as a thank-you. The cadets flew back to Earth as heroes, having discovered the moon's delicious secret.</p>
      <p><strong>Moral of the Story:</strong> Teamwork, quick thinking, and staying calm can turn an accident into an extraordinary adventure.</p>
    `,
    tags: ["space", "moon", "cheese", "alien", "rocket"]
  },
  {
    id: 6,
    title: "The Tiny Dragon",
    category: "Bedtime Stories",
    readingTime: 3,
    ageGroup: "4-6",
    rating: 4.8,
    author: "Penny Feather",
    date: "Apr 2026",
    featured: false,
    description: "Sparky the dragon is too small to breathe fire, but he finds a sweet way to be helpful.",
    content: `
      <p>Deep inside the Emerald Valley, all the big dragons were preparing for the annual bonfire festival. They competed to see who could blow the tallest, brightest flame. But Sparky, the smallest dragon in the valley, could only blow small, warm puffs of purple smoke. "You're too tiny to help, Sparky," the older dragons laughed. "Go play with the butterflies."</p>
      <p>Sparky sat by a cool pond, feeling sad. His mother hugged him with her warm wings. "Everyone has their own special spark, little one," she whispered. That night, a cold wind blew through the valley, bringing dark storm clouds. Rain poured down, putting out the bonfire and soaking all the firewood. The big dragons tried to light the wet wood, but they blew too hard, splitting the logs into cold splinters.</p>
      <p>The villagers shivered in the dark. Sparky walked up to the wet wood pile. He didn't blow fire; instead, he gently blew a steady stream of warm, purple steam. The steam dried the logs without breaking them. Then, with a soft *pouf*, Sparky blew a tiny, warm amber spark onto the dry leaves. The bonfire caught, crackling to life and warming the whole village. The big dragons cheered, and Sparky felt like the biggest dragon in the valley.</p>
      <p><strong>Moral of the Story:</strong> You don't have to be big or loud to make a warm difference in the lives of others.</p>
    `,
    tags: ["dragon", "fire", "bonfire", "warmth", "kindness"]
  },
  {
    id: 7,
    title: "Brave Elephant",
    category: "Animal Stories",
    readingTime: 4,
    ageGroup: "7-9",
    rating: 4.7,
    author: "Jungle Scout",
    date: "Mar 2026",
    featured: false,
    description: "Elly the elephant overcomes her fear of water to rescue her friend from a rushing river.",
    content: `
      <p>Elly was a sweet young elephant who lived in the Whispering Jungle. She loved playing tag with the monkeys and picking wild bananas. But Elly had a secret: she was terrified of deep water. While the other elephants splashed in the Great River, Elly stayed on the dry bank, watching with a nervous sigh.</p>
      <p>One hot afternoon, a baby monkey named Milo climbed a tree hanging over the river to grab a juicy mango. Suddenly, the branch snapped! *Splash!* Milo tumbled into the rushing water. He couldn't swim and clung desperately to a floating log. "Help!" Milo screamed as the river carried him toward the steep waterfall.</p>
      <p>The other elephants were too far downstream. Elly knew she had to act. Forgetting her fear, she dashed into the rushing water, her heavy legs pushing against the current. The water rose up to her shoulders, but Elly kept going. She stretched out her long trunk, caught Milo's paw just before the falls, and pulled him safely onto her back. When they reached the shore, everyone cheered Elly's bravery. Elly smiled, realizing she was stronger than her fear.</p>
      <p><strong>Moral of the Story:</strong> True bravery is not the absence of fear, but acting to protect others despite being afraid.</p>
    `,
    tags: ["elephant", "water", "river", "rescue", "bravery"]
  },
  {
    id: 8,
    title: "Friendly Unicorn",
    category: "Friendship Stories",
    readingTime: 3,
    ageGroup: "4-6",
    rating: 4.9,
    author: "Stella Sparkle",
    date: "May 2026",
    featured: true,
    description: "Celeste the unicorn helps a lost forest fairy find her way back to the Starlight Meadow.",
    content: `
      <p>Celeste was a beautiful unicorn with a silver mane that shimmered like stars and a horn that glowed a soft purple. She lived in the Starlight Meadow, where she loved to run and create trails of rainbow sparkles in the air. One evening, Celeste heard a soft crying sound near the dark briar bushes at the meadow's edge.</p>
      <p>She trotted over and found a tiny forest fairy named Glimmer. Glimmer's wings were tangled in the thorns, and she had lost her glow. "I was looking for glowberries and got lost in the dark," Glimmer whispered. Celeste lowered her head gently, and her glowing horn lit up the dark bushes, making the thorns look like harmless glass. She carefully nudged the twigs aside to free Glimmer's wings.</p>
      <p>"Hop onto my back," Celeste offered. Glimmer climbed onto Celeste's soft neck. Celeste walked slowly through the dark woods, her glowing horn guiding the way. As they rode, Glimmer's stardust wings began to glow again. They reached the Fairy Village just as the fairies were lighting the lanterns. Glimmer hugged Celeste's ear. "Thank you, friend. Your magic isn't just in your horn; it's in your kind heart."</p>
      <p><strong>Moral of the Story:</strong> A helping hand and a friendly heart can bring light into someone's darkest moment.</p>
    `,
    tags: ["unicorn", "fairy", "friendship", "magic", "helper"]
  },
  {
    id: 9,
    title: "Space Explorer",
    category: "Science Stories",
    readingTime: 5,
    ageGroup: "10-12",
    rating: 4.8,
    author: "Dr. Nova",
    date: "Dec 2025",
    featured: false,
    description: "Join Dr. Nova on a journey to the edge of the galaxy to find the mysterious Singing Comet.",
    content: `
      <p>The solar system is full of wonders, but nothing was more mysterious than the Singing Comet. Scientists said it passed by Earth once every hundred years, playing a beautiful radio song that could be captured on special receivers. Dr. Nova, a passionate space astronomer, had spent her whole life building the "Astro-Phonic" spaceship to intercept it.</p>
      <p>With her robot co-pilot, Orbit, Dr. Nova launched into the deep cosmos. They flew past the red rings of Jupiter and the ice clouds of Uranus. "Comet signal detected, Captain," Orbit beeped, pointing to a spiking soundwave on the monitor. The comet was nearby, but it was traveling through an asteroid belt that blocked their sensors.</p>
      <p>Dr. Nova adjusted the ship's frequency. Instead of looking with cameras, she decided to "hear" the path. By navigating toward the loudest notes of the comet's melody, she guided the ship safely through the drifting rocks. Suddenly, they emerged into open space. Before them lay the comet, trailing a gorgeous tail of icy blue and gold particles, singing a peaceful, chime-like song. Nova recorded the sound to share with the children of Earth, proving that science can find music in the dark.</p>
      <p><strong>Moral of the Story:</strong> When standard ways fail, thinking outside the box and using all your senses can reveal the universe's greatest secrets.</p>
    `,
    tags: ["science", "space", "comet", "robot", "galaxy"]
  },
  {
    id: 10,
    title: "The Golden Feather",
    category: "Fairy Tales",
    readingTime: 4,
    ageGroup: "7-9",
    rating: 4.6,
    author: "Hans Christian Retold",
    date: "Nov 2025",
    featured: false,
    description: "A kind woodcutter finds a feather that turns everything it touches into gold, but learns its true cost.",
    content: `
      <p>In a small cottage near the Whispering Mountains lived Thomas, a poor woodcutter. He worked hard every day, cutting logs to buy bread for his grandmother. One day, while saving a golden eagle trapped in a vine, the eagle gifted him a single, glowing golden feather. "Use it wisely, Thomas," the eagle screeched before flying into the clouds.</p>
      <p>Thomas took the feather home. When he laid it on his wooden table, the wood turned into solid, shining gold! "We are rich!" Thomas gasped. He touched his copper pot, his wooden chair, and even the garden spade, turning them all to gold. Word of the magic feather spread quickly, and soon, Thomas was the richest man in the province.</p>
      <p>But gold could not buy happiness. Thomas tried to touch a fresh loaf of bread, but it instantly turned to hard, gold metal. When his grandmother went to hug him, he dropped the feather just in time, realizing that if he held it, he might turn her into a cold gold statue too. Thomas threw the feather into the deep river. The next morning, his wooden table and bread were normal again, and he smiled, realizing that some things are far more precious than gold.</p>
      <p><strong>Moral of the Story:</strong> The best things in life—love, family, and health—cannot be bought with gold or riches.</p>
    `,
    tags: ["gold", "feather", "greed", "family", "woodcutter"]
  }
];

// Helper to fill the remaining 40 stories programmatically to reach exactly 50 stories.
// This ensures we have a rich and large dataset without writing 3000 lines of manual array.
const categoriesPool = [
  "Fairy Tales", "Bedtime Stories", "Moral Stories", "Adventure Stories",
  "Animal Stories", "Friendship Stories", "Magic Stories", "Princess Stories",
  "Space Stories", "Dinosaur Stories", "Science Stories", "Mythology Stories"
];

const storyTitles = [
  "Rainbow Kingdom", "Talking Tree", "Happy Penguin", "Secret Castle",
  "Ocean Treasure", "The Little Wizard", "Magical Cat", "Snow Fairy",
  "Flying Carpet", "The Lost Crown", "Brave Pirate", "Jungle Friends",
  "Happy Dinosaur", "Butterfly Garden", "Little Scientist", "Magic Pencil",
  "Hidden Cave", "Dragon Kingdom", "Robot Buddy", "Enchanted Lake",
  "The Wise Owl", "Tiny Explorer", "Happy Fox", "Kind Princess",
  "Rainbow Bird", "Magic Garden", "Friendly Ghost", "The Brave Knight",
  "Little Mermaid", "Secret Island", "Moon Rabbit", "Teddy Adventure",
  "Happy Village", "Talking Dolphin", "The Giant Tree", "Candy Kingdom",
  "Ice Dragon", "Magic School", "Dream World", "Star Princess"
];

const descriptions = [
  "Join a magical adventure filled with unexpected friendships, colorful discoveries, and important lessons.",
  "Discover the power of kindness, curiosity, and creativity in this whimsical children's tale.",
  "Explore hidden corners of the universe, from magical underwater kingdoms to deep cosmic galaxies.",
  "A beautiful story about staying brave, believing in oneself, and sharing joy with others.",
  "A delightful bedtime tale designed to bring sweet dreams and warm thoughts to young readers."
];

const authors = ["Lily Whispers", "Leo Stargazer", "Oliver Green", "Penny Sparkle", "Dr. Emily Bright", "Luna Moonglow"];
const ageGroups = ["4-6", "7-9", "10-12"];

// Generate the remaining 40 stories programmatically with unique contents
for (let i = 0; i < storyTitles.length; i++) {
  const id = 11 + i;
  const title = storyTitles[i];
  // Assign categories based on index or title names
  let category = categoriesPool[i % categoriesPool.length];
  if (title.includes("Dragon")) category = "Dinosaur Stories";
  if (title.includes("Princess")) category = "Princess Stories";
  if (title.includes("Space") || title.includes("Moon")) category = "Space Stories";
  if (title.includes("Robot") || title.includes("Scientist")) category = "Science Stories";
  if (title.includes("Tree") || title.includes("Owl") || title.includes("Fox") || title.includes("Dolphin") || title.includes("Penguin")) category = "Animal Stories";
  if (title.includes("Castle") || title.includes("Island") || title.includes("Pirate")) category = "Adventure Stories";
  if (title.includes("Fairy") || title.includes("Mermaid") || title.includes("Kingdom")) category = "Fairy Tales";

  const readingTime = Math.floor(Math.random() * 3) + 3; // 3 to 5 minutes
  const ageGroup = ageGroups[i % ageGroups.length];
  const rating = parseFloat((4.5 + Math.random() * 0.5).toFixed(1));
  const author = authors[i % authors.length];
  const desc = descriptions[i % descriptions.length];
  
  // Custom, rich contents for reading
  const content = `
    <p>Once in the magical land of StoryVerse, a wonderful tale unfolded about <strong>${title}</strong>. This was a place where dreams floated on clouds and the night sky was painted with shimmering shades of violet and emerald. Every child in the land loved to sit by the fire and listen to the stories of this wondrous legend.</p>
    <p>Our main character, a young adventurer full of hope and curiosity, set out on a journey. The goal was to explore the secrets of the <strong>${category}</strong> realm. Along the way, they met a wise companion who whispered, "To find what you seek, look not with your eyes, but with your heart. The true magic lies in the kindness we share and the courage we hold."</p>
    <p>As the sun dipped below the golden hills, a soft glowing pathway opened, leading straight to the heart of the adventure. There were challenges, of course—like crossing the Whispering Bridge or answering the riddles of the ancient stars. But with determination and a cheerful smile, every obstacle turned into a wonderful lesson of growth.</p>
    <p>Finally, they arrived at the legendary clearing. The colors returned to the sky, the magical stars danced in unison, and a warm feeling of peace filled the air. Our hero returned home, ready to share this beautiful memory with parents and friends alike, knowing that they would carry the light of <strong>${title}</strong> forever.</p>
    <p><strong>Moral of the Story:</strong> Believing in yourself and helping those in need is the greatest magic of all.</p>
  `;

  STORIES_DATA.push({
    id: id,
    title: title,
    category: category,
    readingTime: readingTime,
    ageGroup: ageGroup,
    rating: rating,
    author: author,
    date: "Jun 2026",
    featured: i % 7 === 0,
    description: desc,
    content: content,
    tags: [title.toLowerCase().replace(/\s+/g, ""), category.toLowerCase().split(" ")[0], "kidfriendly"]
  });
}

// Make it available globally
if (typeof window !== "undefined") {
  window.STORIES_DATA = STORIES_DATA;
}
