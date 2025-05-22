MsgHdrToMimeMessage(gMessage, null, (msgHdr, mimeMsg) => {
  if (!mimeMsg) {
    console.error("mimeMsg is null or undefined");
    return;
  }

  const plainPart = (mimeMsg.parts || []).find(
    part => part.contentType === "text/plain"
  );

  if (!plainPart || !plainPart.body) {
    console.warn("text/plain part not found");
    return;
  }

  // Получаем <browser id="messagepane">
  const browser = document.getElementById("messagepane");
  if (!browser) {
    console.error("browser#messagepane not found");
    return;
  }

  const messageDoc = browser.contentDocument;
  if (!messageDoc || !messageDoc.body) {
    console.error("messagepane.contentDocument is not ready");
    return;
  }

  // Создаем элемент прямо в том документе
  const div = messageDoc.createElement("div");
  div.style.marginTop = "1em";
  div.style.padding = "0.5em";
  div.style.background = "#f5f5f5";
  div.style.border = "1px dashed #888";
  div.style.whiteSpace = "pre-wrap";
  div.textContent = plainPart.body;

  // Вставляем текст в самый конец письма
  messageDoc.body.appendChild(div);
}, true);
