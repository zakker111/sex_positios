import React from 'react';

interface Props {
  positionId: number;
  className?: string;
}

const ManColor = "#4A9EFF";
const WomanColor = "#FF4D6D";
const SW = 6; // stroke width for limbs
const HR = 13; // head radius

export const PositionIllustration: React.FC<Props> = ({ positionId, className }) => {
  const renderIllustration = () => {
    const category = getCategory(positionId);
    switch (category) {
      case 'face-to-face': return renderFaceToFace(positionId);
      case 'on-top': return renderOnTop(positionId);
      case 'from-behind': return renderFromBehind(positionId);
      case 'side-by-side': return renderSideBySide(positionId);
      case 'standing': return renderStanding(positionId);
      case 'seated': return renderSeated(positionId);
      case 'advanced': return renderAdvanced(positionId);
      default: return renderFaceToFace(positionId);
    }
  };

  return (
    <svg
      viewBox="0 0 300 240"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {renderIllustration()}
      {/* Legend */}
      <circle cx="30" cy="225" r="8" fill={ManColor} />
      <text x="44" y="230" fill="#aaa" fontSize="13" fontFamily="sans-serif" fontWeight="bold">Male</text>
      <circle cx="110" cy="225" r="8" fill={WomanColor} />
      <text x="124" y="230" fill="#aaa" fontSize="13" fontFamily="sans-serif" fontWeight="bold">Female</text>
    </svg>
  );
};

function getCategory(id: number): string {
  if (id <= 10) return 'face-to-face';
  if (id <= 20) return 'on-top';
  if (id <= 30) return 'from-behind';
  if (id <= 40) return 'side-by-side';
  if (id <= 50) return 'standing';
  if (id <= 60) return 'seated';
  return 'advanced';
}

// Helper components for clear stick figures
const Head = ({ cx, cy, color }: { cx: number; cy: number; color: string }) => (
  <circle cx={cx} cy={cy} r={HR} fill={color} />
);

const Limb = ({ x1, y1, x2, y2, color, w = SW }: { x1: number; y1: number; x2: number; y2: number; color: string; w?: number }) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={w} strokeLinecap="round" />
);

// Draw a full person: head, torso, two arms, two legs
const Person = ({ 
  headX, headY, color, 
  torsoEndX, torsoEndY,
  leftArmX, leftArmY, rightArmX, rightArmY,
  leftLegX, leftLegY, rightLegX, rightLegY
}: {
  headX: number; headY: number; color: string;
  torsoEndX: number; torsoEndY: number;
  leftArmX: number; leftArmY: number; rightArmX: number; rightArmY: number;
  leftLegX: number; leftLegY: number; rightLegX: number; rightLegY: number;
}) => {
  const shoulderY = headY + HR + 5;
  return (
    <>
      <Head cx={headX} cy={headY} color={color} />
      {/* Torso */}
      <Limb x1={headX} y1={headY + HR} x2={torsoEndX} y2={torsoEndY} color={color} w={7} />
      {/* Arms from shoulder area */}
      <Limb x1={headX} y1={shoulderY} x2={leftArmX} y2={leftArmY} color={color} />
      <Limb x1={headX} y1={shoulderY} x2={rightArmX} y2={rightArmY} color={color} />
      {/* Legs from hip */}
      <Limb x1={torsoEndX} y1={torsoEndY} x2={leftLegX} y2={leftLegY} color={color} />
      <Limb x1={torsoEndX} y1={torsoEndY} x2={rightLegX} y2={rightLegY} color={color} />
    </>
  );
};

// Connection indicator (heart/link between figures)
const Connection = ({ x, y }: { x: number; y: number }) => (
  <g opacity="0.6">
    <circle cx={x} cy={y} r="4" fill="#FF6B9D" />
    <circle cx={x} cy={y} r="7" fill="none" stroke="#FF6B9D" strokeWidth="1" opacity="0.4" />
  </g>
);

// Surface/bed indicator
const Surface = ({ y = 195 }: { y?: number }) => (
  <line x1="20" y1={y} x2="280" y2={y} stroke="#333" strokeWidth="2" strokeDasharray="8,5" />
);

