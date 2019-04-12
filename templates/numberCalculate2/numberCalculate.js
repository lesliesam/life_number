import calendar from '../../utils/calendar.js';

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
    lunarParams.year = lunarParams.lYear
    lunarParams.month = lunarParams.lMonth
    lunarParams.day = lunarParams.lDay

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