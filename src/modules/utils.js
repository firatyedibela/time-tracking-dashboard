export function getTimePeriodText(text) {
  switch (text) {
    case 'daily':
      return 'Day';
    case 'weekly':
      return 'week';
    case 'monthly':
      return 'month';
  }
}
