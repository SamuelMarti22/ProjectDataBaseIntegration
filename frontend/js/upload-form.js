const fileInput = document.getElementById("fileInput");
const progressBox = document.getElementById("progressBox");
const progress = document.getElementById("progress");
const fileStatus = document.getElementById("fileStatus");

fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    progressBox.style.display = "block";
    fileStatus.innerText = "Uploading...";

    let uploaded = 0;
    const interval = setInterval(() => {
      uploaded += 10;
      progress.style.width = uploaded + "%";
      if (uploaded >= 100) {
        clearInterval(interval);
        fileStatus.innerText = "Completed";
      }
    }, 300);
  }
});
