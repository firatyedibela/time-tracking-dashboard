import { renderReportContent } from './modules/dom';
import { handlePeriodBtnClick } from './modules/handlers';

export const appState = {
  displayState: 'daily',
  cachedReportData: null,
};

document.addEventListener('DOMContentLoaded', renderReportContent);

document.querySelectorAll('.report__period-btn').forEach((button) => {
  button.addEventListener('click', handlePeriodBtnClick);
});
