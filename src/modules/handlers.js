import { setActiveButton } from './dom';
import { renderReportContent } from './dom';
import { appState } from '../app';

export function handlePeriodBtnClick(e) {
  if (e.target.dataset.period !== appState.displayState) {
    setActiveButton(e.target);
    appState.displayState = e.target.dataset.period;
    renderReportContent();
  }
}