function renderFaceToFace(id: number) {
  const M = ManColor;
  const F = WomanColor;
  const variations = [
    // 1. Missionary - man on top, woman on back
    () => (
      <>
        <Surface />
        {/* Woman lying flat on back */}
        <Person
          headX={150} headY={182} color={F}
          torsoEndX={150} torsoEndY={148}
          leftArmX={125} leftArmY={165} rightArmX={175} rightArmY={165}
          leftLegX={130} leftLegY={195} rightLegX={170} rightLegY={195}
        />
        {/* Man on top, propped up */}
        <Person
          headX={150} headY={100} color={M}
          torsoEndX={150} torsoEndY={148}
          leftArmX={120} leftArmY={130} rightArmX={180} rightArmY={130}
          leftLegX={135} leftLegY={185} rightLegX={165} rightLegY={185}
        />
        <Connection x={150} y={148} />
      </>
    ),
    // 2. Lotus - seated facing, legs wrapped
    () => (
      <>
        <Surface />
        {/* Man seated cross-legged */}
        <Person
          headX={120} headY={95} color={M}
          torsoEndX={120} torsoEndY={150}
          leftArmX={95} leftArmY={120} rightArmX={145} rightArmY={120}
          leftLegX={95} leftLegY={175} rightLegX={145} rightLegY={175}
        />
        {/* Woman sitting on lap, facing */}
        <Person
          headX={165} headY={90} color={F}
          torsoEndX={160} torsoEndY={140}
          leftArmX={140} leftArmY={110} rightArmX={185} rightArmY={110}
          leftLegX={130} leftLegY={160} rightLegX={170} rightLegY={165}
        />
        <Connection x={142} y={125} />
      </>
    ),
    // 3. Spider - woman legs on man's shoulders
    () => (
      <>
        <Surface />
        {/* Woman lying back, legs raised */}
        <Person
          headX={150} headY={185} color={F}
          torsoEndX={150} torsoEndY={150}
          leftArmX={125} leftArmY={170} rightArmX={175} rightArmY={170}
          leftLegX={120} leftLegY={105} rightLegX={180} rightLegY={105}
        />
        {/* Man kneeling between her legs */}
        <Person
          headX={150} headY={72} color={M}
          torsoEndX={150} torsoEndY={125}
          leftArmX={125} leftArmY={100} rightArmX={175} rightArmY={100}
          leftLegX={135} leftLegY={170} rightLegX={165} rightLegY={170}
        />
        <Connection x={150} y={130} />
      </>
    ),
    // 4. Face to Face Sitting
    () => (
      <>
        <Surface />
        {/* Man seated on edge */}
        <Person
          headX={115} headY={100} color={M}
          torsoEndX={115} torsoEndY={155}
          leftArmX={90} leftArmY={125} rightArmX={140} rightArmY={125}
          leftLegX={100} leftLegY={195} rightLegX={130} rightLegY={195}
        />
        {/* Woman on his lap facing him */}
        <Person
          headX={170} headY={95} color={F}
          torsoEndX={165} torsoEndY={145}
          leftArmX={145} leftArmY={115} rightArmX={190} rightArmY={115}
          leftLegX={130} leftLegY={165} rightLegX={175} rightLegY={170}
        />
        <Connection x={142} y={120} />
      </>
    ),
    // 5. Shovel - legs straight up
    () => (
      <>
        <Surface />
        {/* Woman lying, legs straight up */}
        <Person
          headX={150} headY={185} color={F}
          torsoEndX={150} torsoEndY={150}
          leftArmX={125} leftArmY={170} rightArmX={175} rightArmY={170}
          leftLegX={140} leftLegY={80} rightLegX={160} rightLegY={80}
        />
        {/* Man leaning over her raised legs */}
        <Person
          headX={175} headY={75} color={M}
          torsoEndX={165} torsoEndY={130}
          leftArmX={145} leftArmY={100} rightArmX={195} rightArmY={100}
          leftLegX={150} leftLegY={180} rightLegX={180} rightLegY={180}
        />
        <Connection x={155} y={115} />
      </>
    ),
    // 6. Spread Eagle - legs wide
    () => (
      <>
        <Surface />
        {/* Woman legs spread wide */}
        <Person
          headX={150} headY={185} color={F}
          torsoEndX={150} torsoEndY={150}
          leftArmX={120} leftArmY={168} rightArmX={180} rightArmY={168}
          leftLegX={100} leftLegY={195} rightLegX={200} rightLegY={195}
        />
        {/* Man on top */}
        <Person
          headX={150} headY={95} color={M}
          torsoEndX={150} torsoEndY={148}
          leftArmX={120} leftArmY={118} rightArmX={180} rightArmY={118}
          leftLegX={135} leftLegY={190} rightLegX={165} rightLegY={190}
        />
        <Connection x={150} y={148} />
      </>
    ),
    // 7. Clamp - tight wrap
    () => (
      <>
        <Surface />
        <Person
          headX={150} headY={185} color={F}
          torsoEndX={150} torsoEndY={150}
          leftArmX={125} leftArmY={168} rightArmX={175} rightArmY={168}
          leftLegX={140} leftLegY={140} rightLegX={160} rightLegY={140}
        />
        <Person
          headX={150} headY={92} color={M}
          torsoEndX={150} torsoEndY={145}
          leftArmX={125} leftArmY={115} rightArmX={175} rightArmY={115}
          leftLegX={138} leftLegY={190} rightLegX={162} rightLegY={190}
        />
        <Connection x={150} y={145} />
      </>
    ),
    // 8. Anvil - legs pushed back to head
    () => (
      <>
        <Surface />
        <Person
          headX={150} headY={185} color={F}
          torsoEndX={150} torsoEndY={150}
          leftArmX={125} leftArmY={170} rightArmX={175} rightArmY={170}
          leftLegX={115} leftLegY={95} rightLegX={185} rightLegY={95}
        />
        <Person
          headX={150} headY={65} color={M}
          torsoEndX={150} torsoEndY={120}
          leftArmX={120} leftArmY={92} rightArmX={180} rightArmY={92}
          leftLegX={135} leftLegY={175} rightLegX={165} rightLegY={175}
        />
        <Connection x={150} y={115} />
      </>
    ),
    // 9. Squeeze
    () => (
      <>
        <Surface />
        <Person
          headX={150} headY={185} color={F}
          torsoEndX={150} torsoEndY={150}
          leftArmX={125} leftArmY={168} rightArmX={175} rightArmY={168}
          leftLegX={142} leftLegY={145} rightLegX={158} rightLegY={145}
        />
        <Person
          headX={150} headY={95} color={M}
          torsoEndX={150} torsoEndY={148}
          leftArmX={125} leftArmY={118} rightArmX={175} rightArmY={118}
          leftLegX={140} leftLegY={192} rightLegX={160} rightLegY={192}
        />
        <Connection x={150} y={148} />
      </>
    ),
    // 10. Butterfly - edge of bed
    () => (
      <>
        {/* Bed edge */}
        <rect x="130" y="140" width="150" height="8" fill="#2a2a2a" stroke="#444" strokeWidth="1.5" rx="3" />
        <line x1="135" y1="148" x2="135" y2="200" stroke="#444" strokeWidth="3" />
        {/* Woman at edge, legs hanging */}
        <Person
          headX={115} headY={125} color={F}
          torsoEndX={120} torsoEndY={145}
          leftArmX={95} leftArmY={138} rightArmX={140} rightArmY={138}
          leftLegX={105} leftLegY={185} rightLegX={135} rightLegY={185}
        />
        {/* Man standing */}
        <Person
          headX={170} headY={60} color={M}
          torsoEndX={170} torsoEndY={130}
          leftArmX={145} leftArmY={100} rightArmX={195} rightArmY={100}
          leftLegX={158} leftLegY={195} rightLegX={182} rightLegY={195}
        />
        <Connection x={145} y={130} />
      </>
    ),
  ];

  const idx = (id - 1) % variations.length;
  return variations[idx]();
}

