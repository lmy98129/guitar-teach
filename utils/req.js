const reqUrl = 'https://sguitar.mybeike.com/api/score.php';
const header = {
  //设置参数内容类型为x-www-form-urlencoded
  'content-type': 'application/x-www-form-urlencoded',
  'Accept': 'application/json'
}

const getScoreList = (uploader, self) => {
  wx.request({
    url: reqUrl,
    method: 'POST',
    data: 'a=searchByUploaderId&uploader_id=' + uploader,
    header: header,
    success: res => {
      console.log("download success", res);
      let resArray = res.data
      resArray.sort((a, b) => a.title.localeCompare(b.title, 'zh-Hans-CN', { sensitivity: 'accent' }));
      self.setData({
        scoreList: resArray
      });
      wx.setStorageSync("scoreList", resArray);
    },
    fail: res => {
      console.log(res);
    }
  });
}

const delScoreList = (e, uploader, self) => {
  let that = self;
  wx.request({
    url: reqUrl,
    method: 'POST',
    data: 'a=deleteById&id=' + e.target.dataset.id,
    header: header,
    success: res => {
      console.log("delete success:", res);
      wx.showToast({
        title: '删除成功',
      })
      getScoreList(uploader, that);
    }
  })
}

const uploadScore = (uploader, length, content, self) => {
  wx.request({
    url: reqUrl,
    method: 'POST',
    data: 'a=upload&title=' + self.data.title + '&length=' + length + '&content=' + content + '&uploader_id=' + uploader,
    header: header,
    success: res => {
      console.log("upload success:", res);
      wx.showToast({
        title: '上传成功',
      })
      wx.setStorageSync("isSaved", true);
    }
  })
}

const updateScore = (uploader, id, length, content, self) => {
  wx.request({
    url: reqUrl,
    method: 'POST',
    data: 'a=updateById&id='+id+'&title=' + self.data.title + '&length=' + length + '&content=' + content + '&uploader_id=' + uploader,
    header: header,
    success: res => {
      console.log("success:", res);
      wx.showToast({
        title: '上传成功',
      })
      wx.setStorageSync("isSaved", true);
    }
  })
}

module.exports = {
  getScoreList: getScoreList,
  delScoreList: delScoreList,
  uploadScore: uploadScore,
  updateScore: updateScore
}