function findTimeGaps() {
  const timePairs = document
    .getElementById("timePairs")
    .value.split("\n")
    .map((line) => {
      var columns = line.split("\t");
      return columns[1] + "\t" + columns[2];
    });

  const missingRanges = getMissingTimeRanges(timePairs);
  const timeGaps = missingRanges.map((range) => `${range.start} - ${range.end}`);

  // Display time gaps
  document.getElementById("timeGaps").value = timeGaps.join("\n");
}

function getMissingTimeRanges(timeRanges) {
  // 時間帯を開始時間と終了時間に分割し、配列に格納
  const splitRanges = [];
  for (const range of timeRanges) {
    const [start, end] = range.split("\t");
    splitRanges.push({ start, end });
  }

  // 開始時間の昇順でソート
  splitRanges.sort((a, b) => a.start.localeCompare(b.start));

  // 歯抜けになっている時間帯を検出
  const missingRanges = [];
  let currentEnd = "0:00:00";
  for (const range of splitRanges) {
    if (range.start.localeCompare(currentEnd) > 0) {
      missingRanges.push({ start: currentEnd, end: range.start });
    }
    currentEnd = range.end.localeCompare(currentEnd) > 0 ? range.end : currentEnd;
  }

  return missingRanges;
}