function renderOnTop(id: number) {
  const M = ManColor;
  const F = WomanColor;
  const variations = [
    // 11. Cowgirl
    () => (
      <>
        <Surface />
        <Person
          headX={150} headY={175} color={M}
          torsoEndX={150} torsoEndY={140}
          leftArmX={120} leftArmY={155} rightArmX={180} rightArmY={155}
          leftLegX={130} leftLegY={195} rightLegX={170} rightLegY={195}
        />
        <Person
          headX={150} headY={72} color={F}
          torsoEndX={150} torsoEndY={125}
          leftArmX={120} leftArmY={95} rightArmX={180} rightArmY={95}
          leftLegX={130} leftLegY={150} rightLegX={170} rightLegY={150}
        />
        <Connection x={150} y={132} />
      </>
    ),
    // 12. Reverse Cowgirl
    () => (
      <>
        <Surface />
        <Person
          headX={150} headY={175} color={M}
          torsoEndX={150} torsoEndY={140}
          leftArmX={120} leftArmY={155} rightArmX={180} rightArmY={155}
          leftLegX={130} leftLegY={195} rightLegX={170} rightLegY={195}
        />
        <Person
          headX={150} headY={72} color={F}
          torsoEndX={150} torsoEndY={125}
          leftArmX={125} leftArmY={85} rightArmX={175} rightArmY={85}
          leftLegX={130} leftLegY={150} rightLegX={170} rightLegY={150}
        />
        {/* Arrow showing facing away */}
        <path d="M 150 60 L 150 45 L 145 52 M 150 45 L 155 52" fill="none" stroke="#666" strokeWidth="2" />
        <Connection x={150} y={132} />
      </>
    ),
    // 13. Amazon
    () => (
      <>
        <Surface />
        <Person
          headX={150} headY={178} color={M}
          torsoEndX={150} torsoEndY={140}
          leftArmX={118} leftArmY={158} rightArmX={182} rightArmY={158}
          leftLegX={128} leftLegY={195} rightLegX={172} rightLegY={195}
        />
        <Person
          headX={150} headY={58} color={F}
          torsoEndX={150} torsoEndY={115}
          leftArmX={118} leftArmY={82} rightArmX={182} rightArmY={82}
          leftLegX={125} leftLegY={145} rightLegX={175} rightLegY={145}
        />
        <Connection x={150} y={125} />
      </>
    ),
    // 14. Squat - deep squat
    () => (
      <>
        <Surface />
        <Person
          headX={150} headY={178} color={M}
          torsoEndX={150} torsoEndY={145}
          leftArmX={120} leftArmY={160} rightArmX={180} rightArmY={160}
          leftLegX={128} leftLegY={195} rightLegX={172} rightLegY={195}
        />
        <Person
          headX={150} headY={48} color={F}
          torsoEndX={150} torsoEndY={100}
          leftArmX={118} leftArmY={72} rightArmX={182} rightArmY={72}
          leftLegX={115} leftLegY={135} rightLegX={185} rightLegY={135}
        />
        <Connection x={150} y={120} />
      </>
    ),
    // 15. Seesaw - rocking
    () => (
      <>
        <Surface />
        <Person
          headX={150} headY={178} color={M}
          torsoEndX={150} torsoEndY={140}
          leftArmX={120} leftArmY={158} rightArmX={180} rightArmY={158}
          leftLegX={130} leftLegY={195} rightLegX={170} rightLegY={195}
        />
        <Person
          headX={140} headY={68} color={F}
          torsoEndX={148} torsoEndY={125}
          leftArmX={118} leftArmY={92} rightArmX={168} rightArmY={92}
          leftLegX={128} leftLegY={148} rightLegX={168} rightLegY={148}
        />
        {/* Rocking arrows */}
        <path d="M 120 55 Q 150 45 180 55" fill="none" stroke="#666" strokeWidth="2" strokeDasharray="4,3" />
        <Connection x={148} y={130} />
      </>
    ),
    // 16. Waterfall - arching back
    () => (
      <>
        <Surface />
        <Person
          headX={150} headY={178} color={M}
          torsoEndX={150} torsoEndY={140}
          leftArmX={120} leftArmY={158} rightArmX={180} rightArmY={158}
          leftLegX={130} leftLegY={195} rightLegX={170} rightLegY={195}
        />
        <Person
          headX={155} headY={52} color={F}
          torsoEndX={148} torsoEndY={118}
          leftArmX={125} leftArmY={62} rightArmX={185} rightArmY={62}
          leftLegX={125} leftLegY={145} rightLegX={170} rightLegY={148}
        />
        <Connection x={150} y={125} />
      </>
    ),
    // 17. Chair - seated together
    () => (
      <>
        <Surface />
        {/* Chair */}
        <rect x="100" y="140" width="100" height="8" fill="#2a2a2a" stroke="#555" strokeWidth="1.5" rx="3" />
        <line x1="105" y1="148" x2="105" y2="198" stroke="#555" strokeWidth="3" />
        <line x1="195" y1="148" x2="195" y2="198" stroke="#555" strokeWidth="3" />
        <Person
          headX={150} headY={100} color={M}
          torsoEndX={150} torsoEndY={142}
          leftArmX={122} leftArmY={118} rightArmX={178} rightArmY={118}
          leftLegX={132} leftLegY={180} rightLegX={168} rightLegY={180}
        />
        <Person
          headX={150} headY={52} color={F}
          torsoEndX={150} torsoEndY={100}
          leftArmX={122} leftArmY={72} rightArmX={178} rightArmY={72}
          leftLegX={128} leftLegY={125} rightLegX={172} rightLegY={125}
        />
        <Connection x={150} y={100} />
      </>
    ),
    // 18. Crib - bouncing
    () => (
      <>
        <Surface />
        <Person
          headX={150} headY={178} color={M}
          torsoEndX={150} torsoEndY={140}
          leftArmX={120} leftArmY={158} rightArmX={180} rightArmY={158}
          leftLegX={130} leftLegY={195} rightLegX={170} rightLegY={195}
        />
        <Person
          headX={150} headY={62} color={F}
          torsoEndX={150} torsoEndY={118}
          leftArmX={120} leftArmY={85} rightArmX={180} rightArmY={85}
          leftLegX={128} leftLegY={142} rightLegX={172} rightLegY={142}
        />
        {/* Bounce arrows */}
        <path d="M 200 70 L 200 90 M 196 85 L 200 90 L 204 85" fill="none" stroke="#666" strokeWidth="2" />
        <path d="M 200 60 L 200 45 M 196 50 L 200 45 L 204 50" fill="none" stroke="#666" strokeWidth="2" />
        <Connection x={150} y={128} />
      </>
    ),
    // 19. Lateral - angled
    () => (
      <>
        <Surface />
        <Person
          headX={150} headY={178} color={M}
          torsoEndX={150} torsoEndY={140}
          leftArmX={120} leftArmY={158} rightArmX={180} rightArmY={158}
          leftLegX={130} leftLegY={195} rightLegX={170} rightLegY={195}
        />
        <Person
          headX={185} headY={72} color={F}
          torsoEndX={170} torsoEndY={125}
          leftArmX={148} leftArmY={95} rightArmX={205} rightArmY={95}
          leftLegX={140} leftLegY={148} rightLegX={185} rightLegY={155}
        />
        <Connection x={162} y={130} />
      </>
    ),
    // 20. Pendulum - swinging
    () => (
      <>
        <Surface />
        <Person
          headX={150} headY={178} color={M}
          torsoEndX={150} torsoEndY={140}
          leftArmX={120} leftArmY={158} rightArmX={180} rightArmY={158}
          leftLegX={130} leftLegY={195} rightLegX={170} rightLegY={195}
        />
        <Person
          headX={130} headY={65} color={F}
          torsoEndX={145} torsoEndY={125}
          leftArmX={115} leftArmY={90} rightArmX={168} rightArmY={90}
          leftLegX={120} leftLegY={148} rightLegX={165} rightLegY={148}
        />
        {/* Swing arc */}
        <path d="M 105 55 Q 150 42 195 55" fill="none" stroke="#666" strokeWidth="2" strokeDasharray="4,3" />
        <Connection x={148} y={130} />
      </>
    ),
  ];

  const idx = (id - 11) % variations.length;
  return variations[idx]();
}

