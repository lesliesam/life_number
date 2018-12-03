//获取应用实例
const app = getApp()


Page({
  data: {
    numberToExplain: '',
    text: '',
    currentTypeSelected: 0,
    typeValues: ['正面意义', '负面意义'],
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
  },

  bindTypeChange: function(e) {
    this.setData({
      currentTypeSelected: e.detail.value,
    })
  },

  bindTextInput: function(e) {
    var text = e.detail.value
    this.setData({
      text: text
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
        explain: this.data.text,
        isPositive: this.data.currentTypeSelected==0?true:false,
      },
      complete: function (e) {
        wx.hideLoading();
        wx.navigateBack({
          delta: 1,
        })
      }
    })
  },
})