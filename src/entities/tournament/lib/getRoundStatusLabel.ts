export const getRoundStatusLabel = (status: string) => {
  switch (status) {
    case 'DR':
      return 'Очікується';
    case 'AC':
      return 'Активний';
    case 'SC':
      return 'Оцінюється';
    case 'EV':
      return 'Оцінений';
    default:
      return '';
  }
};