function renderFromBehind(id: number) {
  const M = ManColor;
  const F = WomanColor;
  const variations = [
    // 21. Doggy Style
    () => (
      <>
        <Surface />
        {/* Woman on all fours */}
        <Person
          headX={95} headY={115} color={F}
          torsoEndX={145} torsoEndY={140}
          leftArmX={80} leftArmY={145} rightArmX={105} rightArmY={100}
          leftLegX={130} leftLegY={195} rightLegX={160} rightLegY={195}
        />
        {/* Man kneeling behind */}
        <Person
          headX={195} headY={90} color={M}
          torsoEndX={185} torsoEndY={140}
          leftArmX={160} leftArmY={118} rightArmX={215} rightArmY={118}
          leftLegX={170} leftLegY={195} rightLegX={200} rightLegY={195}
        />
        <Connection x={165} y={140} />
      </>
    ),
    // 22. Prone Bone - flat
    () => (
      <>
        <Surface />
        {/* Woman flat on stomach */}
        <Person
          headX={80} headY={178} color={F}
          torsoEndX={155} torsoEndY={175}
          leftArmX={65} leftArmY={185} rightArmX={95} rightArmY={168}
          leftLegX={175} leftLegY={190} rightLegX={175} rightLegY={165}
        />
        {/* Man on top */}
        <Person
          headX={148} headY={148} color={M}
          torsoEndX={155} torsoEndY={175}
          leftArmX={130} leftArmY={162} rightArmX={168} rightArmY={162}
          leftLegX={165} leftLegY={195} rightLegX={180} rightLegY={185}
        />
        <Connection x={155} y={175} />
      </>
    ),
    // 23. Wheelbarrow
    () => (
      <>
        <Surface />
        {/* Woman on hands, legs up */}
        <Person
          headX={75} headY={118} color={F}
          torsoEndX={120} torsoEndY={130}
          leftArmX={60} leftArmY={155} rightArmX={90} rightArmY={105}
          leftLegX={175} leftLegY={85} rightLegX={175} rightLegY={100}
        />
        {/* Man standing, holding legs */}
        <Person
          headX={200} headY={52} color={M}
          torsoEndX={200} torsoEndY={130}
          leftArmX={175} leftArmY={90} rightArmX={225} rightArmY={90}
          leftLegX={185} leftLegY={195} rightLegX={215} rightLegY={195}
        />
        <Connection x={175} y={92} />
      </>
    ),
    // 24. Flat Doggy
    () => (
      <>
        <Surface />
        {/* Pillow */}
        <ellipse cx="100" cy="175" rx="28" ry="10" fill="#2a2a2a" stroke="#555" strokeWidth="1.5" />
        {/* Woman flat, hips slightly raised */}
        <Person
          headX={80} headY={170} color={F}
          torsoEndX={145} torsoEndY={162}
          leftArmX={65} leftArmY={185} rightArmX={95} rightArmY={160}
          leftLegX={165} leftLegY={195} rightLegX={160} rightLegY={178}
        />
        {/* Man kneeling behind */}
        <Person
          headX={200} headY={105} color={M}
          torsoEndX={190} torsoEndY={155}
          leftArmX={165} leftArmY={135} rightArmX={218} rightArmY={135}
          leftLegX={175} leftLegY={195} rightLegX={205} rightLegY={195}
        />
        <Connection x={170} y={160} />
      </>
    ),
    // 25. Scoop - spooning from behind
    () => (
      <>
        <Surface />
        {/* Woman on side */}
        <Person
          headX={95} headY={160} color={F}
          torsoEndX={145} torsoEndY={165}
          leftArmX={80} leftArmY={172} rightArmX={110} rightArmY={150}
          leftLegX={165} leftLegY={180} rightLegX={162} rightLegY={155}
        />
        {/* Man behind, wrapping around */}
        <Person
          headX={115} headY={130} color={M}
          torsoEndX={155} torsoEndY={155}
          leftArmX={100} leftArmY={145} rightArmX={135} rightArmY={120}
          leftLegX={170} leftLegY={185} rightLegX={175} rightLegY={165}
        />
        <Connection x={150} y={158} />
      </>
    ),
    // 26. Piledriver
    () => (
      <>
        <Surface />
        {/* Woman folded */}
        <Person
          headX={150} headY={185} color={F}
          torsoEndX={150} torsoEndY={150}
          leftArmX={125} leftArmY={170} rightArmX={175} rightArmY={170}
          leftLegX={110} leftLegY={95} rightLegX={190} rightLegY={95}
        />
        {/* Man kneeling, lifting */}
        <Person
          headX={150} headY={55} color={M}
          torsoEndX={150} torsoEndY={110}
          leftArmX={118} leftArmY={82} rightArmX={182} rightArmY={82}
          leftLegX={130} leftLegY={170} rightLegX={170} rightLegY={170}
        />
        <Connection x={150} y={115} />
      </>
    ),
    // 27. Bridge
    () => (
      <>
        <Surface />
        {/* Woman arched like bridge */}
        <Person
          headX={80} headY={170} color={F}
          torsoEndX={140} torsoEndY={130}
          leftArmX={65} leftArmY={185} rightArmX={95} rightArmY={158}
          leftLegX={165} leftLegY={190} rightLegX={150} rightLegY={165}
        />
        {/* Man kneeling, supporting */}
        <Person
          headX={195} headY={88} color={M}
          torsoEndX={185} torsoEndY={140}
          leftArmX={158} leftArmY={118} rightArmX={215} rightArmY={118}
          leftLegX={170} leftLegY={195} rightLegX={200} rightLegY={195}
        />
        <Connection x={165} y={135} />
      </>
    ),
    // 28. Arch - deep arch
    () => (
      <>
        <Surface />
        {/* Woman arched deeply, head down */}
        <Person
          headX={85} headY={160} color={F}
          torsoEndX={130} torsoEndY={130}
          leftArmX={70} leftArmY={175} rightArmX={100} rightArmY={148}
          leftLegX={150} leftLegY={190} rightLegX={145} rightLegY={168}
        />
        {/* Man behind */}
        <Person
          headX={195} headY={95} color={M}
          torsoEndX={185} torsoEndY={145}
          leftArmX={158} leftArmY={125} rightArmX={215} rightArmY={125}
          leftLegX={170} leftLegY={195} rightLegX={200} rightLegY={195}
        />
        <Connection x={162} y={140} />
      </>
    ),
    // 29. Slope - inclined
    () => (
      <>
        <Surface />
        {/* Pillow/wedge */}
        <polygon points="85,185 135,185 135,165" fill="#2a2a2a" stroke="#555" strokeWidth="1.5" />
        {/* Woman face down, hips elevated */}
        <Person
          headX={80} headY={175} color={F}
          torsoEndX={140} torsoEndY={158}
          leftArmX={65} leftArmY={185} rightArmX={95} rightArmY={165}
          leftLegX={160} leftLegY={185} rightLegX={155} rightLegY={170}
        />
        {/* Man kneeling behind */}
        <Person
          headX={200} headY={98} color={M}
          torsoEndX={190} torsoEndY={150}
          leftArmX={162} leftArmY={128} rightArmX={218} rightArmY={128}
          leftLegX={175} leftLegY={195} rightLegX={205} rightLegY={195}
        />
        <Connection x={168} y={155} />
      </>
    ),
    // 30. Helicopter - rotating
    () => (
      <>
        <Surface />
        {/* Woman on all fours */}
        <Person
          headX={95} headY={118} color={F}
          torsoEndX={145} torsoEndY={142}
          leftArmX={80} leftArmY={148} rightArmX={108} rightArmY={105}
          leftLegX={130} leftLegY={195} rightLegX={160} rightLegY={195}
        />
        {/* Man behind, at angle */}
        <Person
          headX={200} headY={95} color={M}
          torsoEndX={188} torsoEndY={142}
          leftArmX={162} leftArmY={120} rightArmX={220} rightArmY={120}
          leftLegX={172} leftLegY={195} rightLegX={205} rightLegY={195}
        />
        {/* Rotation arrow */}
        <path d="M 175 100 Q 190 85 205 100" fill="none" stroke="#666" strokeWidth="2" strokeDasharray="4,3" />
        <polygon points="205,100 200,95 200,105" fill="#666" />
        <Connection x={168} y={142} />
      </>
    ),
  ];

  const idx = (id - 21) % variations.length;
  return variations[idx]();
}

