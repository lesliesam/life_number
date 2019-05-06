import calendar from '../../utils/calendar.js';

var MARGIN_LEFT = 50;
var MARGIN_TOP = 50;
var WIDTH_GAP = 80;
var HEIGHT_GAP = 80;
var TEXT_WIDTH = 12;
var TEXT_HEIGHT = 12;
var CIRCLE_RADIUS = 16;
var SQUARE_SIDE_LENGTH = 40;
var TRIANGLE_SIDE_LENGTH = 40;
var TRIANGLE_OFFSET = 15

const actions = {
  calculateResult: function (birthday) {
    // 阳历生日年月日
    var birthday = birthday.split('-')
    var year = birthday[0]
    var month = birthday[1]
    var day = birthday[2]

    var solarParams = {}
    solarParams.year = year
    solarParams.month = month
    solarParams.day = day

    solarParams.yearSum = this.numberStringSum(year);
    solarParams.yearMonthSum = solarParams.yearSum + this.numberStringSum(month)
    solarParams.birthdaySum = solarParams.yearMonthSum + this.numberStringSum(day)
    solarParams.keyNum1 = solarParams.birthdaySum;
    solarParams.keyNum2 = this.numberAdd(solarParams.keyNum1);
    if (solarParams.keyNum2 >= 10) {
      solarParams.keyNum3 = this.numberAdd(solarParams.keyNum2)
    } else {
      solarParams.keyNum3 = -1;
    }

    //阴历生日
    var lunarParams = calendar.solar2lunar(year, month, day)
    lunarParams.year = "" + lunarParams.lYear
    lunarParams.month = "" + lunarParams.lMonth
    lunarParams.day = "" + lunarParams.lDay

    lunarParams.yearSum = this.numberStringSum(lunarParams.year + "")
    lunarParams.yearMonthSum = lunarParams.yearSum + this.numberStringSum(lunarParams.month + "")
    lunarParams.birthdaySum = lunarParams.yearMonthSum + this.numberStringSum(lunarParams.day + "")
    lunarParams.keyNum1 = lunarParams.birthdaySum;
    lunarParams.keyNum2 = this.numberAdd(lunarParams.keyNum1);
    if (lunarParams.keyNum2 >= 10) {
      lunarParams.keyNum3 = this.numberAdd(lunarParams.keyNum2)
    } else {
      lunarParams.keyNum3 = -1;
    }

    return { solarParams, lunarParams}
  },

  drawCanvas: function(solarParams, lunarParams) {
    this.drawNumDiagram('solarCanvas', solarParams);
    this.drawNumDiagram('lunarCanvas', lunarParams);
  },

  drawNumDiagram: function(canvasName, params) {
    var context = wx.createCanvasContext(canvasName, this)

    context.setStrokeStyle("#000000")
    context.setLineWidth(1)
    context.setFontSize(20)

    var numberCount = new Array(10).fill(0);
    var triangleCount = new Array(10).fill(0);

    // 画数字
    this.drawNumber(context);

    //画圆圈
    for (var i = 0; i < params.year.length; i++) {
      var n = parseInt(params.year.charAt(i));
      this.drawCircle(context, n, CIRCLE_RADIUS + numberCount[n] * 5);
      numberCount[n]++;
    }
    for (var i = 0; i < params.month.length; i++) {
      var n = parseInt(params.month.charAt(i));
      this.drawCircle(context, n, CIRCLE_RADIUS + numberCount[n] * 5);
      numberCount[n]++;
    }
    for (var i = 0; i < params.day.length; i++) {
      var n = parseInt(params.day.charAt(i));
      this.drawCircle(context, n, CIRCLE_RADIUS + numberCount[n] * 5);
      numberCount[n]++;
    }

    //画三角
    var triangelNum = parseInt(params.keyNum1 / 10);
    this.drawRegularTriangle(context, triangelNum, TRIANGLE_SIDE_LENGTH + triangleCount[triangelNum] * TRIANGLE_OFFSET);
    triangleCount[triangelNum] ++;

    var triangelNum = parseInt(params.keyNum1 % 10);
    this.drawRegularTriangle(context, triangelNum, TRIANGLE_SIDE_LENGTH + triangleCount[triangelNum] * TRIANGLE_OFFSET);
    triangleCount[triangelNum]++;

    if (params.keyNum2 >= 10) {
      var triangelNum = parseInt(params.keyNum2 / 10);
      this.drawRegularTriangle(context, triangelNum, TRIANGLE_SIDE_LENGTH + triangleCount[triangelNum] * TRIANGLE_OFFSET);
      triangleCount[triangelNum]++;

      var triangelNum = parseInt(params.keyNum2 % 10);
      this.drawRegularTriangle(context, triangelNum, TRIANGLE_SIDE_LENGTH + triangleCount[triangelNum] * TRIANGLE_OFFSET);
      triangleCount[triangelNum]++;
    }

    //画矩形
    var squareNum = params.keyNum3;
    if (squareNum == -1) {
      squareNum = params.keyNum2;
    }
    this.drawSquare(context, squareNum, SQUARE_SIDE_LENGTH);

    context.draw()
  },

  drawNumber: function (context) {
    for (var i = 0; i < 10; i++) {
      var {x, y} = this.getNumberPosition(i);
      context.fillText(i, x - TEXT_WIDTH / 2, y + TEXT_HEIGHT / 2);
    }
  },

  drawCircle: function(context, num, radius) {
    var { x, y } = this.getNumberPosition(num);

    context.beginPath()
    context.arc(x, y, radius, 0, 2 * Math.PI, true);
    context.stroke()
  },

  drawRegularTriangle: function(context, num, sideLength) {
    var { x, y } = this.getNumberPosition(num)

    context.setStrokeStyle("green")
    context.setLineWidth(2);
    context.beginPath()
    context.moveTo(x, y - 0.577 * sideLength);
    context.lineTo(x - 0.5 * sideLength, y + 0.289 * sideLength);
    context.lineTo(x + 0.5 * sideLength, y + 0.289 * sideLength);
    context.closePath();
    context.stroke()
  },

  drawSquare: function(context, num, sideLength) {
    var { x, y } = this.getNumberPosition(num)

    context.setStrokeStyle("red")
    context.beginPath()
    context.rect(x - sideLength / 2, y - sideLength / 2, sideLength, sideLength);
    context.stroke()
  },

  getNumberPosition: function(num) {
    if (num == 0) {
      return {x : MARGIN_LEFT + WIDTH_GAP * 2.7, y : MARGIN_TOP + HEIGHT_GAP * 2.7};
    } else {
      var lineNum = parseInt((num - 1) / 3);
      var lineIndex = (num - 1) % 3;
      return {x : MARGIN_LEFT + lineIndex * WIDTH_GAP, y : MARGIN_TOP + lineNum * HEIGHT_GAP};
    }
  },

  numberStringSum: function(numberString) {
    var sum = 0;
    for (var i = 0; i < numberString.length; i ++) {
      sum += parseInt(numberString.charAt(i))
    }

    return sum;
  },

  numberAdd: function (oldNum) {
    var tempNum = parseInt(oldNum / 10) + oldNum % 10
    return tempNum;
  },
}

export default actions;