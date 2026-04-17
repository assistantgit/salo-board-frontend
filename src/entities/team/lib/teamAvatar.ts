export function getTeamColor(name: string): string {
  const palette = [
    '#6d82eb', '#ff6c6c', '#4ecdc4', '#f7c948',
    '#a855f7', '#f97316', '#22c55e', '#ec4899', '#06b6d4',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return palette[Math.abs(hash) % palette.length];
}

export function getTeamInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}
