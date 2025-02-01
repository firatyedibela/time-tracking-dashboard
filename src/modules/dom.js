import optionsBtn from "../../images/icon-ellipsis.svg";
import { getTimePeriodText } from "./utils";
import { getReportData } from "./api";
import { appState } from "../app";

export async function renderReportContent() {
  const container = document.querySelector(".report");

  // Clear report content before rendering
  removeAllCards();

  try {
    // If data is already fetched before, use the cached data, else fetch the data
    const reportData = appState.cachedReportData || (await getReportData());

    // If data is not cachhed, save it in cachedData
    if (!appState.cachedReportData) {
      appState.cachedReportData = reportData;
    }

    reportData.forEach((task) => {
      const title = task.title;
      const currentHours = task.timeframes[appState.displayState].current;
      const prevHours = task.timeframes[appState.displayState].previous;

      const taskCard = createTaskCard(title, currentHours, prevHours);
      container.appendChild(taskCard);
    });
  } catch (error) {
    console.log("ERROR: " + error.message);
  }
}

function createTaskCard(title, current, prev) {
  const reportItem = document.createElement("article");
  reportItem.className = "report__item report__item--task-card";

  // To target in css and specify color based on task name
  reportItem.dataset.type = title.toLowerCase();

  // Based on display state, decide what comes after Last => Last Day/Week/Month
  let timePeriodText = getTimePeriodText(appState.displayState);

  reportItem.innerHTML = `
    <div class="report__task-info">
      <div class="report__task-info-header">
        <h2 class="report__task-title">${title}</h2>
        <button class="report__task-options-btn" aria-label="Options">
          <img src="${optionsBtn}" alt="Options icon">
        </button>
      </div>
      <div class="report__task-hours">
        <p class="report__current-hours">${current}hrs</p>
        <p class="report__previous-hours">Last ${timePeriodText} - ${prev}hrs</p>
      </div>
    </div>  
  `;

  return reportItem;
}

function removeAllCards() {
  document.querySelectorAll(".report__item--task-card").forEach((element) => {
    if (element) {
      element.remove();
    }
  });
}

export function setActiveButton(element) {
  document
    .querySelector(".report__period-btn--active")
    .classList.remove("report__period-btn--active");

  element.classList.add("report__period-btn--active");
}