function renderSideBySide(id: number) {
  const M = ManColor;
  const F = WomanColor;
  const variations = [
    // 31. Spooning
    () => (
      <>
        <Surface />
        {/* Woman on side */}
        <Person
          headX={100} headY={155} color={F}
          torsoEndX={155} torsoEndY={162}
          leftArmX={85} leftArmY={168} rightArmX={115} rightArmY={145}
          leftLegX={175} leftLegY={178} rightLegX={172} rightLegY={155}
        />
        {/* Man behind, wrapping */}
        <Person
          headX={118} headY={125} color={M}
          torsoEndX={165} torsoEndY={150}
          leftArmX={100} leftArmY={140} rightArmX={140} rightArmY={115}
          leftLegX={180} leftLegY={182} rightLegX={185} rightLegY={162}
        />
        <Connection x={160} y={155} />
      </>
    ),
    // 32. Face to Face Side
    () => (
      <>
        <Surface />
        {/* Woman on side facing right */}
        <Person
          headX={95} headY={148} color={F}
          torsoEndX={140} torsoEndY={158}
          leftArmX={80} leftArmY={162} rightArmX={110} rightArmY={138}
          leftLegX={160} leftLegY={178} rightLegX={155} rightLegY={155}
        />
        {/* Man on side facing left */}
        <Person
          headX={205} headY={148} color={M}
          torsoEndX={160} torsoEndY={158}
          leftArmX={190} leftArmY={138} rightArmX={220} rightArmY={162}
          leftLegX={145} leftLegY={155} rightLegX={140} rightLegY={178}
        />
        <Connection x={150} y={158} />
      </>
    ),
    // 33. Scissors
    () => (
      <>
        <Surface />
        {/* Woman */}
        <Person
          headX={80} headY={152} color={F}
          torsoEndX={130} torsoEndY={160}
          leftArmX={65} leftArmY={165} rightArmX={95} rightArmY={142}
          leftLegX={170} leftLegY={148} rightLegX={165} rightLegY={178}
        />
        {/* Man */}
        <Person
          headX={220} headY={148} color={M}
          torsoEndX={170} torsoEndY={160}
          leftArmX={205} leftArmY={140} rightArmX={235} rightArmY={160}
          leftLegX={135} leftLegY={178} rightLegX={130} rightLegY={148}
        />
        <Connection x={150} y={162} />
      </>
    ),
    // 34. Zipper
    () => (
      <>
        <Surface />
        <Person
          headX={90} headY={142} color={F}
          torsoEndX={138} torsoEndY={155}
          leftArmX={75} leftArmY={155} rightArmX={105} rightArmY={132}
          leftLegX={158} leftLegY={175} rightLegX={152} rightLegY={155}
        />
        <Person
          headX={210} headY={142} color={M}
          torsoEndX={162} torsoEndY={155}
          leftArmX={195} leftArmY={132} rightArmX={225} rightArmY={155}
          leftLegX={148} leftLegY={155} rightLegX={142} rightLegY={175}
        />
        <Connection x={150} y={155} />
      </>
    ),
    // 35. Crab - offset angle
    () => (
      <>
        <Surface />
        <Person
          headX={90} headY={158} color={F}
          torsoEndX={140} torsoEndY={155}
          leftArmX={75} leftArmY={170} rightArmX={105} rightArmY={148}
          leftLegX={160} leftLegY={178} rightLegX={155} rightLegY={155}
        />
        <Person
          headX={205} headY={115} color={M}
          torsoEndX={185} torsoEndY={155}
          leftArmX={160} leftArmY={135} rightArmX={225} rightArmY={135}
          leftLegX={170} leftLegY={195} rightLegX={200} rightLegY={195}
        />
        <Connection x={165} y={155} />
      </>
    ),
    // 36. Starfish
    () => (
      <>
        <Surface />
        <Person
          headX={90} headY={155} color={F}
          torsoEndX={140} torsoEndY={160}
          leftArmX={70} leftArmY={170} rightArmX={105} rightArmY={142}
          leftLegX={175} leftLegY={148} rightLegX={170} rightLegY={180}
        />
        <Person
          headX={175} headY={120} color={M}
          torsoEndX={165} torsoEndY={158}
          leftArmX={148} leftArmY={138} rightArmX={198} rightArmY={138}
          leftLegX={150} leftLegY={190} rightLegX={180} rightLegY={190}
        />
        <Connection x={158} y={158} />
      </>
    ),
    // 37. Triangle - T-shape
    () => (
      <>
        <Surface />
        {/* Woman lying vertical */}
        <Person
          headX={150} headY={185} color={F}
          torsoEndX={150} torsoEndY={140}
          leftArmX={125} leftArmY={165} rightArmX={175} rightArmY={165}
          leftLegX={130} leftLegY={195} rightLegX={170} rightLegY={195}
        />
        {/* Man perpendicular */}
        <Person
          headX={225} headY={118} color={M}
          torsoEndX={180} torsoEndY={140}
          leftArmX={210} leftArmY={105} rightArmX={240} rightArmY={130}
          leftLegX={165} leftLegY={170} rightLegX={175} rightLegY={155}
        />
        <Connection x={170} y={140} />
      </>
    ),
    // 38. Pretzel - tangled
    () => (
      <>
        <Surface />
        <Person
          headX={95} headY={130} color={F}
          torsoEndX={135} torsoEndY={150}
          leftArmX={78} leftArmY={145} rightArmX={110} rightArmY={120}
          leftLegX={165} leftLegY={138} rightLegX={145} rightLegY={180}
        />
        <Person
          headX={205} headY={130} color={M}
          torsoEndX={165} torsoEndY={150}
          leftArmX={190} leftArmY={120} rightArmX={222} rightArmY={145}
          leftLegX={155} leftLegY={180} rightLegX={135} rightLegY={138}
        />
        {/* Tangle indicator */}
        <path d="M 140 170 Q 150 160 160 170 Q 170 180 160 185" fill="none" stroke="#666" strokeWidth="1.5" strokeDasharray="3,3" />
        <Connection x={150} y={150} />
      </>
    ),
    // 39. Spoon Fork - leg raised
    () => (
      <>
        <Surface />
        <Person
          headX={95} headY={155} color={F}
          torsoEndX={145} torsoEndY={160}
          leftArmX={80} leftArmY={168} rightArmX={110} rightArmY={145}
          leftLegX={170} leftLegY={140} rightLegX={165} rightLegY={178}
        />
        <Person
          headX={115} headY={122} color={M}
          torsoEndX={158} torsoEndY={148}
          leftArmX={98} leftArmY={138} rightArmX={135} rightArmY={112}
          leftLegX={172} leftLegY={180} rightLegX={178} rightLegY={160}
        />
        <Connection x={158} y={155} />
      </>
    ),
    // 40. Lazy Dog
    () => (
      <>
        <Surface />
        <Person
          headX={85} headY={168} color={F}
          torsoEndX={140} torsoEndY={168}
          leftArmX={70} leftArmY={178} rightArmX={100} rightArmY={158}
          leftLegX={160} leftLegY={180} rightLegX={155} rightLegY={160}
        />
        <Person
          headX={185} headY={130} color={M}
          torsoEndX={170} torsoEndY={165}
          leftArmX={148} leftArmY={148} rightArmX={205} rightArmY={148}
          leftLegX={155} leftLegY={195} rightLegX={185} rightLegY={195}
        />
        <Connection x={158} y={166} />
      </>
    ),
  ];

  const idx = (id - 31) % variations.length;
  return variations[idx]();
}

