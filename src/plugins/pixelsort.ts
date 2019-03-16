function plugin(p: any, toolData: any) {
  //const d = p.pixelDensity();
  p.loadPixels();
  const toolAreaWidth =
    toolData.point.x > toolData.endPoint.x
      ? toolData.point.x - toolData.endPoint.x
      : toolData.endPoint.x - toolData.point.x;
  const toolAreaHeight =
    toolData.point.y > toolData.endPoint.y
      ? toolData.point.y - toolData.endPoint.y
      : toolData.endPoint.y - toolData.point.y;

  const x =
    toolData.point.x > toolData.endPoint.x
      ? toolData.endPoint.x
      : toolData.point.x;
  const y =
    toolData.point.y > toolData.endPoint.y
      ? toolData.endPoint.y
      : toolData.point.y;

  const { controlOptions } = toolData;

  const { direction } = controlOptions;

  for (let i = 0; i < toolAreaHeight; i++) {
    let rowArray = [];
    for (let j = 0; j < toolAreaWidth; j++) {
      let pixelArray = p.get(x + j, y + i);
      rowArray.push(pixelArray);
    }

    rowArray.sort((a, b) => {
      return direction === "left" ? a[0] - b[0] : b[0] - a[0];
    });

    for (let j = 0; j < toolAreaWidth; j++) {
      p.set(
        x + j,
        y + i,
        p.color(
          `rgba(${rowArray[j][0]},${rowArray[j][1]},${rowArray[j][2]},${
            rowArray[j][3]
          })`
        )
      );
    }
  }

  p.updatePixels();
}
