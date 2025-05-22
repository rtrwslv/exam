MsgHdrToMimeMessage(gMessage, null, (msgHdr, mimeMsg) => {
  if (!mimeMsg) {
    console.error("mimeMsg is null or undefined");
    return;
  }

  const parts = mimeMsg.parts || [];
  if (!parts.length) {
    console.warn("No parts found in mimeMsg");
    return;
  }

  const plainPart = parts.find(part => part.contentType === "text/plain");
  if (plainPart && plainPart.body) {
    const messageDoc = messagepane?.contentDocument;
    if (!messageDoc) {
      console.error("messagepane.contentDocument not available");
      return;
    }

    const div = messageDoc.createElement("div");
    div.style.marginTop = "1em";
    div.style.padding = "0.5em";
    div.style.background = "#f0f0f0";
    div.style.border = "1px dashed #aaa";
    div.style.whiteSpace = "pre-wrap";
    div.textContent = plainPart.body;

    messageDoc.body.appendChild(div);
  }
}, true);