function renderStanding(id: number) {
  const M = ManColor;
  const F = WomanColor;
  const variations = [
    // 41. Standing Face to Face
    () => (
      <>
        <Surface y={200} />
        <Person
          headX={110} headY={52} color={F}
          torsoEndX={110} torsoEndY={125}
          leftArmX={85} leftArmY={85} rightArmX={135} rightArmY={85}
          leftLegX={95} leftLegY={200} rightLegX={125} rightLegY={200}
        />
        <Person
          headX={190} headY={48} color={M}
          torsoEndX={190} torsoEndY={125}
          leftArmX={165} leftArmY={82} rightArmX={215} rightArmY={82}
          leftLegX={175} leftLegY={200} rightLegX={205} rightLegY={200}
        />
        <Connection x={150} y={110} />
      </>
    ),
    // 42. Standing Rear
    () => (
      <>
        <Surface y={200} />
        <Person
          headX={120} headY={58} color={F}
          torsoEndX={120} torsoEndY={130}
          leftArmX={95} leftArmY={90} rightArmX={145} rightArmY={90}
          leftLegX={105} leftLegY={200} rightLegX={135} rightLegY={200}
        />
        <Person
          headX={190} headY={50} color={M}
          torsoEndX={180} torsoEndY={130}
          leftArmX={155} leftArmY={88} rightArmX={210} rightArmY={88}
          leftLegX={165} leftLegY={200} rightLegX={195} rightLegY={200}
        />
        <Connection x={155} y={125} />
      </>
    ),
    // 43. The Wall
    () => (
      <>
        <Surface y={200} />
        {/* Wall */}
        <rect x="50" y="30" width="12" height="175" fill="#2a2a2a" stroke="#444" strokeWidth="1.5" rx="2" />
        <Person
          headX={95} headY={55} color={F}
          torsoEndX={100} torsoEndY={130}
          leftArmX={72} leftArmY={78} rightArmX={120} rightArmY={78}
          leftLegX={85} leftLegY={175} rightLegX={115} rightLegY={155}
        />
        <Person
          headX={165} headY={48} color={M}
          torsoEndX={155} torsoEndY={128}
          leftArmX={130} leftArmY={85} rightArmX={185} rightArmY={85}
          leftLegX={140} leftLegY={200} rightLegX={170} rightLegY={200}
        />
        <Connection x={130} y={115} />
      </>
    ),
    // 44. One-Legged Stand
    () => (
      <>
        <Surface y={200} />
        {/* Elevated surface */}
        <rect x="55" y="118" width="40" height="8" fill="#2a2a2a" stroke="#555" strokeWidth="1.5" rx="3" />
        <Person
          headX={100} headY={52} color={F}
          torsoEndX={100} torsoEndY={125}
          leftArmX={75} leftArmY={85} rightArmX={125} rightArmY={85}
          leftLegX={85} leftLegY={200} rightLegX={72} rightLegY={122}
        />
        <Person
          headX={185} headY={48} color={M}
          torsoEndX={180} torsoEndY={128}
          leftArmX={155} leftArmY={85} rightArmX={208} rightArmY={85}
          leftLegX={165} leftLegY={200} rightLegX={195} rightLegY={200}
        />
        <Connection x={145} y={118} />
      </>
    ),
    // 45. The Lift
    () => (
      <>
        <Surface y={200} />
        <Person
          headX={150} headY={32} color={M}
          torsoEndX={150} torsoEndY={115}
          leftArmX={118} leftArmY={72} rightArmX={182} rightArmY={72}
          leftLegX={132} leftLegY={200} rightLegX={168} rightLegY={200}
        />
        <Person
          headX={150} headY={62} color={F}
          torsoEndX={150} torsoEndY={110}
          leftArmX={118} leftArmY={85} rightArmX={182} rightArmY={85}
          leftLegX={115} leftLegY={125} rightLegX={185} rightLegY={125}
        />
        <Connection x={150} y={108} />
      </>
    ),
    // 46. Balcony
    () => (
      <>
        <Surface y={200} />
        {/* Railing */}
        <line x1="40" y1="115" x2="260" y2="115" stroke="#555" strokeWidth="4" />
        <line x1="40" y1="115" x2="40" y2="200" stroke="#555" strokeWidth="3" />
        <line x1="260" y1="115" x2="260" y2="200" stroke="#555" strokeWidth="3" />
        <Person
          headX={115} headY={58} color={F}
          torsoEndX={115} torsoEndY={118}
          leftArmX={90} leftArmY={82} rightArmX={140} rightArmY={82}
          leftLegX={100} leftLegY={165} rightLegX={130} rightLegY={148}
        />
        <Person
          headX={185} headY={52} color={M}
          torsoEndX={180} torsoEndY={118}
          leftArmX={155} leftArmY={80} rightArmX={208} rightArmY={80}
          leftLegX={165} leftLegY={165} rightLegX={195} rightLegY={165}
        />
        <Connection x={150} y={110} />
      </>
    ),
    // 47. Surfboard
    () => (
      <>
        <Surface y={200} />
        <Person
          headX={150} headY={32} color={M}
          torsoEndX={150} torsoEndY={115}
          leftArmX={118} leftArmY={70} rightArmX={182} rightArmY={70}
          leftLegX={132} leftLegY={200} rightLegX={168} rightLegY={200}
        />
        <Person
          headX={150} headY={62} color={F}
          torsoEndX={150} torsoEndY={110}
          leftArmX={118} leftArmY={82} rightArmX={182} rightArmY={82}
          leftLegX={115} leftLegY={128} rightLegX={185} rightLegY={128}
        />
        <Connection x={150} y={108} />
      </>
    ),
    // 48. Tree - one leg wrapped
    () => (
      <>
        <Surface y={200} />
        <Person
          headX={140} headY={32} color={M}
          torsoEndX={140} torsoEndY={118}
          leftArmX={115} leftArmY={72} rightArmX={165} rightArmY={72}
          leftLegX={125} leftLegY={200} rightLegX={155} rightLegY={200}
        />
        <Person
          headX={185} headY={52} color={F}
          torsoEndX={178} torsoEndY={118}
          leftArmX={155} leftArmY={78} rightArmX={208} rightArmY={78}
          leftLegX={140} leftLegY={110} rightLegX={195} rightLegY={145}
        />
        <Connection x={162} y={112} />
      </>
    ),
    // 49. Flagpole
    () => (
      <>
        <Surface y={200} />
        <Person
          headX={150} headY={28} color={M}
          torsoEndX={150} torsoEndY={115}
          leftArmX={115} leftArmY={68} rightArmX={185} rightArmY={68}
          leftLegX={132} leftLegY={200} rightLegX={168} rightLegY={200}
        />
        <Person
          headX={150} headY={58} color={F}
          torsoEndX={150} torsoEndY={108}
          leftArmX={118} leftArmY={78} rightArmX={182} rightArmY={78}
          leftLegX={115} leftLegY={122} rightLegX={185} rightLegY={122}
        />
        <Connection x={150} y={105} />
      </>
    ),
    // 50. Elevator
    () => (
      <>
        <Surface y={200} />
        <Person
          headX={150} headY={28} color={M}
          torsoEndX={150} torsoEndY={112}
          leftArmX={115} leftArmY={68} rightArmX={185} rightArmY={68}
          leftLegX={132} leftLegY={200} rightLegX={168} rightLegY={200}
        />
        <Person
          headX={150} headY={58} color={F}
          torsoEndX={150} torsoEndY={105}
          leftArmX={118} leftArmY={78} rightArmX={182} rightArmY={78}
          leftLegX={115} leftLegY={118} rightLegX={185} rightLegY={118}
        />
        {/* Up/down arrows */}
        <path d="M 220 55 L 220 95" stroke="#666" strokeWidth="2" strokeDasharray="4,3" />
        <polygon points="220,50 216,60 224,60" fill="#666" />
        <polygon points="220,100 216,90 224,90" fill="#666" />
        <Connection x={150} y={105} />
      </>
    ),
  ];

  const idx = (id - 41) % variations.length;
  return variations[idx]();
}

