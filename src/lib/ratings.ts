

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export interface RatingBreakdown {
  total: number;

  percentages: [number, number, number, number, number];
}

export function getRatingBreakdown(productId: string, rating: number): RatingBreakdown {
  const hash = hashString(productId);
  const total = 20 + (hash % 130); 
  const peak = Math.min(5, Math.max(1, Math.round(rating)));

  const weights = [5, 4, 3, 2, 1].map((star) => {
    const distance = Math.abs(star - peak);
    return Math.max(1, 12 - distance * distance * 4);
  });

  const weightSum = weights.reduce((a, b) => a + b, 0);
  const percentages = weights.map((w) => Math.round((w / weightSum) * 100)) as [
    number,
    number,
    number,
    number,
    number,
  ];

  return { total, percentages };
}
