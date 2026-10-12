import React from 'react';

interface Props {
  positionId: number;
  className?: string;
}

const ManColor = "#4A9EFF";
const WomanColor = "#FF4D6D";

// Generate illustration based on position category and ID
export const PositionIllustration: React.FC<Props> = ({ positionId, className }) => {
  const renderIllustration = () => {
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
      viewBox="0 0 240 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bed/surface line */}
      <line x1="15" y1="165" x2="225" y2="165" stroke="#333" strokeWidth="2" strokeDasharray="6,4" />

      {renderIllustration()}

      {/* Legend */}
      <circle cx="25" cy="190" r="6" fill={ManColor} />
      <text x="36" y="194" fill="#888" fontSize="11" fontFamily="sans-serif">Male</text>
      <circle cx="85" cy="190" r="6" fill={WomanColor} />
      <text x="96" y="194" fill="#888" fontSize="11" fontFamily="sans-serif">Female</text>
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

// Helper to draw a head
const head = (cx: number, cy: number, color: string, r = 10) => (
  <circle cx={cx} cy={cy} r={r} fill={color} />
);

// Helper to draw a limb
const limb = (x1: number, y1: number, x2: number, y2: number, color: string, w = 5) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={w} strokeLinecap="round" />
);

function renderFaceToFace(id: number) {
  const M = ManColor;
  const F = WomanColor;
  const variations = [
    // Missionary
    () => (
      <>
        {head(120, 148, F)}
        {limb(120, 138, 120, 105, F)}
        {limb(120, 105, 100, 160, F)}
        {limb(120, 105, 140, 160, F)}
        {head(120, 88, M)}
        {limb(120, 98, 120, 130, M)}
        {limb(120, 130, 108, 160, M)}
        {limb(120, 130, 132, 160, M)}
        {limb(120, 105, 100, 115, M)}
        {limb(120, 105, 140, 115, M)}
      </>
    ),
    // Lotus
    () => (
      <>
        {head(100, 82, M)}
        {limb(100, 92, 100, 130, M)}
        {limb(100, 130, 85, 160, M)}
        {limb(100, 130, 115, 160, M)}
        {head(135, 85, F)}
        {limb(135, 95, 128, 128, F)}
        {limb(128, 128, 105, 140, F)}
        {limb(128, 128, 140, 150, F)}
        {limb(100, 100, 128, 100, M)}
        {limb(135, 102, 108, 102, F)}
      </>
    ),
    // Spider
    () => (
      <>
        {head(120, 150, F)}
        {limb(120, 140, 120, 115, F)}
        {limb(120, 115, 95, 80, F)}
        {limb(120, 115, 145, 80, F)}
        {head(120, 68, M)}
        {limb(120, 78, 120, 115, M)}
        {limb(120, 115, 108, 145, M)}
        {limb(120, 115, 132, 145, M)}
      </>
    ),
    // Face to face sitting
    () => (
      <>
        {head(95, 88, M)}
        {limb(95, 98, 95, 135, M)}
        {limb(95, 135, 82, 162, M)}
        {limb(95, 135, 108, 162, M)}
        {head(130, 90, F)}
        {limb(130, 100, 125, 132, F)}
        {limb(125, 132, 105, 142, F)}
        {limb(125, 132, 138, 155, F)}
        {limb(95, 105, 125, 105, M)}
        {limb(130, 107, 100, 107, F)}
      </>
    ),
    // Shovel
    () => (
      <>
        {head(120, 152, F)}
        {limb(120, 142, 120, 118, F)}
        {limb(120, 118, 120, 75, F)}
        {limb(120, 118, 128, 75, F)}
        {head(138, 72, M)}
        {limb(138, 82, 130, 118, M)}
        {limb(130, 118, 118, 150, M)}
        {limb(130, 118, 145, 150, M)}
      </>
    ),
    // Spread eagle
    () => (
      <>
        {head(120, 148, F)}
        {limb(120, 138, 120, 115, F)}
        {limb(120, 115, 88, 158, F)}
        {limb(120, 115, 152, 158, F)}
        {head(120, 82, M)}
        {limb(120, 92, 120, 125, M)}
        {limb(120, 125, 108, 158, M)}
        {limb(120, 125, 132, 158, M)}
        {limb(120, 100, 100, 110, M)}
        {limb(120, 100, 140, 110, M)}
      </>
    ),
    // Clamp
    () => (
      <>
        {head(120, 148, F)}
        {limb(120, 138, 120, 112, F)}
        {limb(120, 112, 110, 140, F)}
        {limb(120, 112, 130, 140, F)}
        {head(120, 82, M)}
        {limb(120, 92, 120, 125, M)}
        {limb(120, 125, 110, 158, M)}
        {limb(120, 125, 130, 158, M)}
        {limb(110, 140, 120, 125, F)}
        {limb(130, 140, 120, 125, F)}
      </>
    ),
    // Anvil
    () => (
      <>
        {head(120, 152, F)}
        {limb(120, 142, 120, 120, F)}
        {limb(120, 120, 95, 90, F)}
        {limb(120, 120, 145, 90, F)}
        {head(120, 72, M)}
        {limb(120, 82, 120, 120, M)}
        {limb(120, 120, 108, 150, M)}
        {limb(120, 120, 132, 150, M)}
        {limb(120, 88, 98, 90, M)}
        {limb(120, 88, 142, 90, M)}
      </>
    ),
    // Squeeze
    () => (
      <>
        {head(120, 150, F)}
        {limb(120, 140, 120, 115, F)}
        {limb(120, 115, 112, 142, F)}
        {limb(120, 115, 128, 142, F)}
        {head(120, 85, M)}
        {limb(120, 95, 120, 125, M)}
        {limb(120, 125, 112, 155, M)}
        {limb(120, 125, 128, 155, M)}
      </>
    ),
    // Butterfly
    () => (
      <>
        <line x1="120" y1="120" x2="120" y2="170" stroke="#333" strokeWidth="3" />
        {head(100, 128, F)}
        {limb(100, 138, 100, 118, F)}
        {limb(100, 118, 85, 155, F)}
        {limb(100, 118, 115, 155, F)}
        {head(145, 72, M)}
        {limb(145, 82, 145, 120, M)}
        {limb(145, 120, 135, 158, M)}
        {limb(145, 120, 155, 158, M)}
        {limb(145, 90, 112, 118, M)}
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
    // Cowgirl
    () => (
      <>
        {head(120, 145, M)}
        {limb(120, 135, 120, 110, M)}
        {limb(120, 110, 102, 158, M)}
        {limb(120, 110, 138, 158, M)}
        {head(120, 68, F)}
        {limb(120, 78, 120, 112, F)}
        {limb(120, 112, 108, 135, F)}
        {limb(120, 112, 132, 135, F)}
        {limb(120, 85, 102, 95, F)}
        {limb(120, 85, 138, 95, F)}
      </>
    ),
    // Reverse cowgirl
    () => (
      <>
        {head(120, 145, M)}
        {limb(120, 135, 120, 110, M)}
        {limb(120, 110, 102, 158, M)}
        {limb(120, 110, 138, 158, M)}
        {head(120, 68, F)}
        {limb(120, 78, 120, 112, F)}
        {limb(120, 112, 108, 135, F)}
        {limb(120, 112, 132, 135, F)}
        {limb(120, 85, 140, 75, F)}
      </>
    ),
    // Amazon
    () => (
      <>
        {head(120, 148, M)}
        {limb(120, 138, 120, 112, M)}
        {limb(120, 112, 102, 158, M)}
        {limb(120, 112, 138, 158, M)}
        {head(120, 60, F)}
        {limb(120, 70, 120, 108, F)}
        {limb(120, 108, 105, 130, F)}
        {limb(120, 108, 135, 130, F)}
        {limb(120, 78, 98, 88, F)}
        {limb(120, 78, 142, 88, F)}
      </>
    ),
    // Squat
    () => (
      <>
        {head(120, 148, M)}
        {limb(120, 138, 120, 115, M)}
        {limb(120, 115, 102, 158, M)}
        {limb(120, 115, 138, 158, M)}
        {head(120, 55, F)}
        {limb(120, 65, 120, 100, F)}
        {limb(120, 100, 100, 120, F)}
        {limb(120, 100, 140, 120, F)}
        {limb(120, 72, 98, 100, F)}
        {limb(120, 72, 142, 100, F)}
      </>
    ),
    // Seesaw
    () => (
      <>
        {head(120, 148, M)}
        {limb(120, 138, 120, 112, M)}
        {limb(120, 112, 102, 158, M)}
        {limb(120, 112, 138, 158, M)}
        {head(112, 72, F)}
        {limb(112, 82, 120, 115, F)}
        {limb(120, 115, 105, 135, F)}
        {limb(120, 115, 135, 135, F)}
        {limb(120, 118, 105, 95, M)}
        {limb(120, 118, 135, 95, M)}
      </>
    ),
    // Waterfall
    () => (
      <>
        {head(120, 148, M)}
        {limb(120, 138, 120, 112, M)}
        {limb(120, 112, 102, 158, M)}
        {limb(120, 112, 138, 158, M)}
        {head(120, 60, F)}
        {limb(120, 70, 128, 105, F)}
        {limb(128, 105, 108, 130, F)}
        {limb(128, 105, 142, 130, F)}
        {limb(120, 75, 95, 65, F)}
        {limb(120, 75, 145, 65, F)}
      </>
    ),
    // Chair
    () => (
      <>
        <rect x="82" y="115" width="76" height="6" fill="#333" rx="3" />
        <line x1="88" y1="121" x2="88" y2="160" stroke="#333" strokeWidth="3" />
        <line x1="152" y1="121" x2="152" y2="160" stroke="#333" strokeWidth="3" />
        {head(120, 88, M)}
        {limb(120, 98, 120, 118, M)}
        {limb(120, 118, 108, 155, M)}
        {limb(120, 118, 132, 155, M)}
        {head(120, 55, F)}
        {limb(120, 65, 120, 92, F)}
        {limb(120, 92, 108, 112, F)}
        {limb(120, 92, 132, 112, F)}
      </>
    ),
    // Crib
    () => (
      <>
        {head(120, 148, M)}
        {limb(120, 138, 120, 112, M)}
        {limb(120, 112, 102, 158, M)}
        {limb(120, 112, 138, 158, M)}
        {head(120, 62, F)}
        {limb(120, 72, 120, 108, F)}
        {limb(120, 108, 108, 130, F)}
        {limb(120, 108, 132, 130, F)}
        {limb(120, 118, 105, 88, M)}
        {limb(120, 118, 135, 88, M)}
      </>
    ),
    // Lateral
    () => (
      <>
        {head(120, 148, M)}
        {limb(120, 138, 120, 112, M)}
        {limb(120, 112, 102, 158, M)}
        {limb(120, 112, 138, 158, M)}
        {head(145, 72, F)}
        {limb(145, 82, 135, 112, F)}
        {limb(135, 112, 115, 132, F)}
        {limb(135, 112, 148, 135, F)}
      </>
    ),
    // Pendulum
    () => (
      <>
        {head(120, 148, M)}
        {limb(120, 138, 120, 112, M)}
        {limb(120, 112, 102, 158, M)}
        {limb(120, 112, 138, 158, M)}
        {head(108, 65, F)}
        {limb(108, 75, 120, 112, F)}
        {limb(120, 112, 105, 132, F)}
        {limb(120, 112, 135, 132, F)}
        <path d="M 90 58 Q 120 50 150 58" fill="none" stroke="#555" strokeWidth="1.5" strokeDasharray="4,3" />
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
    // Doggy style
    () => (
      <>
        {head(82, 108, F)}
        {limb(92, 108, 115, 115, F)}
        {limb(115, 115, 128, 158, F)}
        {limb(115, 115, 105, 158, F)}
        {limb(92, 108, 85, 155, F)}
        {head(155, 88, M)}
        {limb(155, 98, 148, 125, M)}
        {limb(148, 125, 138, 158, M)}
        {limb(148, 125, 160, 158, M)}
        {limb(155, 105, 125, 115, M)}
      </>
    ),
    // Prone bone
    () => (
      <>
        {head(75, 150, F)}
        {limb(85, 150, 140, 150, F)}
        {limb(140, 150, 155, 158, F)}
        {limb(140, 150, 155, 142, F)}
        {head(135, 132, M)}
        {limb(135, 142, 135, 150, M)}
        {limb(135, 138, 120, 148, M)}
      </>
    ),
    // Wheelbarrow
    () => (
      <>
        {head(68, 115, F)}
        {limb(78, 115, 98, 120, F)}
        {limb(78, 115, 72, 158, F)}
        {limb(98, 120, 145, 88, F)}
        {limb(98, 120, 145, 95, F)}
        {head(162, 58, M)}
        {limb(162, 68, 162, 112, M)}
        {limb(162, 112, 152, 158, M)}
        {limb(162, 112, 172, 158, M)}
        {limb(162, 78, 145, 90, M)}
      </>
    ),
    // Flat doggy
    () => (
      <>
        {head(75, 148, F)}
        {limb(85, 145, 128, 140, F)}
        {limb(128, 140, 142, 158, F)}
        {limb(128, 140, 122, 158, F)}
        {limb(85, 145, 78, 158, F)}
        {head(162, 100, M)}
        {limb(162, 110, 155, 135, M)}
        {limb(155, 135, 148, 158, M)}
        {limb(155, 135, 165, 158, M)}
        {limb(162, 118, 135, 140, M)}
      </>
    ),
    // Scoop
    () => (
      <>
        {head(88, 140, F)}
        {limb(98, 140, 130, 145, F)}
        {limb(130, 145, 145, 155, F)}
        {limb(130, 145, 142, 138, F)}
        {head(108, 122, M)}
        {limb(118, 122, 138, 132, M)}
        {limb(138, 132, 150, 148, M)}
        {limb(138, 132, 150, 122, M)}
        {limb(118, 122, 108, 138, M)}
      </>
    ),
    // Piledriver
    () => (
      <>
        {head(120, 152, F)}
        {limb(120, 142, 120, 118, F)}
        {limb(120, 118, 92, 88, F)}
        {limb(120, 118, 148, 88, F)}
        {head(120, 62, M)}
        {limb(120, 72, 120, 105, M)}
        {limb(120, 105, 108, 138, M)}
        {limb(120, 105, 132, 138, M)}
        {limb(120, 80, 95, 88, M)}
        {limb(120, 80, 145, 88, M)}
      </>
    ),
    // Bridge
    () => (
      <>
        {head(75, 148, F)}
        {limb(85, 145, 118, 122, F)}
        {limb(118, 122, 142, 155, F)}
        {limb(118, 122, 100, 155, F)}
        {limb(85, 145, 78, 158, F)}
        {head(158, 88, M)}
        {limb(158, 98, 150, 128, M)}
        {limb(150, 128, 142, 158, M)}
        {limb(150, 128, 162, 158, M)}
        {limb(158, 105, 130, 122, M)}
      </>
    ),
    // Arch
    () => (
      <>
        {head(78, 140, F)}
        {limb(88, 138, 112, 125, F)}
        {limb(112, 125, 125, 155, F)}
        {limb(112, 125, 100, 155, F)}
        {limb(88, 138, 82, 158, F)}
        {head(158, 92, M)}
        {limb(158, 102, 150, 130, M)}
        {limb(150, 130, 142, 158, M)}
        {limb(150, 130, 162, 158, M)}
        {limb(158, 110, 125, 125, M)}
      </>
    ),
    // Slope
    () => (
      <>
        <ellipse cx="100" cy="145" rx="25" ry="10" fill="#2a2a2a" stroke="#444" strokeWidth="1" />
        {head(82, 135, F)}
        {limb(92, 135, 122, 140, F)}
        {limb(122, 140, 138, 155, F)}
        {limb(122, 140, 118, 158, F)}
        {limb(92, 135, 85, 158, F)}
        {head(162, 95, M)}
        {limb(162, 105, 155, 132, M)}
        {limb(155, 132, 148, 158, M)}
        {limb(155, 132, 165, 158, M)}
        {limb(162, 112, 130, 140, M)}
      </>
    ),
    // Helicopter
    () => (
      <>
        {head(95, 118, F)}
        {limb(105, 118, 125, 125, F)}
        {limb(125, 125, 118, 155, F)}
        {limb(125, 125, 140, 148, F)}
        {limb(105, 118, 95, 155, F)}
        {head(158, 92, M)}
        {limb(158, 102, 150, 128, M)}
        {limb(150, 128, 142, 158, M)}
        {limb(150, 128, 162, 158, M)}
        {limb(158, 110, 130, 125, M)}
        <path d="M 142 105 Q 150 98 158 105" fill="none" stroke="#555" strokeWidth="1.5" strokeDasharray="3,3" />
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
    // Spooning
    () => (
      <>
        {head(88, 138, F)}
        {limb(98, 138, 130, 142, F)}
        {limb(130, 142, 145, 155, F)}
        {limb(130, 142, 140, 135, F)}
        {head(102, 120, M)}
        {limb(112, 120, 138, 128, M)}
        {limb(138, 128, 150, 145, M)}
        {limb(138, 128, 148, 120, M)}
        {limb(112, 120, 102, 138, M)}
      </>
    ),
    // Face to face side
    () => (
      <>
        {head(85, 132, F)}
        {limb(95, 132, 118, 138, F)}
        {limb(118, 138, 130, 155, F)}
        {limb(118, 138, 112, 155, F)}
        {head(155, 132, M)}
        {limb(145, 132, 122, 138, M)}
        {limb(122, 138, 130, 155, M)}
        {limb(122, 138, 115, 155, M)}
        {limb(95, 132, 108, 125, F)}
        {limb(145, 132, 132, 125, M)}
      </>
    ),
    // Scissors
    () => (
      <>
        {head(80, 135, F)}
        {limb(90, 135, 118, 140, F)}
        {limb(118, 140, 145, 128, F)}
        {limb(118, 140, 140, 155, F)}
        {head(160, 128, M)}
        {limb(150, 128, 122, 140, M)}
        {limb(122, 140, 92, 155, M)}
        {limb(122, 140, 98, 128, M)}
      </>
    ),
    // Zipper
    () => (
      <>
        {head(85, 128, F)}
        {limb(95, 128, 118, 135, F)}
        {limb(118, 135, 132, 150, F)}
        {limb(118, 135, 125, 158, F)}
        {head(155, 128, M)}
        {limb(145, 128, 122, 135, M)}
        {limb(122, 135, 108, 150, M)}
        {limb(122, 135, 115, 158, M)}
        {limb(95, 128, 118, 122, F)}
        {limb(145, 128, 122, 122, M)}
      </>
    ),
    // Crab
    () => (
      <>
        {head(85, 138, F)}
        {limb(95, 138, 122, 135, F)}
        {limb(122, 135, 138, 155, F)}
        {limb(122, 135, 118, 155, F)}
        {head(158, 108, M)}
        {limb(152, 115, 140, 135, M)}
        {limb(140, 135, 130, 158, M)}
        {limb(140, 135, 152, 158, M)}
        {limb(152, 120, 128, 135, M)}
      </>
    ),
    // Starfish
    () => (
      <>
        {head(85, 135, F)}
        {limb(95, 135, 125, 140, F)}
        {limb(125, 140, 148, 128, F)}
        {limb(125, 140, 145, 155, F)}
        {limb(95, 135, 85, 158, F)}
        {head(145, 118, M)}
        {limb(138, 125, 128, 140, M)}
        {limb(128, 140, 122, 158, M)}
        {limb(128, 140, 140, 158, M)}
        {limb(138, 128, 128, 140, M)}
      </>
    ),
    // Triangle
    () => (
      <>
        {head(118, 148, F)}
        {limb(118, 138, 118, 112, F)}
        {limb(118, 112, 100, 155, F)}
        {limb(118, 112, 136, 155, F)}
        {head(172, 108, M)}
        {limb(165, 115, 138, 125, M)}
        {limb(138, 125, 128, 155, M)}
        {limb(138, 125, 150, 155, M)}
      </>
    ),
    // Pretzel
    () => (
      <>
        {head(90, 122, F)}
        {limb(100, 122, 118, 132, F)}
        {limb(118, 132, 140, 122, F)}
        {limb(118, 132, 110, 155, F)}
        {head(148, 122, M)}
        {limb(138, 122, 118, 132, M)}
        {limb(118, 132, 98, 148, M)}
        {limb(118, 132, 128, 155, M)}
        <path d="M 110 155 Q 120 145 128 155" fill="none" stroke="#999" strokeWidth="1.5" strokeDasharray="3,3" />
      </>
    ),
    // Spoon fork
    () => (
      <>
        {head(85, 135, F)}
        {limb(95, 135, 122, 138, F)}
        {limb(122, 138, 138, 122, F)}
        {limb(122, 138, 135, 155, F)}
        {head(105, 115, M)}
        {limb(115, 115, 130, 130, M)}
        {limb(130, 130, 138, 155, M)}
        {limb(130, 130, 145, 145, M)}
        {limb(115, 115, 108, 135, M)}
      </>
    ),
    // Lazy dog
    () => (
      <>
        {head(80, 142, F)}
        {limb(90, 142, 125, 142, F)}
        {limb(125, 142, 140, 155, F)}
        {limb(125, 142, 138, 135, F)}
        {limb(90, 142, 82, 158, F)}
        {head(145, 122, M)}
        {limb(138, 128, 130, 142, M)}
        {limb(130, 142, 122, 158, M)}
        {limb(130, 142, 142, 158, M)}
        {limb(138, 132, 128, 142, M)}
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
    // Standing face to face
    () => (
      <>
        {head(95, 52, F)}
        {limb(95, 62, 95, 105, F)}
        {limb(95, 105, 85, 158, F)}
        {limb(95, 105, 105, 158, F)}
        {limb(95, 72, 115, 82, F)}
        {head(145, 48, M)}
        {limb(145, 58, 145, 105, M)}
        {limb(145, 105, 135, 158, M)}
        {limb(145, 105, 155, 158, M)}
        {limb(145, 68, 115, 82, M)}
      </>
    ),
    // Standing rear
    () => (
      <>
        {head(100, 58, F)}
        {limb(100, 68, 100, 112, F)}
        {limb(100, 112, 90, 158, F)}
        {limb(100, 112, 110, 158, F)}
        {limb(100, 78, 88, 92, F)}
        {head(148, 52, M)}
        {limb(148, 62, 142, 108, M)}
        {limb(142, 108, 132, 158, M)}
        {limb(142, 108, 155, 158, M)}
        {limb(148, 72, 112, 92, M)}
      </>
    ),
    // The Wall
    () => (
      <>
        <line x1="65" y1="30" x2="65" y2="162" stroke="#444" strokeWidth="4" />
        {head(88, 52, F)}
        {limb(88, 62, 92, 108, F)}
        {limb(92, 108, 85, 148, F)}
        {limb(92, 108, 110, 132, F)}
        {limb(88, 72, 72, 58, F)}
        {head(130, 48, M)}
        {limb(130, 58, 125, 105, M)}
        {limb(125, 105, 118, 158, M)}
        {limb(125, 105, 138, 158, M)}
        {limb(130, 68, 100, 88, M)}
      </>
    ),
    // One-legged stand
    () => (
      <>
        <rect x="58" y="100" width="30" height="6" fill="#333" rx="3" />
        {head(92, 52, F)}
        {limb(92, 62, 92, 108, F)}
        {limb(92, 108, 85, 158, F)}
        {limb(92, 108, 68, 103, F)}
        {limb(92, 72, 78, 85, F)}
        {head(142, 48, M)}
        {limb(142, 58, 138, 108, M)}
        {limb(138, 108, 128, 158, M)}
        {limb(138, 108, 150, 158, M)}
        {limb(142, 68, 102, 88, M)}
      </>
    ),
    // The Lift
    () => (
      <>
        {head(120, 38, M)}
        {limb(120, 48, 120, 98, M)}
        {limb(120, 98, 108, 155, M)}
        {limb(120, 98, 132, 155, M)}
        {head(120, 62, F)}
        {limb(120, 72, 120, 98, F)}
        {limb(120, 98, 102, 108, F)}
        {limb(120, 98, 138, 108, F)}
        {limb(120, 52, 102, 88, M)}
        {limb(120, 52, 138, 88, M)}
      </>
    ),
    // Balcony
    () => (
      <>
        <line x1="42" y1="98" x2="198" y2="98" stroke="#444" strokeWidth="3" />
        <line x1="42" y1="98" x2="42" y2="162" stroke="#444" strokeWidth="3" />
        <line x1="198" y1="98" x2="198" y2="162" stroke="#444" strokeWidth="3" />
        {head(98, 58, F)}
        {limb(98, 68, 98, 100, F)}
        {limb(98, 100, 88, 135, F)}
        {limb(98, 100, 112, 118, F)}
        {head(142, 52, M)}
        {limb(142, 62, 138, 100, M)}
        {limb(138, 100, 128, 135, M)}
        {limb(138, 100, 152, 135, M)}
        {limb(142, 72, 108, 82, M)}
      </>
    ),
    // Surfboard
    () => (
      <>
        {head(120, 38, M)}
        {limb(120, 48, 120, 98, M)}
        {limb(120, 98, 108, 155, M)}
        {limb(120, 98, 132, 155, M)}
        {head(120, 60, F)}
        {limb(120, 70, 120, 98, F)}
        {limb(120, 98, 102, 105, F)}
        {limb(120, 98, 138, 105, F)}
        {limb(120, 52, 102, 85, M)}
        {limb(120, 52, 138, 85, M)}
      </>
    ),
    // Tree
    () => (
      <>
        {head(118, 38, M)}
        {limb(118, 48, 118, 102, M)}
        {limb(118, 102, 110, 158, M)}
        {limb(118, 102, 128, 158, M)}
        {head(142, 52, F)}
        {limb(142, 62, 135, 100, F)}
        {limb(135, 100, 118, 95, F)}
        {limb(135, 100, 148, 120, F)}
        {limb(118, 55, 135, 72, M)}
        {limb(142, 68, 125, 78, F)}
      </>
    ),
    // Flagpole
    () => (
      <>
        {head(120, 35, M)}
        {limb(120, 45, 120, 98, M)}
        {limb(120, 98, 108, 158, M)}
        {limb(120, 98, 132, 158, M)}
        {head(120, 58, F)}
        {limb(120, 68, 120, 95, F)}
        {limb(120, 95, 105, 102, F)}
        {limb(120, 95, 135, 102, F)}
        {limb(120, 50, 105, 82, M)}
        {limb(120, 50, 135, 82, M)}
      </>
    ),
    // Elevator
    () => (
      <>
        {head(120, 35, M)}
        {limb(120, 45, 120, 95, M)}
        {limb(120, 95, 108, 155, M)}
        {limb(120, 95, 132, 155, M)}
        {head(120, 58, F)}
        {limb(120, 68, 120, 92, F)}
        {limb(120, 92, 105, 98, F)}
        {limb(120, 92, 135, 98, F)}
        {limb(120, 50, 105, 80, M)}
        {limb(120, 50, 135, 80, M)}
        <path d="M 168 62 L 168 108" stroke="#555" strokeWidth="1.5" strokeDasharray="4,3" />
        <polygon points="168,55 164,65 172,65" fill="#555" />
        <polygon points="168,115 164,105 172,105" fill="#555" />
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
    // Chair sit
    () => (
      <>
        <rect x="80" y="115" width="80" height="6" fill="#333" rx="3" />
        <line x1="85" y1="121" x2="85" y2="162" stroke="#333" strokeWidth="3" />
        <line x1="155" y1="121" x2="155" y2="162" stroke="#333" strokeWidth="3" />
        {head(120, 88, M)}
        {limb(120, 98, 120, 118, M)}
        {limb(120, 118, 105, 155, M)}
        {limb(120, 118, 135, 155, M)}
        {head(120, 52, F)}
        {limb(120, 62, 120, 90, F)}
        {limb(120, 90, 105, 110, F)}
        {limb(120, 90, 135, 110, F)}
        {limb(120, 70, 102, 80, F)}
        {limb(120, 70, 138, 80, F)}
      </>
    ),
    // Lap
    () => (
      <>
        {head(102, 88, M)}
        {limb(102, 98, 102, 125, M)}
        {limb(102, 125, 90, 158, M)}
        {limb(102, 125, 115, 158, M)}
        {head(128, 58, F)}
        {limb(128, 68, 122, 100, F)}
        {limb(122, 100, 108, 118, F)}
        {limb(122, 100, 135, 118, F)}
        {limb(102, 105, 118, 88, M)}
      </>
    ),
    // Seat rear
    () => (
      <>
        {head(120, 88, M)}
        {limb(120, 98, 120, 125, M)}
        {limb(120, 125, 105, 158, M)}
        {limb(120, 125, 135, 158, M)}
        {head(120, 52, F)}
        {limb(120, 62, 120, 95, F)}
        {limb(120, 95, 108, 118, F)}
        {limb(120, 95, 132, 118, F)}
        {limb(120, 102, 108, 82, M)}
        {limb(120, 102, 132, 82, M)}
      </>
    ),
    // Throne
    () => (
      <>
        <rect x="75" y="108" width="90" height="6" fill="#333" rx="3" />
        <line x1="75" y1="68" x2="75" y2="114" stroke="#333" strokeWidth="4" />
        <line x1="82" y1="114" x2="82" y2="162" stroke="#333" strokeWidth="3" />
        <line x1="158" y1="114" x2="158" y2="162" stroke="#333" strokeWidth="3" />
        {head(120, 78, M)}
        {limb(120, 88, 120, 112, M)}
        {limb(120, 112, 105, 150, M)}
        {limb(120, 112, 135, 150, M)}
        {head(120, 42, F)}
        {limb(120, 52, 120, 78, F)}
        {limb(120, 78, 108, 100, F)}
        {limb(120, 78, 132, 100, F)}
      </>
    ),
    // Lotus seat
    () => (
      <>
        {head(102, 82, M)}
        {limb(102, 92, 102, 125, M)}
        {limb(102, 125, 88, 140, M)}
        {limb(102, 125, 118, 140, M)}
        {head(132, 78, F)}
        {limb(132, 88, 128, 118, F)}
        {limb(128, 118, 108, 128, F)}
        {limb(128, 118, 142, 138, F)}
        {limb(102, 100, 128, 95, M)}
        {limb(132, 92, 108, 100, F)}
      </>
    ),
    // Office
    () => (
      <>
        <rect x="65" y="115" width="110" height="6" fill="#333" rx="3" />
        {head(120, 95, F)}
        {limb(120, 105, 120, 118, F)}
        {limb(120, 118, 100, 142, F)}
        {limb(120, 118, 140, 142, F)}
        {head(120, 48, M)}
        {limb(120, 58, 120, 92, M)}
        {limb(120, 92, 108, 112, M)}
        {limb(120, 92, 132, 112, M)}
        {limb(120, 98, 105, 108, F)}
        {limb(120, 98, 135, 108, F)}
      </>
    ),
    // Couch
    () => (
      <>
        <rect x="55" y="115" width="130" height="10" fill="#2a2a2a" stroke="#444" strokeWidth="1.5" rx="5" />
        <rect x="52" y="88" width="10" height="35" fill="#2a2a2a" stroke="#444" strokeWidth="1.5" rx="4" />
        <rect x="178" y="88" width="10" height="35" fill="#2a2a2a" stroke="#444" strokeWidth="1.5" rx="4" />
        {head(120, 82, M)}
        {limb(120, 92, 120, 118, M)}
        {limb(120, 118, 105, 148, M)}
        {limb(120, 118, 135, 148, M)}
        {head(120, 48, F)}
        {limb(120, 58, 120, 85, F)}
        {limb(120, 85, 105, 108, F)}
        {limb(120, 85, 135, 108, F)}
      </>
    ),
    // Bench
    () => (
      <>
        <rect x="70" y="118" width="100" height="6" fill="#333" rx="3" />
        <line x1="75" y1="124" x2="75" y2="162" stroke="#333" strokeWidth="3" />
        <line x1="165" y1="124" x2="165" y2="162" stroke="#333" strokeWidth="3" />
        {head(120, 88, M)}
        {limb(120, 98, 120, 122, M)}
        {limb(120, 122, 105, 155, M)}
        {limb(120, 122, 135, 155, M)}
        {head(120, 52, F)}
        {limb(120, 62, 120, 90, F)}
        {limb(120, 90, 105, 112, F)}
        {limb(120, 90, 135, 112, F)}
        {limb(120, 100, 105, 78, M)}
        {limb(120, 100, 135, 78, M)}
      </>
    ),
    // Rocking chair
    () => (
      <>
        <path d="M 65 162 Q 120 148 175 162" fill="none" stroke="#444" strokeWidth="3" />
        <rect x="80" y="115" width="80" height="6" fill="#333" rx="3" />
        <line x1="80" y1="72" x2="80" y2="121" stroke="#333" strokeWidth="3" />
        {head(120, 82, M)}
        {limb(120, 92, 120, 118, M)}
        {limb(120, 118, 105, 148, M)}
        {limb(120, 118, 135, 148, M)}
        {head(120, 48, F)}
        {limb(120, 58, 120, 85, F)}
        {limb(120, 85, 105, 108, F)}
        {limb(120, 85, 135, 108, F)}
      </>
    ),
    // Table
    () => (
      <>
        <rect x="62" y="115" width="116" height="6" fill="#333" rx="3" />
        <line x1="68" y1="121" x2="68" y2="162" stroke="#333" strokeWidth="3" />
        <line x1="172" y1="121" x2="172" y2="162" stroke="#333" strokeWidth="3" />
        {head(98, 98, F)}
        {limb(98, 108, 118, 115, F)}
        {limb(118, 115, 105, 140, F)}
        {limb(118, 115, 132, 140, F)}
        {head(148, 55, M)}
        {limb(148, 65, 142, 100, M)}
        {limb(142, 100, 132, 140, M)}
        {limb(142, 100, 155, 140, M)}
        {limb(148, 75, 125, 100, M)}
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
    // Stand and carry
    () => (
      <>
        {head(120, 35, M)}
        {limb(120, 45, 120, 95, M)}
        {limb(120, 95, 108, 155, M)}
        {limb(120, 95, 132, 155, M)}
        {head(120, 58, F)}
        {limb(120, 68, 120, 95, F)}
        {limb(120, 95, 100, 88, F)}
        {limb(120, 95, 140, 88, F)}
        {limb(120, 50, 100, 82, M)}
        {limb(120, 50, 140, 82, M)}
      </>
    ),
    // Flying frog
    () => (
      <>
        {head(100, 72, F)}
        {limb(100, 82, 100, 115, F)}
        {limb(100, 115, 82, 135, F)}
        {limb(100, 115, 118, 135, F)}
        {limb(100, 90, 82, 100, F)}
        {limb(100, 90, 118, 100, F)}
        {head(148, 85, M)}
        {limb(148, 95, 142, 122, M)}
        {limb(142, 122, 132, 158, M)}
        {limb(142, 122, 155, 158, M)}
        {limb(148, 102, 122, 115, M)}
      </>
    ),
    // Suspended
    () => (
      <>
        <line x1="55" y1="28" x2="185" y2="28" stroke="#444" strokeWidth="4" />
        {head(120, 45, M)}
        {limb(120, 55, 120, 95, M)}
        {limb(120, 95, 108, 132, M)}
        {limb(120, 95, 132, 132, M)}
        {limb(120, 60, 92, 28, M)}
        {limb(120, 60, 148, 28, M)}
        {head(120, 70, F)}
        {limb(120, 80, 120, 98, F)}
        {limb(120, 98, 105, 108, F)}
        {limb(120, 98, 135, 108, F)}
      </>
    ),
    // Wheel
    () => (
      <>
        {head(120, 148, F)}
        {limb(120, 138, 120, 115, F)}
        {limb(120, 115, 102, 155, F)}
        {limb(120, 115, 138, 155, F)}
        {head(120, 65, M)}
        {limb(120, 75, 120, 110, M)}
        {limb(120, 110, 108, 135, M)}
        {limb(120, 110, 132, 135, M)}
        <path d="M 158 78 A 25 25 0 1 1 158 118" fill="none" stroke="#555" strokeWidth="2" strokeDasharray="4,3" />
        <polygon points="158,118 154,110 162,110" fill="#555" />
      </>
    ),
    // Corkscrew
    () => (
      <>
        {head(120, 148, F)}
        {limb(120, 138, 120, 115, F)}
        {limb(120, 115, 105, 155, F)}
        {limb(120, 115, 135, 155, F)}
        {head(128, 65, M)}
        {limb(128, 75, 120, 110, M)}
        {limb(120, 110, 108, 135, M)}
        {limb(120, 110, 132, 135, M)}
        <path d="M 155 70 Q 162 85 155 100 Q 148 115 155 130" fill="none" stroke="#555" strokeWidth="2" strokeDasharray="4,3" />
      </>
    ),
    // Gantry
    () => (
      <>
        <line x1="55" y1="30" x2="55" y2="162" stroke="#444" strokeWidth="3" />
        <line x1="185" y1="30" x2="185" y2="162" stroke="#444" strokeWidth="3" />
        <line x1="55" y1="30" x2="185" y2="30" stroke="#444" strokeWidth="3" />
        {head(120, 48, M)}
        {limb(120, 58, 120, 98, M)}
        {limb(120, 98, 108, 135, M)}
        {limb(120, 98, 132, 135, M)}
        {limb(120, 62, 60, 30, M)}
        {limb(120, 62, 180, 30, M)}
        {head(120, 75, F)}
        {limb(120, 85, 120, 102, F)}
        {limb(120, 102, 105, 115, F)}
        {limb(120, 102, 135, 115, F)}
      </>
    ),
    // Space monkey
    () => (
      <>
        {head(120, 148, F)}
        {limb(120, 138, 120, 115, F)}
        {limb(120, 115, 102, 155, F)}
        {limb(120, 115, 138, 155, F)}
        {head(120, 68, M)}
        {limb(120, 78, 120, 110, M)}
        {limb(120, 110, 108, 132, M)}
        {limb(120, 110, 132, 132, M)}
        <path d="M 92 62 Q 120 55 148 62" fill="none" stroke="#555" strokeWidth="1.5" strokeDasharray="3,3" />
        <path d="M 95 56 Q 120 49 145 56" fill="none" stroke="#444" strokeWidth="1" strokeDasharray="3,3" />
      </>
    ),
    // Origami
    () => (
      <>
        {head(95, 115, F)}
        {limb(95, 125, 110, 108, F)}
        {limb(110, 108, 90, 88, F)}
        {limb(110, 108, 125, 145, F)}
        {limb(95, 125, 82, 148, F)}
        {head(148, 75, M)}
        {limb(148, 85, 135, 112, M)}
        {limb(135, 112, 118, 142, M)}
        {limb(135, 112, 152, 142, M)}
        {limb(148, 92, 118, 105, M)}
      </>
    ),
    // Pretzel twist
    () => (
      <>
        {head(88, 110, F)}
        {limb(98, 110, 118, 122, F)}
        {limb(118, 122, 145, 110, F)}
        {limb(118, 122, 105, 155, F)}
        {head(148, 88, M)}
        {limb(142, 95, 118, 122, M)}
        {limb(118, 122, 92, 140, M)}
        {limb(118, 122, 138, 155, M)}
        <path d="M 110 132 Q 118 125 126 132 Q 134 140 142 132" fill="none" stroke="#555" strokeWidth="2" strokeDasharray="3,3" />
      </>
    ),
    // Dragon
    () => (
      <>
        {head(120, 142, M)}
        {limb(120, 132, 120, 108, M)}
        {limb(120, 108, 100, 155, M)}
        {limb(120, 108, 140, 155, M)}
        {head(120, 48, F)}
        {limb(120, 58, 120, 88, F)}
        {limb(120, 88, 100, 100, F)}
        {limb(120, 88, 140, 100, F)}
        {limb(120, 65, 95, 55, F)}
        {limb(120, 65, 145, 55, F)}
        {limb(120, 115, 105, 92, M)}
        {limb(120, 115, 135, 92, M)}
        <path d="M 78 42 L 85 35 L 80 48 L 88 40" fill="none" stroke={F} strokeWidth="1.5" opacity="0.6" />
        <path d="M 155 42 L 162 35 L 157 48 L 165 40" fill="none" stroke={M} strokeWidth="1.5" opacity="0.6" />
      </>
    ),
  ];

  const idx = (id - 61) % variations.length;
  return variations[idx]();
}

export default PositionIllustration;