function renderSeated(id: number) {
  const M = ManColor;
  const F = WomanColor;
  const variations = [
    // 51. Chair Sit
    () => (
      <>
        <Surface y={200} />
        {/* Chair */}
        <rect x="95" y="140" width="110" height="8" fill="#2a2a2a" stroke="#555" strokeWidth="1.5" rx="3" />
        <line x1="100" y1="148" x2="100" y2="200" stroke="#555" strokeWidth="3" />
        <line x1="200" y1="148" x2="200" y2="200" stroke="#555" strokeWidth="3" />
        <Person
          headX={150} headY={98} color={M}
          torsoEndX={150} torsoEndY={142}
          leftArmX={120} leftArmY={118} rightArmX={180} rightArmY={118}
          leftLegX={128} leftLegY={185} rightLegX={172} rightLegY={185}
        />
        <Person
          headX={150} headY={48} color={F}
          torsoEndX={150} torsoEndY={100}
          leftArmX={120} leftArmY={70} rightArmX={180} rightArmY={70}
          leftLegX={125} leftLegY={125} rightLegX={175} rightLegY={125}
        />
        <Connection x={150} y={100} />
      </>
    ),
    // 52. Lap
    () => (
      <>
        <Surface y={200} />
        <Person
          headX={118} headY={98} color={M}
          torsoEndX={118} torsoEndY={150}
          leftArmX={90} leftArmY={122} rightArmX={148} rightArmY={122}
          leftLegX={100} leftLegY={200} rightLegX={135} rightLegY={200}
        />
        <Person
          headX={165} headY={55} color={F}
          torsoEndX={155} torsoEndY={115}
          leftArmX={135} leftArmY={78} rightArmX={188} rightArmY={78}
          leftLegX={128} leftLegY={138} rightLegX={172} rightLegY={138}
        />
        <Connection x={145} y={115} />
      </>
    ),
    // 53. Seat (rear)
    () => (
      <>
        <Surface y={200} />
        <Person
          headX={150} headY={98} color={M}
          torsoEndX={150} torsoEndY={150}
          leftArmX={120} leftArmY={122} rightArmX={180} rightArmY={122}
          leftLegX={130} leftLegY={200} rightLegX={170} rightLegY={200}
        />
        <Person
          headX={150} headY={48} color={F}
          torsoEndX={150} torsoEndY={110}
          leftArmX={120} leftArmY={72} rightArmX={180} rightArmY={72}
          leftLegX={128} leftLegY={135} rightLegX={172} rightLegY={135}
        />
        <Connection x={150} y={110} />
      </>
    ),
    // 54. Throne
    () => (
      <>
        <Surface y={200} />
        {/* Fancy chair */}
        <rect x="90" y="130" width="120" height="8" fill="#2a2a2a" stroke="#555" strokeWidth="1.5" rx="3" />
        <rect x="88" y="75" width="10" height="60" fill="#2a2a2a" stroke="#555" strokeWidth="1.5" rx="3" />
        <line x1="95" y1="138" x2="95" y2="200" stroke="#555" strokeWidth="3" />
        <line x1="205" y1="138" x2="205" y2="200" stroke="#555" strokeWidth="3" />
        <Person
          headX={150} headY={88} color={M}
          torsoEndX={150} torsoEndY={132}
          leftArmX={120} leftArmY={108} rightArmX={180} rightArmY={108}
          leftLegX={128} leftLegY={178} rightLegX={172} rightLegY={178}
        />
        <Person
          headX={150} headY={38} color={F}
          torsoEndX={150} torsoEndY={90}
          leftArmX={120} leftArmY={60} rightArmX={180} rightArmY={60}
          leftLegX={125} leftLegY={115} rightLegX={175} rightLegY={115}
        />
        <Connection x={150} y={90} />
      </>
    ),
    // 55. Lotus Seat
    () => (
      <>
        <Surface y={200} />
        <Person
          headX={118} headY={88} color={M}
          torsoEndX={118} torsoEndY={145}
          leftArmX={90} leftArmY={112} rightArmX={148} rightArmY={112}
          leftLegX={95} leftLegY={170} rightLegX={142} rightLegY={170}
        />
        <Person
          headX={168} headY={82} color={F}
          torsoEndX={162} torsoEndY={138}
          leftArmX={138} leftArmY={105} rightArmX={192} rightArmY={105}
          leftLegX={130} leftLegY={155} rightLegX={178} rightLegY={160}
        />
        <Connection x={142} y={118} />
      </>
    ),
    // 56. Office
    () => (
      <>
        <Surface y={200} />
        {/* Desk */}
        <rect x="72" y="138" width="156" height="8" fill="#2a2a2a" stroke="#555" strokeWidth="1.5" rx="3" />
        <Person
          headX={150} headY={108} color={F}
          torsoEndX={150} torsoEndY={140}
          leftArmX={122} leftArmY={125} rightArmX={178} rightArmY={125}
          leftLegX={125} leftLegY={172} rightLegX={175} rightLegY={172}
        />
        <Person
          headX={150} headY={45} color={M}
          torsoEndX={150} torsoEndY={108}
          leftArmX={120} leftArmY={72} rightArmX={180} rightArmY={72}
          leftLegX={130} leftLegY={145} rightLegX={170} rightLegY={145}
        />
        <Connection x={150} y={108} />
      </>
    ),
    // 57. Couch
    () => (
      <>
        <Surface y={200} />
        {/* Couch */}
        <rect x="60" y="138" width="180" height="12" fill="#2a2a2a" stroke="#555" strokeWidth="1.5" rx="5" />
        <rect x="56" y="100" width="14" height="50" fill="#2a2a2a" stroke="#555" strokeWidth="1.5" rx="5" />
        <rect x="230" y="100" width="14" height="50" fill="#2a2a2a" stroke="#555" strokeWidth="1.5" rx="5" />
        <Person
          headX={150} headY={90} color={M}
          torsoEndX={150} torsoEndY={140}
          leftArmX={118} leftArmY={112} rightArmX={182} rightArmY={112}
          leftLegX={128} leftLegY={180} rightLegX={172} rightLegY={180}
        />
        <Person
          headX={150} headY={42} color={F}
          torsoEndX={150} torsoEndY={95}
          leftArmX={118} leftArmY={65} rightArmX={182} rightArmY={65}
          leftLegX={125} leftLegY={120} rightLegX={175} rightLegY={120}
        />
        <Connection x={150} y={95} />
      </>
    ),
    // 58. Bench
    () => (
      <>
        <Surface y={200} />
        <rect x="85" y="142" width="130" height="8" fill="#2a2a2a" stroke="#555" strokeWidth="1.5" rx="3" />
        <line x1="90" y1="150" x2="90" y2="200" stroke="#555" strokeWidth="3" />
        <line x1="210" y1="150" x2="210" y2="200" stroke="#555" strokeWidth="3" />
        <Person
          headX={150} headY={98} color={M}
          torsoEndX={150} torsoEndY={145}
          leftArmX={118} leftArmY={118} rightArmX={182} rightArmY={118}
          leftLegX={128} leftLegY={185} rightLegX={172} rightLegY={185}
        />
        <Person
          headX={150} headY={48} color={F}
          torsoEndX={150} torsoEndY={100}
          leftArmX={118} leftArmY={70} rightArmX={182} rightArmY={70}
          leftLegX={125} leftLegY={125} rightLegX={175} rightLegY={125}
        />
        <Connection x={150} y={100} />
      </>
    ),
    // 59. Rocking Chair
    () => (
      <>
        <Surface y={200} />
        {/* Rocking base */}
        <path d="M 75 198 Q 150 182 225 198" fill="none" stroke="#555" strokeWidth="3" />
        <rect x="95" y="138" width="110" height="8" fill="#2a2a2a" stroke="#555" strokeWidth="1.5" rx="3" />
        <line x1="95" y1="85" x2="95" y2="142" stroke="#555" strokeWidth="3" />
        <Person
          headX={150} headY={90} color={M}
          torsoEndX={150} torsoEndY={140}
          leftArmX={118} leftArmY={112} rightArmX={182} rightArmY={112}
          leftLegX={128} leftLegY={178} rightLegX={172} rightLegY={178}
        />
        <Person
          headX={150} headY={42} color={F}
          torsoEndX={150} torsoEndY={95}
          leftArmX={118} leftArmY={65} rightArmX={182} rightArmY={65}
          leftLegX={125} leftLegY={118} rightLegX={175} rightLegY={118}
        />
        <Connection x={150} y={95} />
      </>
    ),
    // 60. Table
    () => (
      <>
        <Surface y={200} />
        {/* Table */}
        <rect x="72" y="138" width="156" height="8" fill="#2a2a2a" stroke="#555" strokeWidth="1.5" rx="3" />
        <line x1="78" y1="146" x2="78" y2="200" stroke="#555" strokeWidth="3" />
        <line x1="222" y1="146" x2="222" y2="200" stroke="#555" strokeWidth="3" />
        <Person
          headX={115} headY={108} color={F}
          torsoEndX={135} torsoEndY={140}
          leftArmX={95} leftArmY={125} rightArmX={135} rightArmY={98}
          leftLegX={118} leftLegY={170} rightLegX={155} rightLegY={170}
        />
        <Person
          headX={185} headY={52} color={M}
          torsoEndX={175} torsoEndY={125}
          leftArmX={150} leftArmY={85} rightArmX={208} rightArmY={85}
          leftLegX={158} leftLegY={175} rightLegX={192} rightLegY={175}
        />
        <Connection x={158} y={128} />
      </>
    ),
  ];

  const idx = (id - 51) % variations.length;
  return variations[idx]();
}

