// Парсим и отображаем text/plain, если он есть
if (typeof MsgHdrToMimeMessage !== "undefined" && gMessage) {
  MsgHdrToMimeMessage(gMessage, null, (msgHdr, mimeMsg) => {
    const plainPart = mimeMsg.allBodyParts.find(
      part => part.contentType === "text/plain"
    );

    if (plainPart?.body) {
      const div = document.createElement("div");
      div.style.marginTop = "1em";
      div.style.padding = "0.5em";
      div.style.background = "#f0f0f0";
      div.style.border = "1px dashed #aaa";
      div.style.whiteSpace = "pre-wrap";
      div.textContent = plainPart.body;

      const messageDoc = messagepane?.contentDocument;
      if (messageDoc?.body) {
        messageDoc.body.appendChild(div);
      }
    }
  }, true);
}
