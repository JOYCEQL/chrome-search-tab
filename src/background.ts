console.log('background service worker 222')

// ctrl+shift+h 唤醒
chrome.commands.onCommand.addListener(function (command) {
  if (command === 'toggle') {
    chrome.tabs.query({}, (tabs) => {
      // 构建一个包含所有标签页信息的数组
      const tabInfoArray = tabs.map((tab) => ({
        title: tab.title,
        url: tab.url,
        id: tab.id,
        favIconUrl: tab.favIconUrl,
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
    chrome.tabs.remove(request.tabId, (result) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError)
      }
      sendResponse({ success: true })
    })
    return true // 表示异步响应
  }
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'goTab') {
    chrome.tabs.update(request.tabId, { active: true })
  }
})
