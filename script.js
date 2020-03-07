const code = `(function getInfomation(){
  const buyButton = document.querySelector(".buy");
  if(!buyButton) return false;
  const child = buyButton.children[0];
  if(child.tagName === "SPAN") return false;
  const isThereAnOption = document.querySelector("._check_option");
  if(!isThereAnOption) child.click();
  return true;
})()`;

const { tabs } = chrome;
const NAVER_STORE_URL = "https://smartstore.naver.com/";

function refresh() {
  tabs.executeScript({ code }, function(result) {
    const isValid = result[0];
    if (!isValid) {
      document.querySelector("#refresh").style.display = "block";
      tabs.reload();
      const delay = document.querySelector("input").value;
      setTimeout(refresh, delay);
    } else {
      //구입가능
      const audio = document.querySelector("audio");
      audio.play();
      document.querySelector("#success").style.display = "block";
    }
  });
}

tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
  const url = tabs[0].url;
  const isNaverStore = url.indexOf(NAVER_STORE_URL) >= 0;
  if (isNaverStore) {
    refresh();
  } else {
    document.querySelector("#error").style.display = "block";
  }
});
