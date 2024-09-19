console.log('background service worker 222')

// ctrl+shift+h 唤醒
chrome.commands.onCommand.addListener(function (command) {
  if (command === 'toggle') {
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
