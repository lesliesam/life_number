//获取应用实例
const app = getApp()


Page({
  data: {
    numberToExplain: '',
    tags: [],
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    var numberToExplain = JSON.parse(options.numberToExplain)
    console.log(numberToExplain)

    this.setData({
      numberToExplain: numberToExplain
    })

    wx.showLoading({
      title: '加载中',
    })
    
    var self = this;
    const db = wx.cloud.database()
    db.collection('primaryNumberExplain').where({
      number: numberToExplain
    })
    .get({
      success: function(res) {
        console.log(res)
        self.setData({
          tags: res.data
        })
      },
      complete: function(res) {
        wx.hideLoading();
      }
      
    })
  },

  bindAdd: function (e) {
    var self = this
    wx.showLoading({
      title: '保存中',
    })
    const db = wx.cloud.database()
    db.collection('primaryNumberExplain').add({
      data: {
        number: this.data.numberToExplain,
        explain: '一条测试信息',
        isPositive: true,
      },
      complete: function(e) {
        wx.hideLoading();
      }
    })
  },
})