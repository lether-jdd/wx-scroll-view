// import fetch from '@modules/api/fetch';
Component({
  properties: {
    url: String,  //列表请求的接口
    param: String,   //接口参数
    minusElement:Array, //要减去的元素的id
  },
  data: {
    listData: [], //表格数据
    searchLoading: false, //是否展示加载
    searchLoadingComplete: false, //数据是否全部加载完成
    scrollHeight: wx.getSystemInfoSync().windowHeight, //可滚动的高度
    clientY:0,//手指位置
  }, 
  observers: {
    'param': function () {
      this.getList()
    }
  },
  methods: {
    getList() {
      // wx.request({
      //   method: 'GET',
      //   url: this.data.url,
      //   loading: true,
      //   isErrorHandle: true,
      //   data: this.data.params,
      //   success: (res) => { 
      //     this.setData({
      //       listData: [{val:'x'}],
      //     });
      //   },
      //   fail: () => { 
      //     wx.showToast({
      //       title: '加载失败',
      //       icon: 'fail',
      //       duration: 3000
      //     });
      //   }
      // });
      this.setData({
        listData: [{
          value: 'xxxxxxx'
        }, {
          value: 'xxxxxxx'
        }, {
          value: 'xxxxxxx'
        }, {
          value: 'xxxxxxx'
        }, {
          value: 'xxxxxxx'
        }, {
          value: 'xxxxxxx'
        }, {
          value: 'xxxxxxx'
        }, {
          value: 'xxxxxxx'
        }, {
          value: 'xxxxxxx'
        }, {
          value: 'xxxxxxx'
        }, {
          value: 'xxxxxxx'
        }, {
          value: 'xxxxxxx'
        }],
      });
    },
    getData() {
      this.setData({
        searchLoading: true,
        sstatus: 3
      });
      var result = this.data.listData;
      var resArr = [];
      if (result.length >15) {
        wx.showToast({ 
          title: '数据加载完毕',
          icon: 'success',
          duration: 3000
        });
        this.setData({
          searchLoadingComplete: true,
          searchLoading: false
        });
      } else {
        wx.showLoading({ 
          title: '加载中',
          icon: 'loading',
        });
        setTimeout(() => {
          for (let i = 0; i < 5; i++) {
            resArr.push(i);
          }
          wx.hideLoading();
          var cont = result.concat(resArr); //合并请求的数据 console.log(resArr.length);
          // this.data.searchLoading = false
          this.setData({
            searchLoading: false,
            listData: cont
          });
        }, 1500)
      }
    },
    //计算屏幕可滚动的高度
    /**
     * 
     * @param {*} items :Array 需减去高度的元素的ID
     */
    setScrollHeight(items) {
      var valiableWindowHeight = wx.getSystemInfoSync().windowHeight //可视窗口高度(单位px)
      //计算要去掉的元素的高度（单位px）
      let minusElementHeight = 0;
      let query = wx.createSelectorQuery()
      items && items.forEach(i => {
        query.select('#' + i).boundingClientRect()
      })
      query.exec(res => {
        res && (minusElementHeight = res.reduce((prev, next) => {
          if (!next) {
            return prev + 0
          } else {
            return prev + next.height
          }
        }, 0))
        var scrollHeight = valiableWindowHeight - minusElementHeight
        debugger
        this.setData({
          scrollHeight: scrollHeight
        })
      })
    },
    refresh() { 
      this.setData({
        sstatus: 1
      })
    },
    start(e) { 
      var touchPoint = e.touches[0];
      var clientY = touchPoint.clientY
      this.setData({
        clientY: clientY
      })
    },
    end (e) {
      var upPoint = e.changedTouches[0];
      var endY = upPoint.clientY
      var pointTopointY = endY - this.data.clientY
      var status = this.data.sstatus
      //下拉刷新
      if (status == 1 && pointTopointY > 50) {
        wx.showLoading({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中”  
          title: '刷新',
          icon: 'loading',
          duration: 1000
        });
      }
    },
  },
  attached: function () {
    this.setScrollHeight(this.data.minusElement) //设置滚动的高度
  },
  ready: function() {
  },
});
