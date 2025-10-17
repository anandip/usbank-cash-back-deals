// When the extension icon is clicked, automatically click all the
// activate buttons on the page.
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      document
          .querySelectorAll('#activateOffer')
          .forEach(el => el.click());
    }
  });
});

// Keep the extension icon disabled until the tab contains the US Bank page.
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.disable();
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    let enablingRule = {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostSuffix: '.usbank.com' },
        }),
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { schemes: ['file'] },
        }),
      ],
      actions: [new chrome.declarativeContent.ShowAction()]
    };
    chrome.declarativeContent.onPageChanged.addRules([enablingRule]);
  });
});
