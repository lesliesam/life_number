const actions = {
  calculateResult: function (birthday) {
    // 拆分年月日
    var birthday = birthday.split('-')
    var year = birthday[0]
    var month = birthday[1]
    var day = birthday[2]

    // 拆分年成为两部分，1988 -> 19 和 88
    var year1 = year.substring(0, 2)
    var year2 = year.substring(2)

    // 根据生日构造所有参数
    var params = {}
    params.aa = parseInt(day)
    params.bb = parseInt(month)
    params.cc = parseInt(year1)
    params.dd = parseInt(year2)
    params.ee = this.numberAdd(params.aa);
    params.ff = this.numberAdd(params.bb);
    params.gg = this.numberAdd(params.cc);
    params.hh = this.numberAdd(params.dd);
    params.ii = this.numberAdd(params.ee + params.ff);
    params.jj = this.numberAdd(params.gg + params.hh);
    params.kk = this.numberAdd(params.ii + params.jj);
    params.ll = this.numberAdd(params.jj + params.kk);
    params.mm = this.numberAdd(params.ii + params.kk);
    params.nn = this.numberAdd(params.ll + params.mm);
    params.oo = this.numberAdd(params.ee + params.ii);
    params.pp = this.numberAdd(params.ff + params.ii);
    params.qq = this.numberAdd(params.oo + params.pp);
    params.rr = this.numberAdd(params.gg + params.jj);
    params.ss = this.numberAdd(params.hh + params.jj);
    params.tt = this.numberAdd(params.rr + params.ss);

    // 整合密码出结果
    var results = {}
    results.zxg = params.kk
    results.wzxg = this.numberAdd(params.qq + params.nn + params.tt)
    results.nxhm = this.numberAdd(params.ii + params.jj + params.kk)
    results.jthm = this.numberAdd(params.ff + params.gg)
    results.qysxg = this.numberAdd(params.ee + params.hh + params.kk)

    results.mm1 = this.codeCombine(params.ii, params.jj, params.kk);
    results.mm2 = this.codeCombine(params.ee, params.ff, params.ii);
    results.mm3 = this.codeCombine(params.gg, params.hh, params.jj);
    results.mm4 = this.codeCombine(params.ii, params.kk, params.mm);
    results.mm5 = this.codeCombine(params.jj, params.kk, params.ll);
    results.mm6 = this.codeCombine(params.oo, params.pp, params.qq);
    results.mm7 = this.codeCombine(params.ll, params.mm, params.nn);
    results.mm8 = this.codeCombine(params.rr, params.ss, params.tt);
    results.mm9 = this.codeCombine(params.ee, params.ii, params.oo);
    results.mm10 = this.codeCombine(params.ff, params.ii, params.pp);
    results.mm11 = this.codeCombine(params.gg, params.jj, params.rr);
    results.mm12 = this.codeCombine(params.hh, params.jj, params.ss);

    var numberCounts = Array.apply(null, Array(10)).map(() => 0);
    var countableArrayKeys = ['ee', 'ff', 'gg', 'hh', 'ii', 'jj', 'kk'];
    for (var i in countableArrayKeys) {
      var key = countableArrayKeys[i];
      numberCounts[params[key]]++;
    }
    // 潜意识性格可以补缺的数字
    if (numberCounts[results.qysxg] == 0) {
      numberCounts[results.qysxg]++;
    }

    var multipuleNumberString = '';
    var lackedNumberString = '';
    for (var i = 1; i < numberCounts.length; i++) {
      if (numberCounts[i] > 1) {
        multipuleNumberString += (i + '(' + numberCounts[i] + '次) ')
      } else if (numberCounts[i] == 0) {
        lackedNumberString += (i + ',')
      }
    }

    return {params, results, numberCounts, multipuleNumberString, lackedNumberString};
  },
  numberAdd: function (oldNum) {
    var tempNum = parseInt(oldNum / 10) + oldNum % 10
    while (tempNum >= 10) {
      tempNum = this.numberAdd(tempNum);
    }
    return tempNum;
  },
  codeCombine: function (param1, param2, param3) {
    return this.stringAdd(param1, param2, '-', param3)
  },
  stringAdd: function (...params) {
    return params.join('');
  },
  onShareAppMessage: function (ops) {
    return {
      title: '生命数字密码计算器',
      path: 'pages/index/index?birthday=' + this.data.birthday
    }
  },
}

export default actions;