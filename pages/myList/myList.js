//myList.js
//获取应用实例
const app = getApp()

Page({
  data: {
    authorized: false,
    numberList: [],
    sexes: ['男', '女'],
    hasMoreToLoad: true,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo == null) {
      this.setData({
        authorized: false
      })
      console.log("false")
    } else {
      this.setData({
        authorized: true
      })
      console.log("true")
    }
  },
  onShow: function () {
    this.setData({
      hasMoreToLoad: true,
      numberList: [],
    })
    this.loadData();
  },

  onReachBottom: function() {
    if (this.data.hasMoreToLoad) {
      this.loadData();
    }
  },

  loadData: function() {
    var self = this
    wx.showLoading({
      title: '加载中',
    })
    const length = this.data.numberList.length;
    const limit = 20;
    const db = wx.cloud.database()
    db.collection('number').orderBy('createDate', 'desc').skip(length).limit(limit).get({
      success: function (res) {
        wx.hideLoading();
        for (var i = 0; i < res.data.length; i ++) {
          res.data[i].age = self.getAge(res.data[i].birthday)
          res.data[i].relativeTime = new Date(res.data[i].createDate).toRelativeTime()
        }
        self.setData({
          numberList: length == 0 ? res.data : self.data.numberList.concat(res.data)
        })
        if (res.data.length < limit) {
          self.setData({
            hasMoreToLoad: false,
          })
        }
      },
      fail: function(res) {
        wx.hideLoading();
      }
    })
  },

  getAge: function(birthday) {
    var birth = Date.parse(birthday.replace('/-/g', "/"));
    if (birth) {
      var year = 1000 * 60 * 60 * 24 * 365;
      var now = new Date();
      var birthday = new Date(birth);
      var age = parseInt((now - birthday) / year);

      return age;
    }

    return -1;
  },

  editItem: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../item/item?itemInfo=' + JSON.stringify(this.data.numberList[id])
    })
  },

  removeItem: function(e) {
    var self = this;
    wx.showModal({
      content: '您确认删除此信息吗？',
      success (res) {
        if (res.confirm) {
          var id = e.currentTarget.id;
          wx.showLoading({
            title: '删除中',
          })

          const db = wx.cloud.database()
          db.collection('number').doc(self.data.numberList[id]._id).remove({
            success: function(res) {
              var newList = self.data.numberList
              newList.splice(id, 1);
              self.setData({
                numberList: newList
              })
            },

            complete: function(res) {
              wx.hideLoading();
            }
          })
        }
      }
    })
  },

  bindAdd: function(e) {
    wx.switchTab({
      url: '../index/index'
    })
  }
})
