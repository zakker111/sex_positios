import React from 'react';

interface Props {
  positionId: number;
  className?: string;
}

const ManColor = "#4A9EFF";
const WomanColor = "#FF4D6D";

// Simple figure components
const MaleHead = ({ cx, cy }: { cx: number; cy: number }) => (
  <circle cx={cx} cy={cy} r="8" fill={ManColor} />
);

const FemaleHead = ({ cx, cy }: { cx: number; cy: number }) => (
  <circle cx={cx} cy={cy} r="8" fill={WomanColor} />
);

const MaleBody = ({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={ManColor} strokeWidth="4" strokeLinecap="round" />
);

const FemaleBody = ({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={WomanColor} strokeWidth="4" strokeLinecap="round" />
);

const MaleTorso = ({ cx, cy, angle = 0 }: { cx: number; cy: number; angle?: number }) => {
  const rad = (angle * Math.PI) / 180;
  const x2 = cx + Math.sin(rad) * 30;
  const y2 = cy + Math.cos(rad) * 30;
  return <line x1={cx} y1={cy} x2={x2} y2={y2} stroke={ManColor} strokeWidth="4" strokeLinecap="round" />;
};

const FemaleTorso = ({ cx, cy, angle = 0 }: { cx: number; cy: number; angle?: number }) => {
  const rad = (angle * Math.PI) / 180;
  const x2 = cx + Math.sin(rad) * 28;
  const y2 = cy + Math.cos(rad) * 28;
  return <line x1={cx} y1={cy} x2={x2} y2={y2} stroke={WomanColor} strokeWidth="4" strokeLinecap="round" />;
};

// Generate illustration based on position category and ID
export const PositionIllustration: React.FC<Props> = ({ positionId, className }) => {
  const renderIllustration = () => {
    // Group positions by their visual similarity
    const category = getCategory(positionId);

    switch (category) {
      case 'face-to-face':
        return renderFaceToFace(positionId);
      case 'on-top':
        return renderOnTop(positionId);
      case 'from-behind':
        return renderFromBehind(positionId);
      case 'side-by-side':
        return renderSideBySide(positionId);
      case 'standing':
        return renderStanding(positionId);
      case 'seated':
        return renderSeated(positionId);
      case 'advanced':
        return renderAdvanced(positionId);
      default:
        return renderFaceToFace(positionId);
    }
  };

  return (
    <svg
      viewBox="0 0 200 160"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background subtle grid */}
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a1a1a" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="200" height="160" fill="url(#grid)" />

      {/* Bed/surface line */}
      <line x1="10" y1="130" x2="190" y2="130" stroke="#333" strokeWidth="2" strokeDasharray="4,4" />

      {renderIllustration()}

      {/* Legend */}
      <circle cx="20" cy="150" r="4" fill={ManColor} />
      <text x="28" y="153" fill="#888" fontSize="8">M</text>
      <circle cx="50" cy="150" r="4" fill={WomanColor} />
      <text x="58" y="153" fill="#888" fontSize="8">F</text>
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

function renderFaceToFace(id: number) {
  const variations = [
    // Missionary - man on top, woman on back
    () => (
      <>
        {/* Woman lying on back */}
        <FemaleHead cx={100} cy={118} />
        <FemaleBody x1={100} y1={126} x2={100} y2={100} />
        <FemaleBody x1={100} y1={100} x2={85} y2={128} />
        <FemaleBody x1={100} y1={100} x2={115} y2={128} />
        {/* Man on top */}
        <MaleHead cx={100} cy={80} />
        <MaleBody x1={100} y1={88} x2={100} y2={108} />
        <MaleBody x1={100} y1={108} x2={88} y2={128} />
        <MaleBody x1={100} y1={108} x2={112} y2={128} />
        {/* Arms */}
        <MaleBody x1={100} y1={92} x2={85} y2={100} />
        <MaleBody x1={100} y1={92} x2={115} y2={100} />
      </>
    ),
    // Lotus - seated facing
    () => (
      <>
        {/* Man seated */}
        <MaleHead cx={85} cy={75} />
        <MaleBody x1={85} y1={83} x2={85} y2={110} />
        <MaleBody x1={85} y1={110} x2={75} y2={128} />
        <MaleBody x1={85} y1={110} x2={95} y2={128} />
        {/* Woman on lap */}
        <FemaleHead cx={110} cy={78} />
        <FemaleBody x1={110} y1={86} x2={105} y2={108} />
        <FemaleBody x1={105} y1={108} x2={90} y2={115} />
        <FemaleBody x1={105} y1={108} x2={115} y2={120} />
        {/* Arms embracing */}
        <MaleBody x1={85} y1={90} x2={105} y2={90} />
        <FemaleBody x1={110} y1={92} x2={90} y2={92} />
      </>
    ),
    // Spider - legs on shoulders
    () => (
      <>
        {/* Woman lying, legs up */}
        <FemaleHead cx={100} cy={120} />
        <FemaleBody x1={100} y1={112} x2={100} y2={95} />
        <FemaleBody x1={100} y1={95} x2={80} y2={75} />
        <FemaleBody x1={100} y1={95} x2={120} y2={75} />
        {/* Man kneeling between */}
        <MaleHead cx={100} cy={65} />
        <MaleBody x1={100} y1={73} x2={100} y2={95} />
        <MaleBody x1={100} y1={95} x2={90} y2={115} />
        <MaleBody x1={100} y1={95} x2={110} y2={115} />
      </>
    ),
    // Face to face sitting
    () => (
      <>
        {/* Man seated */}
        <MaleHead cx={80} cy={80} />
        <MaleBody x1={80} y1={88} x2={80} y2={115} />
        <MaleBody x1={80} y1={115} x2={70} y2={128} />
        <MaleBody x1={80} y1={115} x2={90} y2={128} />
        {/* Woman on lap facing */}
        <FemaleHead cx={105} cy={82} />
        <FemaleBody x1={105} y1={90} x2={100} y2={112} />
        <FemaleBody x1={100} y1={112} x2={85} y2={120} />
        <FemaleBody x1={100} y1={112} x2={110} y2={125} />
        {/* Embrace */}
        <MaleBody x1={80} y1={95} x2={100} y2={95} />
        <FemaleBody x1={105} y1={97} x2={85} y2={97} />
      </>
    ),
    // Shovel
    () => (
      <>
        {/* Woman lying, legs straight up */}
        <FemaleHead cx={100} cy={122} />
        <FemaleBody x1={100} y1={114} x2={100} y2={95} />
        <FemaleBody x1={100} y1={95} x2={100} y2={65} />
        <FemaleBody x1={100} y1={95} x2={105} y2={65} />
        {/* Man leaning over */}
        <MaleHead cx={115} cy={68} />
        <MaleBody x1={115} y1={76} x2={108} y2={95} />
        <MaleBody x1={108} y1={95} x2={100} y2={115} />
        <MaleBody x1={108} y1={95} x2={120} y2={115} />
      </>
    ),
    // Spread eagle
    () => (
      <>
        {/* Woman lying, legs wide */}
        <FemaleHead cx={100} cy={120} />
        <FemaleBody x1={100} y1={112} x2={100} y2={95} />
        <FemaleBody x1={100} y1={95} x2={75} y2={125} />
        <FemaleBody x1={100} y1={95} x2={125} y2={125} />
        {/* Man on top */}
        <MaleHead cx={100} cy={78} />
        <MaleBody x1={100} y1={86} x2={100} y2={105} />
        <MaleBody x1={100} y1={105} x2={90} y2={125} />
        <MaleBody x1={100} y1={105} x2={110} y2={125} />
        <MaleBody x1={100} y1={90} x2={85} y2={98} />
        <MaleBody x1={100} y1={90} x2={115} y2={98} />
      </>
    ),
    // Clamp
    () => (
      <>
        <FemaleHead cx={100} cy={118} />
        <FemaleBody x1={100} y1={110} x2={100} y2={92} />
        <FemaleBody x1={100} y1={92} x2={92} y2={115} />
        <FemaleBody x1={100} y1={92} x2={108} y2={115} />
        <MaleHead cx={100} cy={76} />
        <MaleBody x1={100} y1={84} x2={100} y2={105} />
        <MaleBody x1={100} y1={105} x2={92} y2={125} />
        <MaleBody x1={100} y1={105} x2={108} y2={125} />
        {/* Tight wrap legs */}
        <FemaleBody x1={92} y1={115} x2={100} y2={105} />
        <FemaleBody x1={108} y1={115} x2={100} y2={105} />
      </>
    ),
    // Anvil
    () => (
      <>
        <FemaleHead cx={100} cy={122} />
        <FemaleBody x1={100} y1={114} x2={100} y2={98} />
        <FemaleBody x1={100} y1={98} x2={80} y2={80} />
        <FemaleBody x1={100} y1={98} x2={120} y2={80} />
        <MaleHead cx={100} cy={68} />
        <MaleBody x1={100} y1={76} x2={100} y2={98} />
        <MaleBody x1={100} y1={98} x2={90} y2={120} />
        <MaleBody x1={100} y1={98} x2={110} y2={120} />
        {/* Man holds legs */}
        <MaleBody x1={100} y1={82} x2={82} y2={80} />
        <MaleBody x1={100} y1={82} x2={118} y2={80} />
      </>
    ),
    // Squeeze
    () => (
      <>
        <FemaleHead cx={100} cy={120} />
        <FemaleBody x1={100} y1={112} x2={100} y2={95} />
        <FemaleBody x1={100} y1={95} x2={95} y2={115} />
        <FemaleBody x1={100} y1={95} x2={105} y2={115} />
        <MaleHead cx={100} cy={78} />
        <MaleBody x1={100} y1={86} x2={100} y2={105} />
        <MaleBody x1={100} y1={105} x2={93} y2={125} />
        <MaleBody x1={100} y1={105} x2={107} y2={125} />
      </>
    ),
    // Butterfly
    () => (
      <>
        {/* Bed edge */}
        <line x1="100" y1="100" x2="100" y2="140" stroke="#333" strokeWidth="2" />
        {/* Woman at edge, legs hanging */}
        <FemaleHead cx={85} cy={105} />
        <FemaleBody x1={85} y1={113} x2={85} y2={100} />
        <FemaleBody x1={85} y1={100} x2={75} y2={130} />
        <FemaleBody x1={85} y1={100} x2={95} y2={130} />
        {/* Man standing */}
        <MaleHead cx={115} cy={65} />
        <MaleBody x1={115} y1={73} x2={115} y2={100} />
        <MaleBody x1={115} y1={100} x2={108} y2={128} />
        <MaleBody x1={115} y1={100} x2={122} y2={128} />
        <MaleBody x1={115} y1={80} x2={95} y2={100} />
      </>
    ),
  ];

  const idx = (id - 1) % variations.length;
  return variations[idx]();
}

function renderOnTop(id: number) {
  const variations = [
    // Cowgirl
    () => (
      <>
        <MaleHead cx={100} cy={115} />
        <MaleBody x1={100} y1={107} x2={100} y2={90} />
        <MaleBody x1={100} y1={90} x2={85} y2={125} />
        <MaleBody x1={100} y1={90} x2={115} y2={125} />
        <FemaleHead cx={100} cy={65} />
        <FemaleBody x1={100} y1={73} x2={100} y2={95} />
        <FemaleBody x1={100} y1={95} x2={90} y2={110} />
        <FemaleBody x1={100} y1={95} x2={110} y2={110} />
        <FemaleBody x1={100} y1={78} x2={85} y2={85} />
        <FemaleBody x1={100} y1={78} x2={115} y2={85} />
      </>
    ),
    // Reverse cowgirl
    () => (
      <>
        <MaleHead cx={100} cy={115} />
        <MaleBody x1={100} y1={107} x2={100} y2={90} />
        <MaleBody x1={100} y1={90} x2={85} y2={125} />
        <MaleBody x1={100} y1={90} x2={115} y2={125} />
        <FemaleHead cx={100} cy={65} />
        <FemaleBody x1={100} y1={73} x2={100} y2={95} />
        <FemaleBody x1={100} y1={95} x2={90} y2={110} />
        <FemaleBody x1={100} y1={95} x2={110} y2={110} />
        {/* Arms back */}
        <FemaleBody x1={100} y1={78} x2={115} y2={70} />
      </>
    ),
    // Amazon
    () => (
      <>
        <MaleHead cx={100} cy={118} />
        <MaleBody x1={100} y1={110} x2={100} y2={92} />
        <MaleBody x1={100} y1={92} x2={85} y2={125} />
        <MaleBody x1={100} y1={92} x2={115} y2={125} />
        <FemaleHead cx={100} cy={60} />
        <FemaleBody x1={100} y1={68} x2={100} y2={92} />
        <FemaleBody x1={100} y1={92} x2={88} y2={108} />
        <FemaleBody x1={100} y1={92} x2={112} y2={108} />
        <FemaleBody x1={100} y1={75} x2={82} y2={82} />
        <FemaleBody x1={100} y1={75} x2={118} y2={82} />
      </>
    ),
    // Squat
    () => (
      <>
        <MaleHead cx={100} cy={118} />
        <MaleBody x1={100} y1={110} x2={100} y2={95} />
        <MaleBody x1={100} y1={95} x2={85} y2={125} />
        <MaleBody x1={100} y1={95} x2={115} y2={125} />
        <FemaleHead cx={100} cy={55} />
        <FemaleBody x1={100} y1={63} x2={100} y2={85} />
        <FemaleBody x1={100} y1={85} x2={85} y2={100} />
        <FemaleBody x1={100} y1={85} x2={115} y2={100} />
        <FemaleBody x1={100} y1={68} x2={85} y2={95} />
        <FemaleBody x1={100} y1={68} x2={115} y2={95} />
      </>
    ),
    // Seesaw
    () => (
      <>
        <MaleHead cx={100} cy={118} />
        <MaleBody x1={100} y1={110} x2={100} y2={92} />
        <MaleBody x1={100} y1={92} x2={85} y2={125} />
        <MaleBody x1={100} y1={92} x2={115} y2={125} />
        <FemaleHead cx={95} cy={68} />
        <FemaleBody x1={95} y1={76} x2={100} y2={95} />
        <FemaleBody x1={100} y1={95} x2={88} y2={112} />
        <FemaleBody x1={100} y1={95} x2={112} y2={112} />
        <MaleBody x1={100} y1={98} x2={90} y2={85} />
        <MaleBody x1={100} y1={98} x2={110} y2={85} />
      </>
    ),
    // Waterfall
    () => (
      <>
        <MaleHead cx={100} cy={118} />
        <MaleBody x1={100} y1={110} x2={100} y2={92} />
        <MaleBody x1={100} y1={92} x2={85} y2={125} />
        <MaleBody x1={100} y1={92} x2={115} y2={125} />
        <FemaleHead cx={100} cy={60} />
        <FemaleBody x1={100} y1={68} x2={105} y2={90} />
        <FemaleBody x1={105} y1={90} x2={92} y2={108} />
        <FemaleBody x1={105} y1={90} x2={115} y2={108} />
        {/* Arms back arching */}
        <FemaleBody x1={100} y1={72} x2={80} y2={65} />
        <FemaleBody x1={100} y1={72} x2={120} y2={65} />
      </>
    ),
    // Chair
    () => (
      <>
        {/* Chair */}
        <rect x="70" y="95" width="60" height="5" fill="#333" rx="2" />
        <line x1="75" y1="100" x2="75" y2="130" stroke="#333" strokeWidth="2" />
        <line x1="125" y1="100" x2="125" y2="130" stroke="#333" strokeWidth="2" />
        <MaleHead cx={100} cy={80} />
        <MaleBody x1={100} y1={88} x2={100} y2={100} />
        <MaleBody x1={100} y1={100} x2={90} y2={125} />
        <MaleBody x1={100} y1={100} x2={110} y2={125} />
        <FemaleHead cx={100} cy={55} />
        <FemaleBody x1={100} y1={63} x2={100} y2={82} />
        <FemaleBody x1={100} y1={82} x2={90} y2={98} />
        <FemaleBody x1={100} y1={82} x2={110} y2={98} />
      </>
    ),
    // Crib
    () => (
      <>
        <MaleHead cx={100} cy={118} />
        <MaleBody x1={100} y1={110} x2={100} y2={92} />
        <MaleBody x1={100} y1={92} x2={85} y2={125} />
        <MaleBody x1={100} y1={92} x2={115} y2={125} />
        <FemaleHead cx={100} cy={62} />
        <FemaleBody x1={100} y1={70} x2={100} y2={92} />
        <FemaleBody x1={100} y1={92} x2={90} y2={108} />
        <FemaleBody x1={100} y1={92} x2={110} y2={108} />
        <MaleBody x1={100} y1={96} x2={90} y2={80} />
        <MaleBody x1={100} y1={96} x2={110} y2={80} />
      </>
    ),
    // Lateral
    () => (
      <>
        <MaleHead cx={100} cy={118} />
        <MaleBody x1={100} y1={110} x2={100} y2={92} />
        <MaleBody x1={100} y1={92} x2={85} y2={125} />
        <MaleBody x1={100} y1={92} x2={115} y2={125} />
        <FemaleHead cx={115} cy={68} />
        <FemaleBody x1={115} y1={76} x2={108} y2={95} />
        <FemaleBody x1={108} y1={95} x2={95} y2={110} />
        <FemaleBody x1={108} y1={95} x2={118} y2={110} />
      </>
    ),
    // Pendulum
    () => (
      <>
        <MaleHead cx={100} cy={118} />
        <MaleBody x1={100} y1={110} x2={100} y2={92} />
        <MaleBody x1={100} y1={92} x2={85} y2={125} />
        <MaleBody x1={100} y1={92} x2={115} y2={125} />
        <FemaleHead cx={90} cy={65} />
        <FemaleBody x1={90} y1={73} x2={100} y2={92} />
        <FemaleBody x1={100} y1={92} x2={88} y2={108} />
        <FemaleBody x1={100} y1={92} x2={112} y2={108} />
        {/* Swing arrows */}
        <path d="M 80 60 Q 100 55 120 60" fill="none" stroke="#555" strokeWidth="1" strokeDasharray="3,2" />
      </>
    ),
  ];

  const idx = (id - 11) % variations.length;
  return variations[idx]();
}

function renderFromBehind(id: number) {
  const variations = [
    // Doggy style
    () => (
      <>
        {/* Woman on all fours */}
        <FemaleHead cx={75} cy={95} />
        <FemaleBody x1={83} y1={95} x2={100} y2={100} />
        <FemaleBody x1={100} y1={100} x2={110} y2={125} />
        <FemaleBody x1={100} y1={100} x2={90} y2={125} />
        <FemaleBody x1={83} y1={95} x2={78} y2={125} />
        {/* Man kneeling behind */}
        <MaleHead cx={130} cy={80} />
        <MaleBody x1={130} y1={88} x2={125} y2={105} />
        <MaleBody x1={125} y1={105} x2={120} y2={125} />
        <MaleBody x1={125} y1={105} x2={135} y2={125} />
        <MaleBody x1={130} y1={92} x2={110} y2={100} />
      </>
    ),
    // Prone bone
    () => (
      <>
        {/* Woman flat */}
        <FemaleHead cx={70} cy={122} />
        <FemaleBody x1={78} y1={122} x2={120} y2={122} />
        <FemaleBody x1={120} y1={122} x2={130} y2={128} />
        <FemaleBody x1={120} y1={122} x2={130} y2={116} />
        {/* Man on top */}
        <MaleHead cx={115} cy={108} />
        <MaleBody x1={115} y1={116} x2={115} y2={122} />
        <MaleBody x1={115} y1={110} x2={105} y2={118} />
      </>
    ),
    // Wheelbarrow
    () => (
      <>
        {/* Woman on hands, legs held up */}
        <FemaleHead cx={65} cy={100} />
        <FemaleBody x1={73} y1={100} x2={85} y2={105} />
        <FemaleBody x1={73} y1={100} x2={70} y2={128} />
        <FemaleBody x1={85} y1={105} x2={120} y2={80} />
        <FemaleBody x1={85} y1={105} x2={120} y2={85} />
        {/* Man standing holding legs */}
        <MaleHead cx={135} cy={55} />
        <MaleBody x1={135} y1={63} x2={135} y2={95} />
        <MaleBody x1={135} y1={95} x2={128} y2={128} />
        <MaleBody x1={135} y1={95} x2={142} y2={128} />
        <MaleBody x1={135} y1={70} x2={120} y2={82} />
      </>
    ),
    // Flat doggy
    () => (
      <>
        <FemaleHead cx={70} cy={120} />
        <FemaleBody x1={78} y1={118} x2={110} y2={115} />
        <FemaleBody x1={110} y1={115} x2={120} y2={128} />
        <FemaleBody x1={110} y1={115} x2={105} y2={128} />
        <FemaleBody x1={78} y1={118} x2={72} y2={128} />
        <MaleHead cx={135} cy={90} />
        <MaleBody x1={135} y1={98} x2={130} y2={115} />
        <MaleBody x1={130} y1={115} x2={125} y2={128} />
        <MaleBody x1={130} y1={115} x2={140} y2={128} />
        <MaleBody x1={135} y1={102} x2={115} y2={115} />
      </>
    ),
    // Scoop / spooning from behind
    () => (
      <>
        <FemaleHead cx={80} cy={115} />
        <FemaleBody x1={88} y1={115} x2={110} y2={118} />
        <FemaleBody x1={110} y1={118} x2={120} y2={125} />
        <FemaleBody x1={110} y1={118} x2={118} y2={112} />
        <MaleHead cx={95} cy={100} />
        <MaleBody x1={103} y1={100} x2={118} y2={108} />
        <MaleBody x1={118} y1={108} x2={125} y2={118} />
        <MaleBody x1={118} y1={108} x2={125} y2={100} />
        <MaleBody x1={103} y1={100} x2={95} y2={112} />
      </>
    ),
    // Piledriver
    () => (
      <>
        <FemaleHead cx={100} cy={125} />
        <FemaleBody x1={100} y1={117} x2={100} y2={100} />
        <FemaleBody x1={100} y1={100} x2={80} y2={80} />
        <FemaleBody x1={100} y1={100} x2={120} y2={80} />
        <MaleHead cx={100} cy={60} />
        <MaleBody x1={100} y1={68} x2={100} y2={85} />
        <MaleBody x1={100} y1={85} x2={90} y2={110} />
        <MaleBody x1={100} y1={85} x2={110} y2={110} />
        <MaleBody x1={100} y1={72} x2={85} y2={80} />
        <MaleBody x1={100} y1={72} x2={115} y2={80} />
      </>
    ),
    // Bridge
    () => (
      <>
        <FemaleHead cx={70} cy={120} />
        <FemaleBody x1={78} y1={118} x2={100} y2={100} />
        <FemaleBody x1={100} y1={100} x2={120} y2={125} />
        <FemaleBody x1={100} y1={100} x2={85} y2={125} />
        <FemaleBody x1={78} y1={118} x2={72} y2={128} />
        <MaleHead cx={130} cy={78} />
        <MaleBody x1={130} y1={86} x2={125} y2={105} />
        <MaleBody x1={125} y1={105} x2={118} y2={125} />
        <MaleBody x1={125} y1={105} x2={135} y2={125} />
        <MaleBody x1={130} y1={90} x2={115} y2={100} />
      </>
    ),
    // Arch
    () => (
      <>
        <FemaleHead cx={70} cy={115} />
        <FemaleBody x1={78} y1={112} x2={95} y2={105} />
        <FemaleBody x1={95} y1={105} x2={105} y2={125} />
        <FemaleBody x1={95} y1={105} x2={85} y2={125} />
        <FemaleBody x1={78} y1={112} x2={72} y2={128} />
        <MaleHead cx={130} cy={82} />
        <MaleBody x1={130} y1={90} x2={125} y2={108} />
        <MaleBody x1={125} y1={108} x2={118} y2={125} />
        <MaleBody x1={125} y1={108} x2={135} y2={125} />
        <MaleBody x1={130} y1={94} x2={108} y2={105} />
      </>
    ),
    // Slope
    () => (
      <>
        {/* Pillow */}
        <ellipse cx="90" cy="118" rx="20" ry="8" fill="#2a2a2a" stroke="#444" strokeWidth="1" />
        <FemaleHead cx={75} cy={112} />
        <FemaleBody x1={83} y1={112} x2={105} y2={115} />
        <FemaleBody x1={105} y1={115} x2={115} y2={125} />
        <FemaleBody x1={105} y1={115} x2={100} y2={128} />
        <FemaleBody x1={83} y1={112} x2={78} y2={128} />
        <MaleHead cx={135} cy={85} />
        <MaleBody x1={135} y1={93} x2={128} y2={112} />
        <MaleBody x1={128} y1={112} x2={122} y2={128} />
        <MaleBody x1={128} y1={112} x2={138} y2={128} />
        <MaleBody x1={135} y1={97} x2={112} y2={115} />
      </>
    ),
    // Helicopter
    () => (
      <>
        <FemaleHead cx={85} cy={100} />
        <FemaleBody x1={93} y1={100} x2={105} y2={105} />
        <FemaleBody x1={105} y1={105} x2={100} y2={125} />
        <FemaleBody x1={105} y1={105} x2={115} y2={120} />
        <FemaleBody x1={93} y1={100} x2={85} y2={125} />
        <MaleHead cx={130} cy={85} />
        <MaleBody x1={130} y1={93} x2={125} y2={108} />
        <MaleBody x1={125} y1={108} x2={118} y2={125} />
        <MaleBody x1={125} y1={108} x2={135} y2={125} />
        <MaleBody x1={130} y1={97} x2={110} y2={105} />
        {/* Rotation indicator */}
        <path d="M 120 95 Q 125 90 130 95" fill="none" stroke="#555" strokeWidth="1" strokeDasharray="2,2" />
      </>
    ),
  ];

  const idx = (id - 21) % variations.length;
  return variations[idx]();
}

function renderSideBySide(id: number) {
  const variations = [
    // Spooning
    () => (
      <>
        <FemaleHead cx={80} cy={115} />
        <FemaleBody x1={88} y1={115} x2={110} y2={118} />
        <FemaleBody x1={110} y1={118} x2={118} y2={125} />
        <FemaleBody x1={110} y1={118} x2={115} y2={112} />
        <MaleHead cx={90} cy={102} />
        <MaleBody x1={98} y1={102} x2={115} y2={108} />
        <MaleBody x1={115} y1={108} x2={122} y2={118} />
        <MaleBody x1={115} y1={108} x2={120} y2={102} />
        <MaleBody x1={98} y1={102} x2={92} y2={115} />
      </>
    ),
    // Face to face side
    () => (
      <>
        <FemaleHead cx={80} cy={110} />
        <FemaleBody x1={88} y1={110} x2={100} y2={115} />
        <FemaleBody x1={100} y1={115} x2={108} y2={125} />
        <FemaleBody x1={100} y1={115} x2={95} y2={125} />
        <MaleHead cx={120} cy={110} />
        <MaleBody x1={112} y1={110} x2={100} y2={115} />
        <MaleBody x1={100} y1={115} x2={108} y2={125} />
        <MaleBody x1={100} y1={115} x2={92} y2={125} />
        <FemaleBody x1={88} y1={110} x2={95} y2={105} />
        <MaleBody x1={112} y1={110} x2={105} y2={105} />
      </>
    ),
    // Scissors
    () => (
      <>
        <FemaleHead cx={75} cy={112} />
        <FemaleBody x1={83} y1={112} x2={100} y2={115} />
        <FemaleBody x1={100} y1={115} x2={120} y2={108} />
        <FemaleBody x1={100} y1={115} x2={115} y2={125} />
        <MaleHead cx={125} cy={108} />
        <MaleBody x1={117} y1={108} x2={100} y2={115} />
        <MaleBody x1={100} y1={115} x2={80} y2={125} />
        <MaleBody x1={100} y1={115} x2={85} y2={108} />
      </>
    ),
    // Zipper
    () => (
      <>
        <FemaleHead cx={78} cy={108} />
        <FemaleBody x1={86} y1={108} x2={100} y2={112} />
        <FemaleBody x1={100} y1={112} x2={110} y2={120} />
        <FemaleBody x1={100} y1={112} x2={105} y2={125} />
        <MaleHead cx={122} cy={108} />
        <MaleBody x1={114} y1={108} x2={100} y2={112} />
        <MaleBody x1={100} y1={112} x2={90} y2={120} />
        <MaleBody x1={100} y1={112} x2={95} y2={125} />
        <FemaleBody x1={86} y1={108} x2={100} y2={105} />
        <MaleBody x1={114} y1={108} x2={100} y2={105} />
      </>
    ),
    // Crab
    () => (
      <>
        <FemaleHead cx={80} cy={115} />
        <FemaleBody x1={88} y1={115} x2={105} y2={112} />
        <FemaleBody x1={105} y1={112} x2={115} y2={125} />
        <FemaleBody x1={105} y1={112} x2={100} y2={125} />
        <MaleHead cx={130} cy={95} />
        <MaleBody x1={125} y1={100} x2={115} y2={112} />
        <MaleBody x1={115} y1={112} x2={110} y2={125} />
        <MaleBody x1={115} y1={112} x2={125} y2={125} />
        <MaleBody x1={125} y1={103} x2={108} y2={112} />
      </>
    ),
    // Starfish
    () => (
      <>
        <FemaleHead cx={80} cy={112} />
        <FemaleBody x1={88} y1={112} x2={105} y2={115} />
        <FemaleBody x1={105} y1={115} x2={120} y2={108} />
        <FemaleBody x1={105} y1={115} x2={118} y2={125} />
        <FemaleBody x1={88} y1={112} x2={80} y2={125} />
        <MaleHead cx={120} cy={100} />
        <MaleBody x1={115} y1={105} x2={110} y2={115} />
        <MaleBody x1={110} y1={115} x2={105} y2={125} />
        <MaleBody x1={110} y1={115} x2={120} y2={125} />
        <MaleBody x1={115} y1={108} x2={108} y2={115} />
      </>
    ),
    // Triangle
    () => (
      <>
        <FemaleHead cx={100} cy={120} />
        <FemaleBody x1={100} y1={112} x2={100} y2={95} />
        <FemaleBody x1={100} y1={95} x2={85} y2={125} />
        <FemaleBody x1={100} y1={95} x2={115} y2={125} />
        <MaleHead cx={140} cy={95} />
        <MaleBody x1={135} y1={100} x2={115} y2={105} />
        <MaleBody x1={115} y1={105} x2={108} y2={125} />
        <MaleBody x1={115} y1={105} x2={125} y2={125} />
      </>
    ),
    // Pretzel
    () => (
      <>
        <FemaleHead cx={82} cy={105} />
        <FemaleBody x1={90} y1={105} x2={100} y2={112} />
        <FemaleBody x1={100} y1={112} x2={115} y2={105} />
        <FemaleBody x1={100} y1={112} x2={95} y2={125} />
        <MaleHead cx={118} cy={105} />
        <MaleBody x1={110} y1={105} x2={100} y2={112} />
        <MaleBody x1={100} y1={112} x2={85} y2={120} />
        <MaleBody x1={100} y1={112} x2={108} y2={125} />
        {/* Tangled legs */}
        <path d="M 95 125 Q 100 118 108 125" fill="none" stroke="#999" strokeWidth="1" strokeDasharray="2,2" />
      </>
    ),
    // Spoon fork
    () => (
      <>
        <FemaleHead cx={80} cy={112} />
        <FemaleBody x1={88} y1={112} x2={105} y2={115} />
        <FemaleBody x1={105} y1={115} x2={115} y2={105} />
        <FemaleBody x1={105} y1={115} x2={112} y2={125} />
        <MaleHead cx={92} cy={100} />
        <MaleBody x1={100} y1={100} x2={110} y2={110} />
        <MaleBody x1={110} y1={110} x2={115} y2={125} />
        <MaleBody x1={110} y1={110} x2={120} y2={120} />
        <MaleBody x1={100} y1={100} x2={95} y2={112} />
      </>
    ),
    // Lazy dog
    () => (
      <>
        <FemaleHead cx={75} cy={118} />
        <FemaleBody x1={83} y1={118} x2={105} y2={118} />
        <FemaleBody x1={105} y1={118} x2={115} y2={125} />
        <FemaleBody x1={105} y1={118} x2={112} y2={112} />
        <FemaleBody x1={83} y1={118} x2={78} y2={128} />
        <MaleHead cx={120} cy={105} />
        <MaleBody x1={115} y1={110} x2={110} y2={118} />
        <MaleBody x1={110} y1={118} x2={105} y2={128} />
        <MaleBody x1={110} y1={118} x2={120} y2={128} />
        <MaleBody x1={115} y1={112} x2={108} y2={118} />
      </>
    ),
  ];

  const idx = (id - 31) % variations.length;
  return variations[idx]();
}

function renderStanding(id: number) {
  const variations = [
    // Standing face to face
    () => (
      <>
        <FemaleHead cx={85} cy={50} />
        <FemaleBody x1={85} y1={58} x2={85} y2={90} />
        <FemaleBody x1={85} y1={90} x2={78} y2={128} />
        <FemaleBody x1={85} y1={90} x2={92} y2={128} />
        <FemaleBody x1={85} y1={65} x2={100} y2={70} />
        <MaleHead cx={115} cy={45} />
        <MaleBody x1={115} y1={53} x2={115} y2={88} />
        <MaleBody x1={115} y1={88} x2={108} y2={128} />
        <MaleBody x1={115} y1={88} x2={122} y2={128} />
        <MaleBody x1={115} y1={60} x2={100} y2={70} />
      </>
    ),
    // Standing rear
    () => (
      <>
        <FemaleHead cx={90} cy={55} />
        <FemaleBody x1={90} y1={63} x2={90} y2={95} />
        <FemaleBody x1={90} y1={95} x2={83} y2={128} />
        <FemaleBody x1={90} y1={95} x2={97} y2={128} />
        <FemaleBody x1={90} y1={68} x2={80} y2={80} />
        <MaleHead cx={120} cy={50} />
        <MaleBody x1={120} y1={58} x2={115} y2={90} />
        <MaleBody x1={115} y1={90} x2={108} y2={128} />
        <MaleBody x1={115} y1={90} x2={125} y2={128} />
        <MaleBody x1={120} y1={65} x2={100} y2={80} />
      </>
    ),
    // The Wall
    () => (
      <>
        {/* Wall */}
        <line x1="60" y1="30" x2="60" y2="130" stroke="#444" strokeWidth="3" />
        <FemaleHead cx={75} cy={50} />
        <FemaleBody x1={75} y1={58} x2={80} y2={90} />
        <FemaleBody x1={80} y1={90} x2={75} y2={120} />
        <FemaleBody x1={80} y1={90} x2={95} y2={110} />
        <FemaleBody x1={75} y1={65} x2={65} y2={55} />
        <MaleHead cx={105} cy={48} />
        <MaleBody x1={105} y1={56} x2={100} y2={88} />
        <MaleBody x1={100} y1={88} x2={95} y2={128} />
        <MaleBody x1={100} y1={88} x2={110} y2={128} />
        <MaleBody x1={105} y1={62} x2={88} y2={75} />
      </>
    ),
    // One-legged stand
    () => (
      <>
        {/* Surface for leg */}
        <rect x="55" y="85" width="25" height="5" fill="#333" rx="2" />
        <FemaleHead cx={80} cy={50} />
        <FemaleBody x1={80} y1={58} x2={80} y2={90} />
        <FemaleBody x1={80} y1={90} x2={75} y2={128} />
        <FemaleBody x1={80} y1={90} x2={65} y2={87} />
        <FemaleBody x1={80} y1={65} x2={70} y2={75} />
        <MaleHead cx={115} cy={48} />
        <MaleBody x1={115} y1={56} x2={110} y2={88} />
        <MaleBody x1={110} y1={88} x2={105} y2={128} />
        <MaleBody x1={110} y1={88} x2={120} y2={128} />
        <MaleBody x1={115} y1={62} x2={90} y2={75} />
      </>
    ),
    // The Lift
    () => (
      <>
        <MaleHead cx={100} cy={40} />
        <MaleBody x1={100} y1={48} x2={100} y2={85} />
        <MaleBody x1={100} y1={85} x2={90} y2={128} />
        <MaleBody x1={100} y1={85} x2={110} y2={128} />
        <FemaleHead cx={100} cy={60} />
        <FemaleBody x1={100} y1={68} x2={100} y2={88} />
        <FemaleBody x1={100} y1={88} x2={88} y2={95} />
        <FemaleBody x1={100} y1={88} x2={112} y2={95} />
        <MaleBody x1={100} y1={55} x2={88} y2={80} />
        <MaleBody x1={100} y1={55} x2={112} y2={80} />
      </>
    ),
    // Balcony
    () => (
      <>
        {/* Railing */}
        <line x1="40" y1="80" x2="160" y2="80" stroke="#444" strokeWidth="2" />
        <line x1="40" y1="80" x2="40" y2="130" stroke="#444" strokeWidth="2" />
        <line x1="160" y1="80" x2="160" y2="130" stroke="#444" strokeWidth="2" />
        <FemaleHead cx={85} cy={55} />
        <FemaleBody x1={85} y1={63} x2={85} y2={80} />
        <FemaleBody x1={85} y1={80} x2={78} y2={100} />
        <FemaleBody x1={85} y1={80} x2={95} y2={95} />
        <MaleHead cx={115} cy={50} />
        <MaleBody x1={115} y1={58} x2={110} y2={80} />
        <MaleBody x1={110} y1={80} x2={105} y2={100} />
        <MaleBody x1={110} y1={80} x2={120} y2={100} />
        <MaleBody x1={115} y1={62} x2={95} y2={70} />
      </>
    ),
    // Surfboard
    () => (
      <>
        <MaleHead cx={100} cy={40} />
        <MaleBody x1={100} y1={48} x2={100} y2={85} />
        <MaleBody x1={100} y1={85} x2={90} y2={128} />
        <MaleBody x1={100} y1={85} x2={110} y2={128} />
        <FemaleHead cx={100} cy={58} />
        <FemaleBody x1={100} y1={66} x2={100} y2={85} />
        <FemaleBody x1={100} y1={85} x2={88} y2={90} />
        <FemaleBody x1={100} y1={85} x2={112} y2={90} />
        <MaleBody x1={100} y1={55} x2={88} y2={78} />
        <MaleBody x1={100} y1={55} x2={112} y2={78} />
      </>
    ),
    // Tree
    () => (
      <>
        <MaleHead cx={100} cy={40} />
        <MaleBody x1={100} y1={48} x2={100} y2={88} />
        <MaleBody x1={100} y1={88} x2={95} y2={128} />
        <MaleBody x1={100} y1={88} x2={105} y2={128} />
        <FemaleHead cx={115} cy={50} />
        <FemaleBody x1={115} y1={58} x2={110} y2={85} />
        <FemaleBody x1={110} y1={85} x2={100} y2={80} />
        <FemaleBody x1={110} y1={85} x2={120} y2={100} />
        <MaleBody x1={100} y1={55} x2={110} y2={65} />
        <FemaleBody x1={115} y1={62} x2={105} y2={70} />
      </>
    ),
    // Flagpole
    () => (
      <>
        <MaleHead cx={100} cy={38} />
        <MaleBody x1={100} y1={46} x2={100} y2={85} />
        <MaleBody x1={100} y1={85} x2={92} y2={128} />
        <MaleBody x1={100} y1={85} x2={108} y2={128} />
        <FemaleHead cx={100} cy={55} />
        <FemaleBody x1={100} y1={63} x2={100} y2={82} />
        <FemaleBody x1={100} y1={82} x2={90} y2={88} />
        <FemaleBody x1={100} y1={82} x2={110} y2={88} />
        <MaleBody x1={100} y1={52} x2={90} y2={75} />
        <MaleBody x1={100} y1={52} x2={110} y2={75} />
      </>
    ),
    // Elevator
    () => (
      <>
        <MaleHead cx={100} cy={38} />
        <MaleBody x1={100} y1={46} x2={100} y2={82} />
        <MaleBody x1={100} y1={82} x2={92} y2={128} />
        <MaleBody x1={100} y1={82} x2={108} y2={128} />
        <FemaleHead cx={100} cy={55} />
        <FemaleBody x1={100} y1={63} x2={100} y2={80} />
        <FemaleBody x1={100} y1={80} x2={90} y2={85} />
        <FemaleBody x1={100} y1={80} x2={110} y2={85} />
        <MaleBody x1={100} y1={52} x2={90} y2={72} />
        <MaleBody x1={100} y1={52} x2={110} y2={72} />
        {/* Up/down arrows */}
        <path d="M 135 60 L 135 90" stroke="#555" strokeWidth="1" strokeDasharray="3,2" />
        <polygon points="135,55 132,62 138,62" fill="#555" />
        <polygon points="135,95 132,88 138,88" fill="#555" />
      </>
    ),
  ];

  const idx = (id - 41) % variations.length;
  return variations[idx]();
}

function renderSeated(id: number) {
  const variations = [
    // Chair sit
    () => (
      <>
        <rect x="70" y="95" width="60" height="5" fill="#333" rx="2" />
        <line x1="75" y1="100" x2="75" y2="130" stroke="#333" strokeWidth="2" />
        <line x1="125" y1="100" x2="125" y2="130" stroke="#333" strokeWidth="2" />
        <MaleHead cx={100} cy={78} />
        <MaleBody x1={100} y1={86} x2={100} y2={98} />
        <MaleBody x1={100} y1={98} x2={90} y2={125} />
        <MaleBody x1={100} y1={98} x2={110} y2={125} />
        <FemaleHead cx={100} cy={52} />
        <FemaleBody x1={100} y1={60} x2={100} y2={80} />
        <FemaleBody x1={100} y1={80} x2={90} y2={95} />
        <FemaleBody x1={100} y1={80} x2={110} y2={95} />
        <FemaleBody x1={100} y1={65} x2={88} y2={72} />
        <FemaleBody x1={100} y1={65} x2={112} y2={72} />
      </>
    ),
    // Lap
    () => (
      <>
        <MaleHead cx={90} cy={80} />
        <MaleBody x1={90} y1={88} x2={90} y2={105} />
        <MaleBody x1={90} y1={105} x2={80} y2={128} />
        <MaleBody x1={90} y1={105} x2={100} y2={128} />
        <FemaleHead cx={105} cy={58} />
        <FemaleBody x1={105} y1={66} x2={100} y2={88} />
        <FemaleBody x1={100} y1={88} x2={90} y2={100} />
        <FemaleBody x1={100} y1={88} x2={110} y2={100} />
        <MaleBody x1={90} y1={92} x2={100} y2={80} />
      </>
    ),
    // Seat (rear)
    () => (
      <>
        <MaleHead cx={100} cy={80} />
        <MaleBody x1={100} y1={88} x2={100} y2={105} />
        <MaleBody x1={100} y1={105} x2={90} y2={128} />
        <MaleBody x1={100} y1={105} x2={110} y2={128} />
        <FemaleHead cx={100} cy={55} />
        <FemaleBody x1={100} y1={63} x2={100} y2={85} />
        <FemaleBody x1={100} y1={85} x2={92} y2={100} />
        <FemaleBody x1={100} y1={85} x2={108} y2={100} />
        <MaleBody x1={100} y1={90} x2={92} y2={75} />
        <MaleBody x1={100} y1={90} x2={108} y2={75} />
      </>
    ),
    // Throne
    () => (
      <>
        <rect x="65" y="90" width="70" height="5" fill="#333" rx="2" />
        <line x1="65" y1="60" x2="65" y2="95" stroke="#333" strokeWidth="3" />
        <line x1="70" y1="95" x2="70" y2="130" stroke="#333" strokeWidth="2" />
        <line x1="130" y1="95" x2="130" y2="130" stroke="#333" strokeWidth="2" />
        <MaleHead cx={100} cy={70} />
        <MaleBody x1={100} y1={78} x2={100} y2={93} />
        <MaleBody x1={100} y1={93} x2={90} y2={125} />
        <MaleBody x1={100} y1={93} x2={110} y2={125} />
        <FemaleHead cx={100} cy={45} />
        <FemaleBody x1={100} y1={53} x2={100} y2={72} />
        <FemaleBody x1={100} y1={72} x2={92} y2={88} />
        <FemaleBody x1={100} y1={72} x2={108} y2={88} />
      </>
    ),
    // Lotus seat
    () => (
      <>
        <MaleHead cx={90} cy={75} />
        <MaleBody x1={90} y1={83} x2={90} y2={105} />
        <MaleBody x1={90} y1={105} x2={78} y2={115} />
        <MaleBody x1={90} y1={105} x2={102} y2={115} />
        <FemaleHead cx={108} cy={72} />
        <FemaleBody x1={108} y1={80} x2={105} y2={100} />
        <FemaleBody x1={105} y1={100} x2={92} y2={108} />
        <FemaleBody x1={105} y1={100} x2={115} y2={112} />
        <MaleBody x1={90} y1={88} x2={105} y2={85} />
        <FemaleBody x1={108} y1={85} x2={93} y2={88} />
      </>
    ),
    // Office
    () => (
      <>
        {/* Desk */}
        <rect x="60" y="95" width="80" height="5" fill="#333" rx="2" />
        <FemaleHead cx={100} cy={82} />
        <FemaleBody x1={100} y1={90} x2={100} y2={98} />
        <FemaleBody x1={100} y1={98} x2={85} y2={115} />
        <FemaleBody x1={100} y1={98} x2={115} y2={115} />
        <MaleHead cx={100} cy={50} />
        <MaleBody x1={100} y1={58} x2={100} y2={80} />
        <MaleBody x1={100} y1={80} x2={92} y2={95} />
        <MaleBody x1={100} y1={80} x2={108} y2={95} />
        <FemaleBody x1={100} y1={85} x2={90} y2={92} />
        <FemaleBody x1={100} y1={85} x2={110} y2={92} />
      </>
    ),
    // Couch
    () => (
      <>
        {/* Couch */}
        <rect x="50" y="95" width="100" height="8" fill="#2a2a2a" stroke="#444" strokeWidth="1" rx="4" />
        <rect x="48" y="75" width="8" height="28" fill="#2a2a2a" stroke="#444" strokeWidth="1" rx="3" />
        <rect x="144" y="75" width="8" height="28" fill="#2a2a2a" stroke="#444" strokeWidth="1" rx="3" />
        <MaleHead cx={100} cy={72} />
        <MaleBody x1={100} y1={80} x2={100} y2={97} />
        <MaleBody x1={100} y1={97} x2={90} y2={115} />
        <MaleBody x1={100} y1={97} x2={110} y2={115} />
        <FemaleHead cx={100} cy={48} />
        <FemaleBody x1={100} y1={56} x2={100} y2={75} />
        <FemaleBody x1={100} y1={75} x2={90} y2={92} />
        <FemaleBody x1={100} y1={75} x2={110} y2={92} />
      </>
    ),
    // Bench
    () => (
      <>
        <rect x="60" y="100" width="80" height="5" fill="#333" rx="2" />
        <line x1="65" y1="105" x2="65" y2="130" stroke="#333" strokeWidth="2" />
        <line x1="135" y1="105" x2="135" y2="130" stroke="#333" strokeWidth="2" />
        <MaleHead cx={100} cy={78} />
        <MaleBody x1={100} y1={86} x2={100} y2={103} />
        <MaleBody x1={100} y1={103} x2={90} y2={125} />
        <MaleBody x1={100} y1={103} x2={110} y2={125} />
        <FemaleHead cx={100} cy={52} />
        <FemaleBody x1={100} y1={60} x2={100} y2={80} />
        <FemaleBody x1={100} y1={80} x2={90} y2={98} />
        <FemaleBody x1={100} y1={80} x2={110} y2={98} />
        <MaleBody x1={100} y1={88} x2={90} y2={72} />
        <MaleBody x1={100} y1={88} x2={110} y2={72} />
      </>
    ),
    // Rocking chair
    () => (
      <>
        {/* Rocking chair */}
        <path d="M 60 130 Q 100 120 140 130" fill="none" stroke="#444" strokeWidth="2" />
        <rect x="70" y="95" width="60" height="5" fill="#333" rx="2" />
        <line x1="70" y1="65" x2="70" y2="100" stroke="#333" strokeWidth="2" />
        <MaleHead cx={100} cy={72} />
        <MaleBody x1={100} y1={80} x2={100} y2={98} />
        <MaleBody x1={100} y1={98} x2={90} y2={120} />
        <MaleBody x1={100} y1={98} x2={110} y2={120} />
        <FemaleHead cx={100} cy={48} />
        <FemaleBody x1={100} y1={56} x2={100} y2={75} />
        <FemaleBody x1={100} y1={75} x2={90} y2={92} />
        <FemaleBody x1={100} y1={75} x2={110} y2={92} />
      </>
    ),
    // Table
    () => (
      <>
        {/* Table */}
        <rect x="55" y="95" width="90" height="5" fill="#333" rx="2" />
        <line x1="60" y1="100" x2="60" y2="130" stroke="#333" strokeWidth="2" />
        <line x1="140" y1="100" x2="140" y2="130" stroke="#333" strokeWidth="2" />
        <FemaleHead cx={85} cy={85} />
        <FemaleBody x1={85} y1={93} x2={100} y2={95} />
        <FemaleBody x1={100} y1={95} x2={90} y2={110} />
        <FemaleBody x1={100} y1={95} x2={110} y2={110} />
        <MaleHead cx={120} cy={55} />
        <MaleBody x1={120} y1={63} x2={115} y2={85} />
        <MaleBody x1={115} y1={85} x2={108} y2={110} />
        <MaleBody x1={115} y1={85} x2={125} y2={110} />
        <MaleBody x1={120} y1={68} x2={105} y2={85} />
      </>
    ),
  ];

  const idx = (id - 51) % variations.length;
  return variations[idx]();
}

function renderAdvanced(id: number) {
  const variations = [
    // Stand and carry
    () => (
      <>
        <MaleHead cx={100} cy={35} />
        <MaleBody x1={100} y1={43} x2={100} y2={80} />
        <MaleBody x1={100} y1={80} x2={90} y2={128} />
        <MaleBody x1={100} y1={80} x2={110} y2={128} />
        <FemaleHead cx={100} cy={55} />
        <FemaleBody x1={100} y1={63} x2={100} y2={80} />
        <FemaleBody x1={100} y1={80} x2={85} y2={75} />
        <FemaleBody x1={100} y1={80} x2={115} y2={75} />
        <MaleBody x1={100} y1={50} x2={85} y2={72} />
        <MaleBody x1={100} y1={50} x2={115} y2={72} />
      </>
    ),
    // Flying frog
    () => (
      <>
        <FemaleHead cx={90} cy={65} />
        <FemaleBody x1={90} y1={73} x2={90} y2={95} />
        <FemaleBody x1={90} y1={95} x2={75} y2={110} />
        <FemaleBody x1={90} y1={95} x2={105} y2={110} />
        <FemaleBody x1={90} y1={78} x2={78} y2={85} />
        <FemaleBody x1={90} y1={78} x2={102} y2={85} />
        <MaleHead cx={120} cy={75} />
        <MaleBody x1={120} y1={83} x2={115} y2={100} />
        <MaleBody x1={115} y1={100} x2={108} y2={128} />
        <MaleBody x1={115} y1={100} x2={125} y2={128} />
        <MaleBody x1={120} y1={87} x2={105} y2={95} />
      </>
    ),
    // Suspended
    () => (
      <>
        {/* Overhead bar */}
        <line x1="50" y1="25" x2="150" y2="25" stroke="#444" strokeWidth="3" />
        <MaleHead cx={100} cy={40} />
        <MaleBody x1={100} y1={48} x2={100} y2={80} />
        <MaleBody x1={100} y1={80} x2={92} y2={110} />
        <MaleBody x1={100} y1={80} x2={108} y2={110} />
        <MaleBody x1={100} y1={50} x2={80} y2={25} />
        <MaleBody x1={100} y1={50} x2={120} y2={25} />
        <FemaleHead cx={100} cy={60} />
        <FemaleBody x1={100} y1={68} x2={100} y2={82} />
        <FemaleBody x1={100} y1={82} x2={90} y2={90} />
        <FemaleBody x1={100} y1={82} x2={110} y2={90} />
      </>
    ),
    // Wheel
    () => (
      <>
        <FemaleHead cx={100} cy={120} />
        <FemaleBody x1={100} y1={112} x2={100} y2={95} />
        <FemaleBody x1={100} y1={95} x2={85} y2={125} />
        <FemaleBody x1={100} y1={95} x2={115} y2={125} />
        <MaleHead cx={100} cy={60} />
        <MaleBody x1={100} y1={68} x2={100} y2={90} />
        <MaleBody x1={100} y1={90} x2={90} y2={110} />
        <MaleBody x1={100} y1={90} x2={110} y2={110} />
        {/* Rotation */}
        <path d="M 130 70 A 20 20 0 1 1 130 100" fill="none" stroke="#555" strokeWidth="1" strokeDasharray="3,2" />
        <polygon points="130,100 127,95 133,95" fill="#555" />
      </>
    ),
    // Corkscrew
    () => (
      <>
        <FemaleHead cx={100} cy={120} />
        <FemaleBody x1={100} y1={112} x2={100} y2={95} />
        <FemaleBody x1={100} y1={95} x2={88} y2={125} />
        <FemaleBody x1={100} y1={95} x2={112} y2={125} />
        <MaleHead cx={105} cy={62} />
        <MaleBody x1={105} y1={70} x2={100} y2={92} />
        <MaleBody x1={100} y1={92} x2={92} y2={112} />
        <MaleBody x1={100} y1={92} x2={110} y2={112} />
        {/* Spiral */}
        <path d="M 125 65 Q 130 75 125 85 Q 120 95 125 105" fill="none" stroke="#555" strokeWidth="1" strokeDasharray="3,2" />
      </>
    ),
    // Gantry
    () => (
      <>
        {/* Frame */}
        <line x1="50" y1="30" x2="50" y2="130" stroke="#444" strokeWidth="2" />
        <line x1="150" y1="30" x2="150" y2="130" stroke="#444" strokeWidth="2" />
        <line x1="50" y1="30" x2="150" y2="30" stroke="#444" strokeWidth="2" />
        <MaleHead cx={100} cy={45} />
        <MaleBody x1={100} y1={53} x2={100} y2={80} />
        <MaleBody x1={100} y1={80} x2={92} y2={110} />
        <MaleBody x1={100} y1={80} x2={108} y2={110} />
        <MaleBody x1={100} y1={50} x2={55} y2={30} />
        <MaleBody x1={100} y1={50} x2={145} y2={30} />
        <FemaleHead cx={100} cy={65} />
        <FemaleBody x1={100} y1={73} x2={100} y2={85} />
        <FemaleBody x1={100} y1={85} x2={90} y2={95} />
        <FemaleBody x1={100} y1={85} x2={110} y2={95} />
      </>
    ),
    // Space monkey
    () => (
      <>
        <FemaleHead cx={100} cy={120} />
        <FemaleBody x1={100} y1={112} x2={100} y2={95} />
        <FemaleBody x1={100} y1={95} x2={85} y2={125} />
        <FemaleBody x1={100} y1={95} x2={115} y2={125} />
        <MaleHead cx={100} cy={65} />
        <MaleBody x1={100} y1={73} x2={100} y2={92} />
        <MaleBody x1={100} y1={92} x2={90} y2={108} />
        <MaleBody x1={100} y1={92} x2={110} y2={108} />
        {/* Float effect */}
        <path d="M 80 60 Q 100 55 120 60" fill="none" stroke="#555" strokeWidth="1" strokeDasharray="2,2" />
        <path d="M 82 56 Q 100 51 118 56" fill="none" stroke="#444" strokeWidth="0.5" strokeDasharray="2,2" />
      </>
    ),
    // Origami
    () => (
      <>
        <FemaleHead cx={85} cy={100} />
        <FemaleBody x1={85} y1={108} x2={95} y2={95} />
        <FemaleBody x1={95} y1={95} x2={80} y2={80} />
        <FemaleBody x1={95} y1={95} x2={105} y2={120} />
        <FemaleBody x1={85} y1={108} x2={75} y2={120} />
        <MaleHead cx={120} cy={70} />
        <MaleBody x1={120} y1={78} x2={110} y2={95} />
        <MaleBody x1={110} y1={95} x2={100} y2={115} />
        <MaleBody x1={110} y1={95} x2={125} y2={115} />
        <MaleBody x1={120} y1={82} x2={100} y2={90} />
      </>
    ),
    // Pretzel twist
    () => (
      <>
        <FemaleHead cx={80} cy={95} />
        <FemaleBody x1={88} y1={95} x2={100} y2={105} />
        <FemaleBody x1={100} y1={105} x2={120} y2={95} />
        <FemaleBody x1={100} y1={105} x2={90} y2={125} />
        <MaleHead cx={120} cy={80} />
        <MaleBody x1={115} y1={85} x2={100} y2={105} />
        <MaleBody x1={100} y1={105} x2={80} y2={115} />
        <MaleBody x1={100} y1={105} x2={115} y2={125} />
        {/* Twist indicator */}
        <path d="M 95 110 Q 100 105 105 110 Q 110 115 115 110" fill="none" stroke="#555" strokeWidth="1" strokeDasharray="2,2" />
      </>
    ),
    // Dragon
    () => (
      <>
        <MaleHead cx={100} cy={115} />
        <MaleBody x1={100} y1={107} x2={100} y2={90} />
        <MaleBody x1={100} y1={90} x2={85} y2={125} />
        <MaleBody x1={100} y1={90} x2={115} y2={125} />
        <FemaleHead cx={100} cy={50} />
        <FemaleBody x1={100} y1={58} x2={100} y2={78} />
        <FemaleBody x1={100} y1={78} x2={85} y2={88} />
        <FemaleBody x1={100} y1={78} x2={115} y2={88} />
        <FemaleBody x1={100} y1={62} x2={82} y2={55} />
        <FemaleBody x1={100} y1={62} x2={118} y2={55} />
        <MaleBody x1={100} y1={95} x2={88} y2={80} />
        <MaleBody x1={100} y1={95} x2={112} y2={80} />
        {/* Power indicator */}
        <path d="M 70 45 L 75 40 L 72 48 L 78 43" fill="none" stroke="#FF4D6D" strokeWidth="1" opacity="0.5" />
        <path d="M 125 45 L 130 40 L 127 48 L 133 43" fill="none" stroke="#4A9EFF" strokeWidth="1" opacity="0.5" />
      </>
    ),
  ];

  const idx = (id - 61) % variations.length;
  return variations[idx]();
}

export default PositionIllustration;
