console.log('background service worker 222')

chrome.commands.onCommand.addListener(function(command) {
    if (command === 'toggle') {
      // 执行对应的操作
      console.log(command,'command')
      // 将popup.html作为shadow dom插入
      chrome.tabs.create({
        url: chrome.runtime.getURL('index.html')
      });

    }
  });