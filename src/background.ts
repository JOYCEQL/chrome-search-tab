console.log('background service worker 222')

chrome.commands.onCommand.addListener(function (command) {
  console.log(command, '112344')
  if (command === 'toggle') {
    // 执行对应的操作
    console.log(command, 'command')
    // 将popup.html作为shadow dom插入
    // chrome.tabs.create({
    //   url: chrome.runtime.getURL('index.html'),
    // })

    chrome.tabs.query({}, (tabs) => {
      // 构建一个包含所有标签页信息的数组
      const tabInfoArray = tabs.map((tab) => ({
        title: tab.title,
        url: tab.url,
      }))

      // 找到当前活动标签页并发送信息
      chrome.tabs.query({ active: true, currentWindow: true }, (activeTabs) => {
        if (activeTabs.length > 0) {
          chrome.tabs.sendMessage(activeTabs[0].id, {
            tabs: tabInfoArray,
          })
        }
      })
    })
  }
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'closeTab') {
    chrome.tabs.remove(request.tabId)
  }
})

// 监听当前打开的所有标签页
// 监听扩展图标点击事件
