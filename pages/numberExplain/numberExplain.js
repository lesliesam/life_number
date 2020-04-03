//获取应用实例
const app = getApp()

Page({
  data: {
    title: '',
    numberToExplain: '',
    officialNotes: '',
    publicTags: [],
    privateTags: [],
    expertNotes: [],
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    this.setData({
      title: options.title,
      numberToExplain: options.numberToExplain
    })
  },
   
  onShow: function() {
    this.loadOfficialNots()
    this.loadPublicTags()
    this.loadPrivateTags()
    this.loadExpertNotes()
  },

  bindAdd: function (e) {
    wx.navigateTo({
      url: '../numberExplain/input?numberToExplain=' + this.data.numberToExplain,
    })
  },

  loadOfficialNots() {
    var self = this;
    const db = wx.cloud.database()
    db.collection('explain_official').where({
      number: this.data.numberToExplain.toString(),
    }).get({
        success: function (res) {
          console.log(res)
          if (res.data && res.data.length > 0)
          self.setData({
            officialNotes: res.data[0].explain
          })
        },
      })
  },

  loadPublicTags() {
    var self = this;
    const db = wx.cloud.database()
    db.collection('explain_public').where({
      number: this.data.numberToExplain.toString(),
    }).get({
        success: function (res) {
          console.log(res)
          self.setData({
            publicTags: res.data
          })
        },
      })
  },

  loadPrivateTags() {
    var self = this;
    const db = wx.cloud.database()
    db.collection('explain_private').where({
      number: this.data.numberToExplain.toString(),
    }).get({
        success: function (res) {
          console.log(res)
          self.setData({
            privateTags: res.data
          })
        },
      })
  },

  loadExpertNotes() {
    var self = this;
    const db = wx.cloud.database()
    db.collection('explain_expert').where({
      number: this.data.numberToExplain.toString(),
    }).get({
        success: function (res) {
          console.log("Expert notes: ")
          console.log(res)
          self.setData({
            expertNotes: res.data
          })
        },
      })
  }
})