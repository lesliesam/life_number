//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    birthday: '1981-09-27',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showResult: false,
    lifeNumberParams: {},
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindDateChange: function (e) {
    console.log('生日修改为', e.detail.value)
    this.setData({
      birthday: e.detail.value
    })
  },
  showResult: function (e) {
    console.log('show result.')
    this.setData({
      showResult: true
    })
    this.calculateResult();
  },
  calculateResult: function() {
    // 拆分年月日
    var birthday = this.data.birthday.split('-')
    var year = birthday[0]
    var month = birthday[1]
    var day = birthday[2]

    // 拆分年成为两部分，1988 -> 19 和 88
    var year1 = year.substring(0, 2)
    var year2 = year.substring(2)

    // 根据生日构造所有参数
    var params = this.data.lifeNumberParams
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

    console.log(this.data.lifeNumberParams);
  },
  numberAdd: function(oldNum) {
    var tempNum = parseInt(oldNum / 10) + oldNum % 10
    while (tempNum >= 10) {
      tempNum = this.numberAdd(tempNum);
    }
    return tempNum;
  }
})
