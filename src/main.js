import optionsBtn from '../images/icon-ellipsis.svg';
import workSvg from '../images/icon-work.svg';
import playSvg from '../images/icon-play.svg';
import studySvg from '../images/icon-study.svg';
import exerciseSvg from '../images/icon-exercise.svg';
import socialSvg from '../images/icon-social.svg';
import selfCareSvg from '../images/icon-self-care.svg';

/**
 * Review styles, check how you implemented that card styles
 *
 */

const imgArray = [
  workSvg,
  playSvg,
  studySvg,
  exerciseSvg,
  socialSvg,
  selfCareSvg,
];

let displayState = 'daily';
let cachedReportData = null;

renderReportContent();

document.querySelectorAll('.report__period-btn').forEach((button) => {
  button.addEventListener('click', handlePeriodBtnClick);
});

function handlePeriodBtnClick(e) {
  if (e.target.dataset.period !== displayState) {
    // Change active button
    document
      .querySelector('.report__period-btn--active')
      .classList.toggle('report__period-btn--active');

    e.target.classList.toggle('report__period-btn--active');

    displayState = e.target.dataset.period;
    renderReportContent();
  }
}

async function renderReportContent() {
  const container = document.querySelector('.report');

  // Remove previous data
  removeAllCards();

  try {
    // If data is already fetched before, use the cached data, else fetch the data
    const reportData = cachedReportData || (await getReportData());

    // If data is not cachhed, save it in cachedData
    if (!cachedReportData) {
      cachedReportData = reportData;
    }

    reportData.forEach((task, idx) => {
      const title = task.title;
      const currentHours = task.timeframes[displayState].current;
      const prevHours = task.timeframes[displayState].previous;
      const img = imgArray[idx];

      const taskCard = createTaskCard(title, currentHours, prevHours, img);
      container.appendChild(taskCard);
    });
  } catch (error) {
    console.log('ERROR: ' + error.message);
  }
}

async function getReportData() {
  try {
    const response = await fetch('../public/data.json');
    if (!response.ok) {
      throw new Error(
        `Network error: ${response.status} - ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('ERROR ' + error.message);
  }
}

function createTaskCard(title, current, prev, img) {
  const reportItem = document.createElement('div');
  reportItem.className = 'report__item report__item--task-card';

  // To target in css and specify color based on task name
  reportItem.dataset.type = title.toLowerCase();

  // Based on display state, decide what comes after Last => 'Last Day/Week/Month'
  let periodText = '';
  if (displayState === 'daily') {
    periodText = 'Day';
  } else if (displayState === 'weekly') {
    periodText = 'Week';
  } else {
    periodText = 'Month';
  }

  reportItem.innerHTML = `
    <div class="report__task-img-container">
      <img src="${img}" class="report__task-img" >
    </div>
    <div class="report__task-info">
      <div class="report__task-info-header">
        <h2 class="report__task-title">${title}</h2>
        <button class="report__task-options-btn">
          <img src="${optionsBtn}">
        </button>
      </div>
      <div class="report__task-hours">
        <p class="report__current-hours">${current}hrs</p>
        <p class="report__previous-hours">Last ${periodText} - ${prev}hrs</p>
      </div>
    </div>  
  `;

  return reportItem;
}

function removeAllCards() {
  document.querySelectorAll('.report__item--task-card').forEach((element) => {
    if (element) {
      element.remove();
    }
  });
}