function renderAdvanced(id: number) {
  const M = ManColor;
  const F = WomanColor;
  const variations = [
    // 61. Stand and Carry
    () => (
      <>
        <Surface y={200} />
        <Person
          headX={150} headY={28} color={M}
          torsoEndX={150} torsoEndY={110}
          leftArmX={112} leftArmY={68} rightArmX={188} rightArmY={68}
          leftLegX={130} leftLegY={200} rightLegX={170} rightLegY={200}
        />
        <Person
          headX={150} headY={58} color={F}
          torsoEndX={150} torsoEndY={105}
          leftArmX={112} leftArmY={78} rightArmX={188} rightArmY={78}
          leftLegX={108} leftLegY={120} rightLegX={192} rightLegY={120}
        />
        <Connection x={150} y={102} />
      </>
    ),
    // 62. Flying Frog
    () => (
      <>
        <Surface y={200} />
        <Person
          headX={110} headY={72} color={F}
          torsoEndX={110} torsoEndY={128}
          leftArmX={82} leftArmY={98} rightArmX={138} rightArmY={98}
          leftLegX={85} leftLegY={155} rightLegX={135} rightLegY={155}
        />
        <Person
          headX={195} headY={85} color={M}
          torsoEndX={185} torsoEndY={145}
          leftArmX={155} leftArmY={115} rightArmX={218} rightArmY={115}
          leftLegX={170} leftLegY={200} rightLegX={200} rightLegY={200}
        />
        <Connection x={155} y={130} />
      </>
    ),
    // 63. Suspended
    () => (
      <>
        <Surface y={200} />
        {/* Overhead bar */}
        <rect x="55" y="22" width="190" height="10" fill="#2a2a2a" stroke="#555" strokeWidth="2" rx="4" />
        <Person
          headX={150} headY={48} color={M}
          torsoEndX={150} torsoEndY={110}
          leftArmX={105} leftArmY={32} rightArmX={195} rightArmY={32}
          leftLegX={130} leftLegY={160} rightLegX={170} rightLegY={160}
        />
        <Person
          headX={150} headY={72} color={F}
          torsoEndX={150} torsoEndY={110}
          leftArmX={118} leftArmY={90} rightArmX={182} rightArmY={90}
          leftLegX={115} leftLegY={128} rightLegX={185} rightLegY={128}
        />
        <Connection x={150} y={108} />
      </>
    ),
    // 64. Wheel
    () => (
      <>
        <Surface y={200} />
        <Person
          headX={150} headY={178} color={F}
          torsoEndX={150} torsoEndY={138}
          leftArmX={120} leftArmY={158} rightArmX={180} rightArmY={158}
          leftLegX={125} leftLegY={200} rightLegX={175} rightLegY={200}
        />
        <Person
          headX={150} headY={62} color={M}
          torsoEndX={150} torsoEndY={120}
          leftArmX={118} leftArmY={88} rightArmX={182} rightArmY={88}
          leftLegX={128} leftLegY={155} rightLegX={172} rightLegY={155}
        />
        {/* Rotation arrow */}
        <path d="M 210 75 A 30 30 0 1 1 210 135" fill="none" stroke="#666" strokeWidth="2" strokeDasharray="5,3" />
        <polygon points="210,135 205,125 215,125" fill="#666" />
        <Connection x={150} y={125} />
      </>
    ),
    // 65. Corkscrew
    () => (
      <>
        <Surface y={200} />
        <Person
          headX={150} headY={178} color={F}
          torsoEndX={150} torsoEndY={138}
          leftArmX={120} leftArmY={158} rightArmX={180} rightArmY={158}
          leftLegX={125} leftLegY={200} rightLegX={175} rightLegY={200}
        />
        <Person
          headX={162} headY={62} color={M}
          torsoEndX={152} torsoEndY={120}
          leftArmX={128} leftArmY={88} rightArmX={192} rightArmY={88}
          leftLegX={130} leftLegY={155} rightLegX={172} rightLegY={155}
        />
        {/* Spiral */}
        <path d="M 210 65 Q 220 85 210 105 Q 200 125 210 145" fill="none" stroke="#666" strokeWidth="2" strokeDasharray="4,3" />
        <Connection x={152} y={125} />
      </>
    ),
    // 66. Gantry
    () => (
      <>
        <Surface y={200} />
        {/* Frame */}
        <line x1="60" y1="30" x2="60" y2="200" stroke="#555" strokeWidth="4" />
        <line x1="240" y1="30" x2="240" y2="200" stroke="#555" strokeWidth="4" />
        <line x1="60" y1="30" x2="240" y2="30" stroke="#555" strokeWidth="4" />
        <Person
          headX={150} headY={48} color={M}
          torsoEndX={150} torsoEndY={112}
          leftArmX={80} leftArmY={30} rightArmX={220} rightArmY={30}
          leftLegX={128} leftLegY={165} rightLegX={172} rightLegY={165}
        />
        <Person
          headX={150} headY={72} color={F}
          torsoEndX={150} torsoEndY={112}
          leftArmX={118} leftArmY={90} rightArmX={182} rightArmY={90}
          leftLegX={115} leftLegY={130} rightLegX={185} rightLegY={130}
        />
        <Connection x={150} y={110} />
      </>
    ),
    // 67. Space Monkey
    () => (
      <>
        <Surface y={200} />
        <Person
          headX={150} headY={178} color={F}
          torsoEndX={150} torsoEndY={138}
          leftArmX={120} leftArmY={158} rightArmX={180} rightArmY={158}
          leftLegX={125} leftLegY={200} rightLegX={175} rightLegY={200}
        />
        <Person
          headX={150} headY={68} color={M}
          torsoEndX={150} torsoEndY={122}
          leftArmX={118} leftArmY={92} rightArmX={182} rightArmY={92}
          leftLegX={128} leftLegY={152} rightLegX={172} rightLegY={152}
        />
        {/* Float effect */}
        <path d="M 105 58 Q 150 48 195 58" fill="none" stroke="#666" strokeWidth="1.5" strokeDasharray="4,3" />
        <path d="M 110 50 Q 150 40 190 50" fill="none" stroke="#555" strokeWidth="1" strokeDasharray="3,3" />
        <Connection x={150} y={125} />
      </>
    ),
    // 68. Origami
    () => (
      <>
        <Surface y={200} />
        <Person
          headX={105} headY={130} color={F}
          torsoEndX={130} torsoEndY={110}
          leftArmX={85} leftArmY={148} rightArmX={118} rightArmY={118}
          leftLegX={105} leftLegY={100} rightLegX={150} rightLegY={165}
        />
        <Person
          headX={195} headY={72} color={M}
          torsoEndX={175} torsoEndY={130}
          leftArmX={148} leftArmY={98} rightArmX={218} rightArmY={98}
          leftLegX={155} leftLegY={175} rightLegX={195} rightLegY={175}
        />
        <Connection x={158} y={125} />
      </>
    ),
    // 69. Pretzel Twist
    () => (
      <>
        <Surface y={200} />
        <Person
          headX={100} headY={125} color={F}
          torsoEndX={135} torsoEndY={148}
          leftArmX={78} leftArmY={142} rightArmX={118} rightArmY={112}
          leftLegX={170} leftLegY={132} rightLegX={125} rightLegY={185}
        />
        <Person
          headX={200} headY={100} color={M}
          torsoEndX={168} torsoEndY={148}
          leftArmX={145} leftArmY={118} rightArmX={222} rightArmY={118}
          leftLegX={120} leftLegY={170} rightLegX={185} rightLegY={185}
        />
        {/* Twist */}
        <path d="M 130 165 Q 145 155 160 165 Q 175 175 190 165" fill="none" stroke="#666" strokeWidth="2" strokeDasharray="4,3" />
        <Connection x={152} y={148} />
      </>
    ),
    // 70. Dragon
    () => (
      <>
        <Surface y={200} />
        <Person
          headX={150} headY={170} color={M}
          torsoEndX={150} torsoEndY={125}
          leftArmX={115} leftArmY={145} rightArmX={185} rightArmY={145}
          leftLegX={125} leftLegY={200} rightLegX={175} rightLegY={200}
        />
        <Person
          headX={150} headY={45} color={F}
          torsoEndX={150} torsoEndY={105}
          leftArmX={108} leftArmY={65} rightArmX={192} rightArmY={65}
          leftLegX={115} leftLegY={125} rightLegX={185} rightLegY={125}
        />
        <Connection x={150} y={110} />
        {/* Power sparks */}
        <path d="M 85 38 L 92 30 L 88 42 L 96 34" fill="none" stroke={F} strokeWidth="2" opacity="0.5" />
        <path d="M 208 38 L 215 30 L 211 42 L 219 34" fill="none" stroke={M} strokeWidth="2" opacity="0.5" />
      </>
    ),
  ];

  const idx = (id - 61) % variations.length;
  return variations[idx]();
}

export default PositionIllustration;
