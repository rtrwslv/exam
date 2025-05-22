MsgHdrToMimeMessage(
  gFolderDisplay.selectedMessage,
  null,
  function (msgHdr, mimeMsg) {
    const plainPart = mimeMsg.allBodyParts.find(
      part => part.contentType === "text/plain"
    );

    if (plainPart && plainPart.body) {
      // Создаем div и вставляем
      const div = document.createElement("div");
      div.style.marginTop = "1em";
      div.style.padding = "0.5em";
      div.style.background = "#f5f5f5";
      div.style.border = "1px dashed #ccc";
      div.style.whiteSpace = "pre-wrap"; // сохраняет переносы
      div.textContent = plainPart.body;

      const messagePane = document.getElementById("messagepane");
      if (messagePane?.contentDocument?.body) {
        messagePane.contentDocument.body.appendChild(div);
      }
    }
  },
  true
);
