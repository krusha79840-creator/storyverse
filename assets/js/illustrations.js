// StoryVerse - Dynamic SVG Illustration Generator (Polish v2)
const SVGGenerator = {
  gradients: {
    "Fairy Tales": ["#FF9a9e", "#fecfef"],
    "Bedtime Stories": ["#667eea", "#764ba2"],
    "Moral Stories": ["#11998e", "#38ef7d"],
    "Adventure Stories": ["#f6d365", "#fda085"],
    "Animal Stories": ["#4facfe", "#00f2fe"],
    "Friendship Stories": ["#f093fb", "#f5576c"],
    "Magic Stories": ["#4e54c8", "#8f94fb"],
    "Princess Stories": ["#f182c6", "#fec1e6"],
    "Space Stories": ["#0f2027", "#203a43", "#2c5364"],
    "Dinosaur Stories": ["#11998e", "#38ef7d"],
    "Science Stories": ["#3a7bd5", "#00d2ff"],
    "Mythology Stories": ["#f857a6", "#ff5858"]
  },

  getDefaultGradient(category) {
    return this.gradients[category] || ["#6a11cb", "#2575fc"];
  },

  getIllustration(title, category) {
    const t = (title || "").toLowerCase();
    const cat = (category || "").trim();
    const grads = this.getDefaultGradient(cat);

    // Unique gradient ID per call
    const uid = `g${Math.floor(Math.random()*900000+100000)}`;
    const gradDef = grads.length === 3
      ? `<linearGradient id="${uid}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${grads[0]}"/><stop offset="50%" stop-color="${grads[1]}"/><stop offset="100%" stop-color="${grads[2]}"/></linearGradient>`
      : `<linearGradient id="${uid}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${grads[0]}"/><stop offset="100%" stop-color="${grads[1]}"/></linearGradient>`;

    let bg = `<defs>${gradDef}</defs><rect width="260" height="190" fill="url(#${uid})" rx="12"/>`;

    // Sparkle stars base
    const stars = `<g opacity="0.35" fill="#fff"><circle cx="20" cy="18" r="1.5"/><circle cx="240" cy="22" r="2"/><circle cx="130" cy="12" r="1.5"/><circle cx="200" cy="45" r="1"/><circle cx="50" cy="50" r="1.5"/><circle cx="210" cy="15" r="1.2"/></g>`;

    // Bottom wave cloud
    const cloud = `<path d="M-10,165 Q50,148 100,158 Q160,140 220,155 Q250,148 270,165 L270,195 L-10,195Z" fill="rgba(255,255,255,0.9)"/>`;

    // Central character based on title keywords
    let character = "";

    // --- SPACE / ROCKET / MOON / STAR ---
    if (cat === "Space Stories" || t.includes("space") || t.includes("rocket") || t.includes("moon") || t.includes("star") || t.includes("comet") || t.includes("planet") || t.includes("galaxy") || t.includes("astro")) {
      character = `
        <!-- Moon -->
        <path d="M 195,28 A 28,28 0 1,0 223,60 A 24,24 0 1,1 195,28Z" fill="#FFE082" opacity="0.9"/>
        <!-- Rocket -->
        <g transform="translate(78,55) rotate(-20)">
          <path d="M18,-28 Q30,-56 42,-28 L42,28 Q30,18 18,28Z" fill="#ECEFF1"/>
          <path d="M18,-28 Q30,-50 42,-28Z" fill="#EF5350"/>
          <path d="M18,10 L5,28 L18,28Z" fill="#EF5350"/>
          <path d="M42,10 L55,28 L42,28Z" fill="#EF5350"/>
          <circle cx="30" cy="0" r="9" fill="#80DEEA" stroke="#B0BEC5" stroke-width="2"/>
          <path d="M22,38 Q30,58 38,38Z" fill="#FF5722"/>
          <path d="M25,38 Q30,50 35,38Z" fill="#FFEB3B"/>
        </g>
        <!-- Small stars -->
        <g fill="#FFD54F" opacity="0.8">
          <polygon points="40,35 42,41 48,41 43,45 45,51 40,47 35,51 37,45 32,41 38,41"/>
          <polygon points="155,25 156.5,30 162,30 157.5,33 159,38 155,35 151,38 152.5,33 148,30 153.5,30" transform="scale(0.7) translate(75,0)"/>
        </g>`;
    }
    // --- DRAGON ---
    else if (t.includes("dragon") || t.includes("ice dragon")) {
      character = `
        <!-- Dragon wings -->
        <path d="M115,60 C100,30 85,25 95,55Z" fill="#4CAF50" opacity="0.8"/>
        <path d="M145,55 C160,25 175,30 160,60Z" fill="#388E3C" opacity="0.8"/>
        <!-- Dragon body -->
        <ellipse cx="130" cy="85" rx="28" ry="22" fill="#4CAF50"/>
        <!-- Dragon head -->
        <ellipse cx="155" cy="65" rx="18" ry="15" fill="#4CAF50"/>
        <!-- Snout -->
        <ellipse cx="168" cy="68" rx="8" ry="6" fill="#66BB6A"/>
        <!-- Nostrils -->
        <circle cx="165" cy="67" r="1.5" fill="#2E7D32"/>
        <circle cx="170" cy="67" r="1.5" fill="#2E7D32"/>
        <!-- Eye -->
        <circle cx="152" cy="61" r="5" fill="#fff"/>
        <circle cx="153" cy="61" r="2.5" fill="#1a1a2e"/>
        <circle cx="152" cy="60" r="1" fill="#fff"/>
        <!-- Spikes -->
        <polygon points="130,63 126,55 134,57" fill="#FFC107"/>
        <polygon points="140,62 137,53 144,56" fill="#FFC107"/>
        <polygon points="149,66 148,56 154,60" fill="#FFC107"/>
        <!-- Tail -->
        <path d="M102,90 Q75,100 70,85 Q75,70 102,85Z" fill="#388E3C"/>
        <polygon points="70,85 62,78 68,78" fill="#FFC107"/>
        <!-- Legs -->
        <ellipse cx="118" cy="107" rx="8" ry="5" fill="#2E7D32"/>
        <ellipse cx="143" cy="107" rx="8" ry="5" fill="#2E7D32"/>`;
    }
    // --- DINOSAUR ---
    else if (t.includes("dinosaur") || t.includes("dino") || cat === "Dinosaur Stories") {
      character = `
        <!-- Cute dino body -->
        <path d="M95,105 Q115,80 145,90 Q165,80 162,100 Q155,120 125,120 Q100,118 95,105Z" fill="#66BB6A"/>
        <!-- Head -->
        <ellipse cx="155" cy="82" rx="20" ry="17" fill="#66BB6A"/>
        <!-- Mouth -->
        <path d="M144,87 Q155,95 167,87" fill="none" stroke="#2E7D32" stroke-width="2" stroke-linecap="round"/>
        <!-- Eye -->
        <circle cx="152" cy="77" r="5" fill="#fff"/>
        <circle cx="153" cy="77" r="2.5" fill="#1a237e"/>
        <circle cx="152" cy="76" r="1" fill="#fff"/>
        <!-- Cheek -->
        <circle cx="162" cy="82" r="4" fill="#FF8A80" opacity="0.7"/>
        <!-- Spikes along back -->
        <polygon points="100,100 95,88 106,93" fill="#FFCA28"/>
        <polygon points="112,87 108,75 118,80" fill="#FFCA28"/>
        <polygon points="125,83 123,70 132,76" fill="#FFCA28"/>
        <polygon points="138,84 138,72 145,79" fill="#FFCA28"/>
        <!-- Feet -->
        <ellipse cx="110" cy="122" rx="10" ry="5" fill="#4CAF50"/>
        <ellipse cx="138" cy="122" rx="10" ry="5" fill="#4CAF50"/>
        <!-- Underbelly -->
        <ellipse cx="130" cy="107" rx="20" ry="12" fill="#FFF9C4" opacity="0.6"/>`;
    }
    // --- PRINCESS / CASTLE / CROWN ---
    else if (t.includes("princess") || t.includes("castle") || t.includes("crown") || t.includes("aurora") || cat === "Princess Stories") {
      character = `
        <!-- Rainbow behind -->
        <path d="M30,160 A100,100 0 0,1 230,160" fill="none" stroke="#FF8A80" stroke-width="7" opacity="0.5"/>
        <path d="M42,160 A88,88 0 0,1 218,160" fill="none" stroke="#FFE082" stroke-width="7" opacity="0.5"/>
        <path d="M54,160 A76,76 0 0,1 206,160" fill="none" stroke="#80CBC4" stroke-width="7" opacity="0.5"/>
        <!-- Castle -->
        <g transform="translate(75,50)">
          <rect x="20" y="48" width="72" height="55" fill="#CE93D8" rx="3"/>
          <rect x="6" y="24" width="18" height="70" fill="#BA68C8" rx="2"/>
          <polygon points="3,24 15,5 27,24" fill="#8E24AA"/>
          <rect x="88" y="24" width="18" height="70" fill="#BA68C8" rx="2"/>
          <polygon points="85,24 97,5 109,24" fill="#8E24AA"/>
          <rect x="38" y="15" width="36" height="32" fill="#CE93D8"/>
          <polygon points="33,15 56,-5 79,15" fill="#AB47BC"/>
          <path d="M48,103 A12,12 0 0,1 72,103Z" fill="#7B1FA2"/>
          <rect x="52" y="20" width="8" height="14" fill="#FFF59D" rx="2" opacity="0.9"/>
          <rect x="22" y="38" width="7" height="10" fill="#FFF59D" rx="2" opacity="0.9"/>
          <rect x="83" y="38" width="7" height="10" fill="#FFF59D" rx="2" opacity="0.9"/>
          <polygon points="12,3 20,-7 28,3" fill="#FFD54F"/>
          <polygon points="90,3 98,-7 106,3" fill="#FFD54F"/>
        </g>`;
    }
    // --- UNICORN / FRIENDLY UNICORN ---
    else if (t.includes("unicorn") || t.includes("star princess")) {
      character = `
        <!-- Body -->
        <ellipse cx="120" cy="105" rx="35" ry="22" fill="#fff"/>
        <!-- Neck -->
        <path d="M140,95 L152,72 L160,82 L147,100Z" fill="#fff"/>
        <!-- Head -->
        <ellipse cx="154" cy="68" rx="14" ry="12" fill="#fff"/>
        <!-- Horn -->
        <path d="M148,57 L157,30 L163,58Z" fill="#B388FF" opacity="0.9"/>
        <!-- Mane -->
        <path d="M142,65 Q135,80 142,90Z" fill="#FF80AB"/>
        <path d="M145,63 Q136,76 144,87Z" fill="#FFD54F"/>
        <!-- Eye -->
        <circle cx="158" cy="65" r="4" fill="#fff"/>
        <circle cx="159" cy="65" r="2" fill="#1a1a2e"/>
        <circle cx="158" cy="64" r="0.8" fill="#fff"/>
        <!-- Legs -->
        <rect x="95" y="122" width="8" height="18" fill="#f5f5f5" rx="3"/>
        <rect x="108" y="122" width="8" height="18" fill="#f5f5f5" rx="3"/>
        <rect x="130" y="122" width="8" height="18" fill="#f5f5f5" rx="3"/>
        <rect x="143" y="122" width="8" height="18" fill="#f5f5f5" rx="3"/>
        <!-- Tail -->
        <path d="M85,100 Q68,110 72,125 Q78,112 90,108Z" fill="#FF80AB"/>
        <!-- Sparkle trail -->
        <circle cx="68" cy="108" r="3" fill="#FFD54F" opacity="0.8"/>
        <circle cx="60" cy="118" r="2" fill="#B388FF" opacity="0.7"/>
        <circle cx="72" cy="125" r="2.5" fill="#FF80AB" opacity="0.6"/>`;
    }
    // --- ROBOT / SCIENCE ---
    else if (t.includes("robot") || t.includes("scientist") || t.includes("little scientist") || cat === "Science Stories") {
      character = `
        <!-- Lab flask glow -->
        <ellipse cx="185" cy="110" rx="18" ry="22" fill="#E8F5E9" opacity="0.5"/>
        <ellipse cx="185" cy="118" rx="16" ry="12" fill="#A5D6A7" opacity="0.6"/>
        <!-- Robot body -->
        <g transform="translate(85,50)">
          <line x1="32" y1="6" x2="32" y2="22" stroke="#90A4AE" stroke-width="4" stroke-linecap="round"/>
          <circle cx="32" cy="3" r="5" fill="#FF1744" opacity="0.9"/>
          <!-- Head -->
          <rect x="10" y="18" width="44" height="38" rx="8" fill="#78909C" stroke="#546E7A" stroke-width="2"/>
          <!-- Eye screen -->
          <rect x="16" y="24" width="32" height="16" rx="4" fill="#1A237E"/>
          <circle cx="26" cy="32" r="5" fill="#00E676" opacity="0.9"/>
          <circle cx="40" cy="32" r="5" fill="#00E676" opacity="0.9"/>
          <!-- Cheek bolts -->
          <rect x="12" y="44" width="6" height="3" rx="1" fill="#FF8A80"/>
          <rect x="46" y="44" width="6" height="3" rx="1" fill="#FF8A80"/>
          <!-- Neck + Body -->
          <rect x="22" y="56" width="20" height="8" rx="2" fill="#90A4AE"/>
          <rect x="10" y="64" width="44" height="26" rx="6" fill="#607D8B" stroke="#546E7A" stroke-width="1"/>
          <!-- Body buttons -->
          <circle cx="25" cy="75" r="3" fill="#FFE082"/>
          <circle cx="32" cy="75" r="3" fill="#FF8A80"/>
          <circle cx="39" cy="75" r="3" fill="#80DEEA"/>
        </g>`;
    }
    // --- WIZARD / MAGIC ---
    else if (t.includes("wizard") || t.includes("magic") || t.includes("little wizard") || t.includes("magic pencil") || t.includes("enchanted") || cat === "Magic Stories") {
      character = `
        <!-- Sparkles -->
        <g fill="#FFD54F" opacity="0.7">
          <polygon points="45,50 47,56 53,56 48,60 50,66 45,62 40,66 42,60 37,56 43,56"/>
          <polygon points="215,40 216.5,45 222,45 217.5,48 219,53 215,50 211,53 212.5,48 208,45 213.5,45" transform="scale(0.8)"/>
        </g>
        <!-- Wizard hat -->
        <polygon points="130,90 108,155 152,155" fill="#4527A0"/>
        <ellipse cx="130" cy="155" rx="30" ry="8" fill="#311B92"/>
        <!-- Hat band -->
        <ellipse cx="130" cy="148" rx="20" ry="5" fill="#FFB300"/>
        <!-- Stars on hat -->
        <polygon points="125,110 126.5,115 132,115 127.5,118 129,123 125,120 121,123 122.5,118 118,115 123.5,115" fill="#FFD54F" transform="scale(0.6) translate(85,65)"/>
        <!-- Magic wand -->
        <line x1="155" y1="120" x2="195" y2="150" stroke="#8D6E63" stroke-width="4" stroke-linecap="round"/>
        <polygon points="155,120 160,113 165,120" fill="#FFD54F"/>
        <!-- Spell sparkle -->
        <circle cx="195" cy="150" r="8" fill="#FFE57F" opacity="0.7"/>
        <circle cx="195" cy="150" r="5" fill="#FFD54F"/>
        <!-- Open magical book -->
        <g transform="translate(75,135)">
          <path d="M0,20 Q30,5 55,18 Q80,5 110,20 L110,8 Q80,-8 55,5 Q30,-8 0,8Z" fill="#FFF9C4"/>
          <path d="M0,20 Q30,5 55,18 L55,5Z" fill="#FFF59D"/>
          <path d="M-2,22 Q30,7 55,20 Q80,7 112,22 L112,20 Q80,5 55,18 Q30,5 -2,20Z" fill="#5D4037"/>
        </g>`;
    }
    // --- PIRATE / ADVENTURE ---
    else if (t.includes("pirate") || t.includes("treasure") || t.includes("island") || t.includes("cave") || cat === "Adventure Stories") {
      character = `
        <!-- Ocean waves at bottom -->
        <path d="M-10,140 Q50,125 100,138 Q150,125 200,138 Q240,130 270,145 L270,195 L-10,195Z" fill="#0288D1" opacity="0.6"/>
        <!-- Treasure chest -->
        <g transform="translate(90,85)">
          <rect x="0" y="20" width="80" height="55" fill="#795548" rx="4"/>
          <path d="M0,20 A40,20 0 0,1 80,20Z" fill="#5D4037"/>
          <rect x="28" y="38" width="24" height="20" fill="#FFD54F" rx="3"/>
          <rect x="35" y="44" width="10" height="10" fill="#FF6F00" rx="2"/>
          <circle cx="40" cy="49" r="3" fill="#FFD54F"/>
        </g>
        <!-- Pirate hat -->
        <g transform="translate(160,55)">
          <ellipse cx="0" cy="30" rx="28" ry="8" fill="#212121"/>
          <polygon points="-18,30 0,-5 18,30Z" fill="#212121"/>
          <ellipse cx="0" cy="10" rx="10" ry="4" fill="#fff"/>
          <polygon points="-4,8 0,-4 4,8" fill="#1a1a2e"/>
        </g>`;
    }
    // --- MERMAID / OCEAN ---
    else if (t.includes("mermaid") || t.includes("ocean") || t.includes("dolphin") || t.includes("fish")) {
      character = `
        <!-- Water surface -->
        <path d="M-10,120 Q65,105 130,118 Q195,105 270,120 L270,195 L-10,195Z" fill="#0288D1" opacity="0.7"/>
        <path d="M-10,132 Q65,117 130,130 Q195,117 270,132 L270,195 L-10,195Z" fill="#0277BD" opacity="0.6"/>
        <!-- Mermaid figure -->
        <ellipse cx="130" cy="105" rx="18" ry="12" fill="#FFCC80"/>
        <path d="M115,115 Q112,145 120,160 Q130,170 140,160 Q148,145 145,115Z" fill="#00897B"/>
        <!-- Tail fin -->
        <path d="M118,158 Q105,172 115,178 Q130,172 130,165Z" fill="#00695C"/>
        <path d="M142,158 Q155,172 145,178 Q130,172 130,165Z" fill="#00695C"/>
        <!-- Hair -->
        <path d="M115,105 Q108,85 120,80 Q130,75 140,80 Q152,85 145,105Z" fill="#F48FB1"/>
        <!-- Eyes -->
        <circle cx="124" cy="103" r="3" fill="#fff"/>
        <circle cx="124" cy="103" r="1.5" fill="#1a1a2e"/>
        <circle cx="136" cy="103" r="3" fill="#fff"/>
        <circle cx="136" cy="103" r="1.5" fill="#1a1a2e"/>
        <!-- Bubbles -->
        <circle cx="165" cy="90" r="5" fill="rgba(255,255,255,0.5)" stroke="rgba(255,255,255,0.7)" stroke-width="1"/>
        <circle cx="175" cy="75" r="3" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.6)" stroke-width="1"/>
        <circle cx="155" cy="78" r="4" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.6)" stroke-width="1"/>`;
    }
    // --- RABBIT / BUNNY ---
    else if (t.includes("rabbit") || t.includes("bunny") || t.includes("clever rabbit") || t.includes("moon rabbit")) {
      character = `
        <!-- Grass ground -->
        <path d="M-10,150 Q80,135 160,148 Q220,135 270,150 L270,195 L-10,195Z" fill="#558B2F" opacity="0.8"/>
        <!-- Clover flower -->
        <circle cx="80" cy="148" r="5" fill="#66BB6A"/>
        <circle cx="88" cy="144" r="5" fill="#66BB6A"/>
        <circle cx="84" cy="155" r="5" fill="#66BB6A"/>
        <!-- Rabbit body -->
        <ellipse cx="130" cy="130" rx="25" ry="20" fill="#fff"/>
        <!-- Head -->
        <ellipse cx="130" cy="100" rx="20" ry="18" fill="#fff"/>
        <!-- Ears -->
        <ellipse cx="120" cy="72" rx="7" ry="22" fill="#fff" transform="rotate(-8 120 72)"/>
        <ellipse cx="120" cy="72" rx="3.5" ry="16" fill="#FFCDD2" transform="rotate(-8 120 72)"/>
        <ellipse cx="140" cy="70" rx="7" ry="22" fill="#fff" transform="rotate(8 140 70)"/>
        <ellipse cx="140" cy="70" rx="3.5" ry="16" fill="#FFCDD2" transform="rotate(8 140 70)"/>
        <!-- Eyes -->
        <circle cx="123" cy="97" r="4" fill="#fff" stroke="#e0e0e0" stroke-width="1"/>
        <circle cx="124" cy="97" r="2" fill="#1a1a2e"/>
        <circle cx="123" cy="96" r="0.8" fill="#fff"/>
        <circle cx="137" cy="97" r="4" fill="#fff" stroke="#e0e0e0" stroke-width="1"/>
        <circle cx="138" cy="97" r="2" fill="#1a1a2e"/>
        <circle cx="137" cy="96" r="0.8" fill="#fff"/>
        <!-- Nose + mouth -->
        <ellipse cx="130" cy="104" rx="4" ry="3" fill="#FFCDD2"/>
        <path d="M127,107 Q130,111 133,107" fill="none" stroke="#e0e0e0" stroke-width="1.5" stroke-linecap="round"/>
        <!-- Cheeks -->
        <circle cx="120" cy="106" r="4" fill="#FFCDD2" opacity="0.7"/>
        <circle cx="140" cy="106" r="4" fill="#FFCDD2" opacity="0.7"/>
        <!-- Tail -->
        <circle cx="155" cy="135" r="8" fill="#f5f5f5"/>`;
    }
    // --- LION ---
    else if (t.includes("lion") || t.includes("mouse")) {
      character = `
        <!-- Savannah ground -->
        <path d="M-10,155 Q80,140 160,152 Q220,140 270,155 L270,195 L-10,195Z" fill="#FF8F00" opacity="0.5"/>
        <!-- Lion mane -->
        <circle cx="130" cy="105" rx="42" cy="105" r="40" fill="#FF8F00"/>
        <circle cx="130" cy="105" r="36" fill="#FFA000"/>
        <!-- Lion face -->
        <circle cx="130" cy="105" r="28" fill="#FFE082"/>
        <!-- Ears -->
        <circle cx="106" cy="78" r="10" fill="#FF8F00"/>
        <circle cx="106" cy="78" r="6" fill="#FFE082"/>
        <circle cx="154" cy="78" r="10" fill="#FF8F00"/>
        <circle cx="154" cy="78" r="6" fill="#FFE082"/>
        <!-- Eyes -->
        <circle cx="120" cy="98" r="6" fill="#fff" stroke="#e0e0e0" stroke-width="1"/>
        <circle cx="121" cy="98" r="3" fill="#4E342E"/>
        <circle cx="120" cy="97" r="1.2" fill="#fff"/>
        <circle cx="140" cy="98" r="6" fill="#fff" stroke="#e0e0e0" stroke-width="1"/>
        <circle cx="141" cy="98" r="3" fill="#4E342E"/>
        <circle cx="140" cy="97" r="1.2" fill="#fff"/>
        <!-- Snout -->
        <ellipse cx="130" cy="110" rx="12" ry="9" fill="#FFCCBC"/>
        <ellipse cx="130" cy="106" rx="5" ry="4" fill="#FF7043"/>
        <!-- Nose nostrils -->
        <circle cx="127" cy="107" r="1.5" fill="#BF360C"/>
        <circle cx="133" cy="107" r="1.5" fill="#BF360C"/>
        <!-- Smile -->
        <path d="M123,114 Q130,120 137,114" fill="none" stroke="#BF360C" stroke-width="2" stroke-linecap="round"/>
        <!-- Whiskers -->
        <line x1="90" y1="110" x2="115" y2="110" stroke="#FF8F00" stroke-width="1.5" opacity="0.6"/>
        <line x1="92" y1="116" x2="116" y2="113" stroke="#FF8F00" stroke-width="1.5" opacity="0.6"/>
        <line x1="170" y1="110" x2="145" y2="110" stroke="#FF8F00" stroke-width="1.5" opacity="0.6"/>
        <line x1="168" y1="116" x2="144" y2="113" stroke="#FF8F00" stroke-width="1.5" opacity="0.6"/>`;
    }
    // --- ELEPHANT ---
    else if (t.includes("elephant")) {
      character = `
        <!-- Jungle grass -->
        <path d="M-10,155 Q80,140 170,150 Q220,138 270,155 L270,195 L-10,195Z" fill="#388E3C" opacity="0.7"/>
        <!-- Trees -->
        <rect x="210" y="118" width="5" height="35" fill="#5D4037"/>
        <circle cx="212" cy="110" r="18" fill="#43A047"/>
        <circle cx="225" cy="118" r="12" fill="#66BB6A"/>
        <!-- Elephant body -->
        <ellipse cx="115" cy="125" rx="48" ry="35" fill="#78909C"/>
        <!-- Head -->
        <circle cx="163" cy="105" r="30" fill="#78909C"/>
        <!-- Trunk -->
        <path d="M178,118 Q200,130 195,155 Q185,165 175,155 Q178,140 165,128Z" fill="#607D8B"/>
        <!-- Ear -->
        <ellipse cx="140" cy="105" rx="20" ry="25" fill="#546E7A"/>
        <ellipse cx="143" cy="105" rx="13" ry="18" fill="#90A4AE"/>
        <!-- Eye -->
        <circle cx="168" cy="95" r="7" fill="#fff" stroke="#e0e0e0" stroke-width="1"/>
        <circle cx="169" cy="95" r="3.5" fill="#1a1a2e"/>
        <circle cx="168" cy="94" r="1.4" fill="#fff"/>
        <!-- Small tusk -->
        <path d="M175,115 Q185,115 190,122" fill="none" stroke="#FFF9C4" stroke-width="4" stroke-linecap="round"/>
        <!-- Legs -->
        <rect x="84" y="152" width="20" height="22" fill="#607D8B" rx="5"/>
        <rect x="110" y="152" width="20" height="22" fill="#607D8B" rx="5"/>
        <rect x="135" y="152" width="20" height="22" fill="#607D8B" rx="5"/>
        <!-- Tail -->
        <path d="M67,118 Q52,128 55,140" fill="none" stroke="#607D8B" stroke-width="4" stroke-linecap="round"/>
        <circle cx="55" cy="140" r="5" fill="#90A4AE"/>`;
    }
    // --- OWL / BIRD / PENGUIN ---
    else if (t.includes("owl") || t.includes("wise owl") || t.includes("bird") || t.includes("rainbow bird")) {
      character = `
        <!-- Branch -->
        <path d="M60,130 Q130,115 200,128" fill="none" stroke="#6D4C41" stroke-width="10" stroke-linecap="round"/>
        <path d="M75,125 Q85,108 95,118" fill="#A5D6A7"/>
        <path d="M165,122 Q178,108 185,118" fill="#A5D6A7"/>
        <!-- Owl body -->
        <ellipse cx="130" cy="100" rx="28" ry="32" fill="#5E35B1"/>
        <!-- Wing left -->
        <path d="M102,100 Q88,115 95,130 Q108,118 112,102Z" fill="#4527A0"/>
        <!-- Wing right -->
        <path d="M158,100 Q172,115 165,130 Q152,118 148,102Z" fill="#4527A0"/>
        <!-- Chest -->
        <ellipse cx="130" cy="110" rx="18" ry="22" fill="#fff" opacity="0.85"/>
        <!-- Face disc -->
        <ellipse cx="130" cy="92" rx="22" ry="20" fill="#7E57C2"/>
        <!-- Eyes -->
        <circle cx="118" cy="88" r="12" fill="#fff" stroke="#512DA8" stroke-width="2"/>
        <circle cx="118" cy="88" r="7" fill="#7B1FA2"/>
        <circle cx="116" cy="86" r="3" fill="#fff"/>
        <circle cx="142" cy="88" r="12" fill="#fff" stroke="#512DA8" stroke-width="2"/>
        <circle cx="142" cy="88" r="7" fill="#7B1FA2"/>
        <circle cx="140" cy="86" r="3" fill="#fff"/>
        <!-- Beak -->
        <polygon points="126,95 130,106 134,95" fill="#FFA000"/>
        <!-- Ear tufts -->
        <polygon points="110,72 105,55 120,66" fill="#4527A0"/>
        <polygon points="150,72 155,55 140,66" fill="#4527A0"/>`;
    }
    // --- FOX ---
    else if (t.includes("fox") || t.includes("happy fox")) {
      character = `
        <!-- Forest background -->
        <path d="M-10,152 Q80,135 165,148 Q220,135 270,152 L270,195 L-10,195Z" fill="#4CAF50" opacity="0.6"/>
        <!-- Fox body -->
        <ellipse cx="130" cy="130" rx="32" ry="24" fill="#EF6C00"/>
        <!-- Head -->
        <circle cx="130" cy="95" r="26" fill="#EF6C00"/>
        <!-- Muzzle -->
        <ellipse cx="130" cy="106" rx="14" ry="11" fill="#FFE0B2"/>
        <!-- Ears -->
        <polygon points="108,78 100,52 122,72" fill="#EF6C00"/>
        <polygon points="108,78 104,60 118,72" fill="#FF8A65"/>
        <polygon points="152,78 160,52 138,72" fill="#EF6C00"/>
        <polygon points="152,78 156,60 142,72" fill="#FF8A65"/>
        <!-- Eyes -->
        <circle cx="120" cy="90" r="5" fill="#fff"/>
        <circle cx="121" cy="90" r="2.5" fill="#1a1a2e"/>
        <circle cx="120" cy="89" r="1" fill="#fff"/>
        <circle cx="140" cy="90" r="5" fill="#fff"/>
        <circle cx="141" cy="90" r="2.5" fill="#1a1a2e"/>
        <circle cx="140" cy="89" r="1" fill="#fff"/>
        <!-- Nose -->
        <ellipse cx="130" cy="103" rx="4" ry="3" fill="#1a1a2e"/>
        <!-- Smile -->
        <path d="M124,109 Q130,114 136,109" fill="none" stroke="#BF360C" stroke-width="1.5" stroke-linecap="round"/>
        <!-- Bushy tail -->
        <path d="M98,130 Q72,120 65,140 Q72,155 98,145Z" fill="#EF6C00"/>
        <path d="M78,136 Q68,142 72,152 Q80,148 86,140Z" fill="#fff"/>`;
    }
    // --- PENGUIN ---
    else if (t.includes("penguin")) {
      character = `
        <!-- Ice/snow ground -->
        <path d="M-10,155 Q80,140 165,152 Q220,140 270,155 L270,195 L-10,195Z" fill="#E3F2FD" opacity="0.9"/>
        <!-- Snowflakes -->
        <g fill="#90CAF9" opacity="0.6">
          <circle cx="55" cy="75" r="2"/><circle cx="200" cy="65" r="2.5"/><circle cx="175" cy="90" r="1.5"/>
        </g>
        <!-- Penguin body -->
        <ellipse cx="130" cy="118" rx="30" ry="38" fill="#1A237E"/>
        <!-- Belly -->
        <ellipse cx="130" cy="120" rx="20" ry="28" fill="#fff"/>
        <!-- Head -->
        <circle cx="130" cy="82" r="26" fill="#1A237E"/>
        <!-- Face -->
        <ellipse cx="130" cy="88" rx="18" ry="15" fill="#fff"/>
        <!-- Eyes -->
        <circle cx="122" cy="82" r="5" fill="#fff"/>
        <circle cx="123" cy="82" r="2.5" fill="#1a1a2e"/>
        <circle cx="122" cy="81" r="1" fill="#fff"/>
        <circle cx="138" cy="82" r="5" fill="#fff"/>
        <circle cx="139" cy="82" r="2.5" fill="#1a1a2e"/>
        <circle cx="138" cy="81" r="1" fill="#fff"/>
        <!-- Beak -->
        <polygon points="126,90 134,90 130,98" fill="#FF8F00"/>
        <!-- Cheek blush -->
        <circle cx="114" cy="90" r="4" fill="#FF8A80" opacity="0.7"/>
        <circle cx="146" cy="90" r="4" fill="#FF8A80" opacity="0.7"/>
        <!-- Flippers -->
        <path d="M100,108 Q80,100 78,120 Q88,128 108,122Z" fill="#12227E"/>
        <path d="M160,108 Q180,100 182,120 Q172,128 152,122Z" fill="#12227E"/>
        <!-- Feet -->
        <ellipse cx="120" cy="155" rx="10" ry="5" fill="#FF8F00"/>
        <ellipse cx="140" cy="155" rx="10" ry="5" fill="#FF8F00"/>`;
    }
    // --- DEFAULT / FAIRY TALE / BEDTIME / MORAL / FRIENDSHIP ---
    else {
      character = `
        <!-- Rainbow -->
        <path d="M30,155 A100,100 0 0,1 230,155" fill="none" stroke="#FF8A80" stroke-width="7" opacity="0.4"/>
        <path d="M42,155 A88,88 0 0,1 218,155" fill="none" stroke="#FFE082" stroke-width="7" opacity="0.4"/>
        <path d="M54,155 A76,76 0 0,1 206,155" fill="none" stroke="#80CBC4" stroke-width="7" opacity="0.4"/>
        <!-- Crescent Moon -->
        <path d="M175,25 A30,30 0 1,0 205,60 A26,26 0 1,1 175,25Z" fill="#FFE082" opacity="0.9"/>
        <!-- Star -->
        <polygon points="80,40 83,49 92,49 85,55 88,64 80,58 72,64 75,55 68,49 77,49" fill="#FFD54F" opacity="0.8"/>
        <!-- Floating open book -->
        <g transform="translate(82,72) scale(0.9)">
          <path d="M0,22 Q35,5 65,18 Q95,5 130,22 L130,10 Q95,-8 65,5 Q35,-8 0,10Z" fill="#FFF9C4"/>
          <path d="M0,22 Q35,5 65,18 L65,5Z" fill="#FFF59D"/>
          <path d="M-2,24 Q35,7 65,20 Q95,7 132,24 L132,22 Q95,5 65,18 Q35,5 -2,22Z" fill="#5D4037"/>
          <line x1="65" y1="5" x2="65" y2="20" stroke="#8D6E63" stroke-width="1.5" opacity="0.5"/>
          <line x1="20" y1="15" x2="60" y2="10" stroke="#BCAAA4" stroke-width="1" opacity="0.5"/>
          <line x1="20" y1="19" x2="60" y2="14" stroke="#BCAAA4" stroke-width="1" opacity="0.5"/>
          <line x1="72" y1="10" x2="112" y2="15" stroke="#BCAAA4" stroke-width="1" opacity="0.5"/>
          <line x1="72" y1="14" x2="112" y2="19" stroke="#BCAAA4" stroke-width="1" opacity="0.5"/>
        </g>
        <!-- Butterfly 1 -->
        <path d="M55,100 C48,92 48,108 55,104 C62,108 62,92 55,100Z" fill="#FF4081" opacity="0.8"/>
        <!-- Butterfly 2 -->
        <path d="M195,85 C188,77 188,93 195,89 C202,93 202,77 195,85Z" fill="#00E5FF" opacity="0.8"/>`;
    }

    const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 190" class="w-full h-full object-cover select-none pointer-events-none">${bg}${stars}${character}${cloud}</svg>`;
    return fullSvg;
  },

  renderAll() {
    const targets = document.querySelectorAll("[data-svg-title]");
    targets.forEach(elem => {
      const title = elem.getAttribute("data-svg-title");
      const category = elem.getAttribute("data-svg-category");
      elem.innerHTML = this.getIllustration(title, category);
    });
  }
};

if (typeof window !== "undefined") {
  window.SVGGenerator = SVGGenerator;
}
