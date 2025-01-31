export async function getReportData() {
  try {
    const response = await fetch('/data.json');
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
