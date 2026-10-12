export interface Position {
  id: number;
  name: string;
  category: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  description: string;
  instructions: string[];
}

export const positions: Position[] = [
  // FACE TO FACE
  { id: 1, name: "Missionary", category: "Face to Face", difficulty: 1, description: "Classic face-to-face position, one partner on top.", instructions: ["Lie on your back", "Partner positions on top facing you", "Maintain eye contact", "Move together in rhythm"] },
  { id: 2, name: "The Lotus", category: "Face to Face", difficulty: 2, description: "Seated intimate position with wrapped legs.", instructions: ["Sit cross-legged or on edge of bed", "Partner sits on your lap facing you", "Wrap legs around each other", "Hold each other close"] },
  { id: 3, name: "The Spider", category: "Face to Face", difficulty: 3, description: "Face-to-face with elevated legs.", instructions: ["Lie on your back", "Raise legs and place on partner's shoulders", "Partner kneels between your legs", "Hold hands for balance"] },
  { id: 4, name: "Face to Face Sitting", category: "Face to Face", difficulty: 2, description: "Seated position facing each other.", instructions: ["Sit on edge of bed or chair", "Partner sits on your lap facing you", "Wrap arms around each other", "Lean into each other"] },
  { id: 5, name: "The Shovel", category: "Face to Face", difficulty: 2, description: "Close face-to-face with legs raised.", instructions: ["Lie flat on your back", "Raise legs straight up", "Partner leans over you", "Partner holds your legs for support"] },
  { id: 6, name: "Spread Eagle", category: "Face to Face", difficulty: 1, description: "Open leg position lying down.", instructions: ["Lie on your back", "Spread legs wide", "Partner positions between your legs", "Relax and enjoy closeness"] },
  { id: 7, name: "The Clamp", category: "Face to Face", difficulty: 3, description: "Tight embrace face-to-face.", instructions: ["Lie on your back", "Partner on top in close embrace", "Wrap legs tightly around partner", "Hold each other firmly"] },
  { id: 8, name: "The Anvil", category: "Face to Face", difficulty: 3, description: "Legs pushed back toward head.", instructions: ["Lie on your back", "Push legs back toward your head", "Partner supports your legs", "Partner leans forward"] },
  { id: 9, name: "The Squeeze", category: "Face to Face", difficulty: 2, description: "Close embrace with pressure.", instructions: ["Lie on your back", "Partner on top facing you", "Squeeze legs together around partner", "Maintain close body contact"] },
  { id: 10, name: "The Butterfly", category: "Face to Face", difficulty: 2, description: "Edge of bed with legs spread.", instructions: ["Lie at edge of bed, hips at edge", "Let legs hang off edge and spread", "Partner stands or kneels before you", "Hold onto partner or bed frame"] },

  // WOMAN ON TOP
  { id: 11, name: "Cowgirl", category: "On Top", difficulty: 1, description: "Partner on top facing forward.", instructions: ["Lie on your back", "Partner straddles on top facing you", "Partner controls the rhythm", "Hold partner's hips or hands"] },
  { id: 12, name: "Reverse Cowgirl", category: "On Top", difficulty: 2, description: "Partner on top facing away.", instructions: ["Lie on your back", "Partner straddles facing your feet", "Partner leans forward or back", "Enjoy the different angle"] },
  { id: 13, name: "The Amazon", category: "On Top", difficulty: 3, description: "Partner kneeling on top.", instructions: ["Lie on your back", "Partner kneels on top facing you", "Partner uses legs for control", "Partner leans back slightly"] },
  { id: 14, name: "The Squat", category: "On Top", difficulty: 3, description: "Deep squatting position on top.", instructions: ["Lie on your back", "Partner squats on top of you", "Partner holds balance with hands on your chest", "Partner controls depth"] },
  { id: 15, name: "The Seesaw", category: "On Top", difficulty: 2, description: "Rocking motion on top.", instructions: ["Lie on your back", "Partner on top facing you", "Partner rocks back and forth", "Hold partner's waist for support"] },
  { id: 16, name: "The Waterfall", category: "On Top", difficulty: 3, description: "Partner arching backward on top.", instructions: ["Lie on your back", "Partner on top facing your feet", "Partner arches backward", "Partner supports with hands on your legs"] },
  { id: 17, name: "The Chair", category: "On Top", difficulty: 2, description: "Seated position with partner on top.", instructions: ["Sit upright on bed or chair", "Partner sits on your lap facing you", "Wrap arms around each other", "Move together gently"] },
  { id: 18, name: "The Crib", category: "On Top", difficulty: 2, description: "Gentle bouncing on top.", instructions: ["Lie on your back", "Partner on top facing you", "Partner bounces gently", "Hold partner's hips"] },
  { id: 19, name: "The Lateral", category: "On Top", difficulty: 3, description: "Side-angled position on top.", instructions: ["Lie on your back", "Partner on top at an angle", "Partner faces to the side", "Adjust angle for comfort"] },
  { id: 20, name: "The Pendulum", category: "On Top", difficulty: 3, description: "Swinging motion on top.", instructions: ["Lie on your back", "Partner on top facing you", "Partner swings side to side", "Hold onto each other"] },

  // FROM BEHIND
  { id: 21, name: "Doggy Style", category: "From Behind", difficulty: 1, description: "Classic rear-entry on all fours.", instructions: ["Get on hands and knees", "Partner kneels behind you", "Partner enters from behind", "Adjust angle with pillows if needed"] },
  { id: 22, name: "Prone Bone", category: "From Behind", difficulty: 1, description: "Lying flat face down.", instructions: ["Lie flat on your stomach", "Partner lies on top from behind", "Relax into the mattress", "Partner supports upper body weight"] },
  { id: 23, name: "The Wheelbarrow", category: "From Behind", difficulty: 4, description: "Standing with legs held by partner.", instructions: ["Stand and lean forward on hands", "Partner stands behind holding your legs", "Walk forward on hands", "Partner controls movement"] },
  { id: 24, name: "Flat Doggy", category: "From Behind", difficulty: 2, description: "Flat on stomach, partner behind.", instructions: ["Lie flat on stomach", "Raise hips slightly with pillow", "Partner kneels behind", "Partner lies partially on top"] },
  { id: 25, name: "The Scoop", category: "From Behind", difficulty: 2, description: "Spoon-like from behind.", instructions: ["Lie on your side", "Partner behind you, same direction", "Partner wraps around you", "Both facing same direction"] },
  { id: 26, name: "The Piledriver", category: "From Behind", difficulty: 5, description: "Advanced folded position.", instructions: ["Lie on your back", "Fold legs back over head", "Partner kneels and lifts hips", "Requires flexibility - go slow"] },
  { id: 27, name: "The Bridge", category: "From Behind", difficulty: 4, description: "Arched back from behind.", instructions: ["Lie on your back", "Arch hips up like a bridge", "Partner kneels behind supporting hips", "Hold position with partner's help"] },
  { id: 28, name: "The Arch", category: "From Behind", difficulty: 3, description: "Deep arch rear position.", instructions: ["Get on hands and knees", "Arch your back deeply", "Lower your head to bed", "Partner enters from behind"] },
  { id: 29, name: "The Slope", category: "From Behind", difficulty: 2, description: "Inclined rear position.", instructions: ["Lie on stomach with hips elevated", "Use pillow under hips", "Partner behind you", "Angle provides deeper access"] },
  { id: 30, name: "The Helicopter", category: "From Behind", difficulty: 4, description: "Rotating rear position.", instructions: ["Partner on all fours", "You kneel behind", "Rotate angle as you move", "Communicate with partner"] },

  // SIDE BY SIDE
  { id: 31, name: "Spooning", category: "Side by Side", difficulty: 1, description: "Both facing same direction.", instructions: ["Both lie on your sides", "Partner behind you, same direction", "Partner wraps around your back", "Intimate and relaxed"] },
  { id: 32, name: "Face to Face Side", category: "Side by Side", difficulty: 1, description: "Both on sides facing each other.", instructions: ["Both lie on your sides facing each other", "Tangle legs together", "Hold each other close", "Move gently together"] },
  { id: 33, name: "The Scissors", category: "Side by Side", difficulty: 2, description: "Legs crossed like scissors.", instructions: ["Lie on your sides facing each other", "Cross legs in scissor motion", "One leg over, one under", "Find comfortable rhythm"] },
  { id: 34, name: "The Zipper", category: "Side by Side", difficulty: 2, description: "Interlocking side position.", instructions: ["Lie facing each other on sides", "Interlock legs", "Move together in unison", "Hold each other's backs"] },
  { id: 35, name: "The Crab", category: "Side by Side", difficulty: 3, description: "Offset angle side position.", instructions: ["Lie on your side", "Partner behind at an offset angle", "Adjust for comfortable entry", "Hold each other's hips"] },
  { id: 36, name: "The Starfish", category: "Side by Side", difficulty: 1, description: "Spread out side position.", instructions: ["Lie on your side with legs spread", "Partner behind you", "Partner lies close", "Relax into the position"] },
  { id: 37, name: "The Triangle", category: "Side by Side", difficulty: 3, description: "Triangular body alignment.", instructions: ["Lie on your back", "Partner lies perpendicular to you", "Create a T-shape with bodies", "Adjust angle together"] },
  { id: 38, name: "The Pretzel", category: "Side by Side", difficulty: 3, description: "Tangled limbs side position.", instructions: ["Both lie on sides facing each other", "Wrap legs around each other", "Entangle arms too", "Move as one unit"] },
  { id: 39, name: "The Spoon Fork", category: "Side by Side", difficulty: 2, description: "Variation of spooning.", instructions: ["Lie on your side", "Partner behind, one of your legs raised", "Partner holds raised leg", "Adjust depth with leg position"] },
  { id: 40, name: "The Lazy Dog", category: "Side by Side", difficulty: 1, description: "Relaxed side-by-side rear.", instructions: ["Lie on your side", "Partner behind you", "Both relaxed and comfortable", "Perfect for lazy mornings"] },

  // STANDING
  { id: 41, name: "Standing Face to Face", category: "Standing", difficulty: 2, description: "Both standing facing each other.", instructions: ["Both stand facing each other", "Wrap legs around partner if height allows", "Hold onto each other or wall", "Use wall for support if needed"] },
  { id: 42, name: "Standing Rear", category: "Standing", difficulty: 2, description: "Both standing, rear entry.", instructions: ["Stand and lean forward slightly", "Partner stands behind", "Hold onto furniture for support", "Bend forward for better angle"] },
  { id: 43, name: "The Wall", category: "Standing", difficulty: 3, description: "Against wall for support.", instructions: ["Stand with back against wall", "Partner lifts you or stands close", "Use wall for leverage", "Wrap legs around partner"] },
  { id: 44, name: "The One-Legged Stand", category: "Standing", difficulty: 3, description: "One leg raised while standing.", instructions: ["Stand and raise one leg on surface", "Partner stands before you", "Hold onto partner or surface", "Adjust height as needed"] },
  { id: 45, name: "The Lift", category: "Standing", difficulty: 4, description: "Partner lifted off ground.", instructions: ["Both stand facing each other", "Partner wraps legs around you", "You lift partner up", "Hold against wall for support"] },
  { id: 46, name: "The Balcony", category: "Standing", difficulty: 3, description: "Elevated standing position.", instructions: ["Stand on elevated surface", "Partner stands below or at same level", "Adjust for height difference", "Use railing for support"] },
  { id: 47, name: "The Surfboard", category: "Standing", difficulty: 4, description: "Dynamic standing balance.", instructions: ["Stand with feet apart", "Partner faces you, wraps legs", "Hold partner's thighs", "Balance together"] },
  { id: 48, name: "The Tree", category: "Standing", difficulty: 3, description: "One leg wrapped standing.", instructions: ["Stand on one leg", "Partner wraps one leg around your hip", "Hold onto each other", "Switch legs as needed"] },
  { id: 49, name: "The Flagpole", category: "Standing", difficulty: 4, description: "Vertical standing embrace.", instructions: ["Stand straight", "Partner wraps fully around you", "Hold partner securely", "Lean against wall for support"] },
  { id: 50, name: "The Elevator", category: "Standing", difficulty: 4, description: "Rising and falling standing.", instructions: ["Both stand facing", "Partner wraps legs around you", "Slowly rise and lower", "Use wall or furniture for support"] },

  // SEATED
  { id: 51, name: "The Chair Sit", category: "Seated", difficulty: 2, description: "Seated in chair, partner on lap.", instructions: ["Sit in sturdy chair", "Partner sits on your lap facing you", "Wrap arms around each other", "Rock together gently"] },
  { id: 52, name: "The Lap", category: "Seated", difficulty: 2, description: "Partner seated on lap.", instructions: ["Sit on edge of bed or chair", "Partner straddles your lap", "Hold partner's waist", "Move together"] },
  { id: 53, name: "The Seat", category: "Seated", difficulty: 2, description: "Rear seated position.", instructions: ["Sit on edge of bed", "Partner sits on lap facing away", "Wrap arms around partner", "Lean back together"] },
  { id: 54, name: "The Throne", category: "Seated", difficulty: 3, description: "Regal seated position.", instructions: ["Sit upright in chair", "Partner sits facing you", "Partner leans back against you", "Hold partner's hips"] },
  { id: 55, name: "The Lotus Seat", category: "Seated", difficulty: 3, description: "Cross-legged seated intimate.", instructions: ["Sit cross-legged", "Partner sits in your lap", "Both wrap legs around each other", "Hold close and move gently"] },
  { id: 56, name: "The Office", category: "Seated", difficulty: 2, description: "Desk or table seated.", instructions: ["Sit at edge of desk or table", "Partner stands or kneels before you", "Lean back on hands", "Partner controls movement"] },
  { id: 57, name: "The Couch", category: "Seated", difficulty: 1, description: "Relaxed couch position.", instructions: ["Sit on couch together", "Partner straddles your lap", "Sink into cushions", "Move at comfortable pace"] },
  { id: 58, name: "The Bench", category: "Seated", difficulty: 2, description: "Bench or firm surface.", instructions: ["Sit on bench or firm surface", "Partner faces you on lap", "Hold edges for leverage", "Move together"] },
  { id: 59, name: "The Rocking Chair", category: "Seated", difficulty: 3, description: "Rhythmic rocking motion.", instructions: ["Sit in rocking chair", "Partner on lap facing you", "Rock back and forth together", "Sync your movements"] },
  { id: 60, name: "The Table", category: "Seated", difficulty: 2, description: "On table surface.", instructions: ["Lie or sit on table", "Partner stands between your legs", "Hold onto table edges", "Enjoy the firm surface"] },

  // ADVANCED / ACROBATIC
  { id: 61, name: "The Stand and Carry", category: "Advanced", difficulty: 5, description: "Full carry while standing.", instructions: ["Partner wraps fully around you", "You lift and carry partner", "Walk carefully", "Requires strength and trust"] },
  { id: 62, name: "The Flying Frog", category: "Advanced", difficulty: 4, description: "Squatting leap position.", instructions: ["Partner squats deeply", "You support from behind", "Partner bounces up and down", "Hold partner's waist firmly"] },
  { id: 63, name: "The Suspended", category: "Advanced", difficulty: 5, description: "Fully suspended in air.", instructions: ["Use sturdy overhead support", "Partner is lifted and suspended", "Hold securely at all times", "Only attempt with trust and strength"] },
  { id: 64, name: "The Wheel", category: "Advanced", difficulty: 4, description: "Rotating circular motion.", instructions: ["Start in standard position", "Rotate angle gradually", "Create circular motion", "Communicate throughout"] },
  { id: 65, name: "The Corkscrew", category: "Advanced", difficulty: 4, description: "Twisting spiral motion.", instructions: ["Begin in comfortable position", "Gradually twist angle", "Create spiral movement", "Go slowly and communicate"] },
  { id: 66, name: "The Gantry", category: "Advanced", difficulty: 4, description: "Overhead support position.", instructions: ["Use headboard or frame for support", "Partner hangs or is supported", "You provide stability", "Ensure secure grip"] },
  { id: 67, name: "The Space Monkey", category: "Advanced", difficulty: 5, description: "Zero gravity style float.", instructions: ["Partner lies on back", "You position on top", "Create floating sensation", "Use gentle movements"] },
  { id: 68, name: "The Origami", category: "Advanced", difficulty: 5, description: "Complex folded position.", instructions: ["Requires flexibility from both", "Fold into position carefully", "Support each other's weight", "Communicate constantly"] },
  { id: 69, name: "The Pretzel Twist", category: "Advanced", difficulty: 4, description: "Twisted tangled position.", instructions: ["Start tangled together", "Add twist to bodies", "Find comfortable angle", "Hold each other steady"] },
  { id: 70, name: "The Dragon", category: "Advanced", difficulty: 5, description: "Powerful advanced position.", instructions: ["Requires strength and flexibility", "One partner provides base", "Other partner climbs on top", "Build up to this gradually"] },
];
