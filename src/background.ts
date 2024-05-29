console.log('background service worker 222')

chrome.commands.onCommand.addListener(function(command) {
    console.log(command,'command')
    if (command === 'toggle-extension') {
      // 执行对应的操作
    }
  });