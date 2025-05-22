let browser = document.getElementById("messagepane");

function insertPlainText(plainText) {
  const doc = browser.contentDocument;
  if (!doc || !doc.body) return;

  const div = doc.createElement("div");
  div.style.marginTop = "1em";
  div.style.padding = "1em";
  div.style.background = "#eef";
  div.style.border = "1px dashed #99f";
  div.style.whiteSpace = "pre-wrap";
  div.style.color = "black";
  div.textContent = plainText;

  doc.body.appendChild(div);
}

browser.addEventListener("pageshow", () => {
  MsgHdrToMimeMessage(gMessage, null, (msgHdr, mimeMsg) => {
    if (!mimeMsg || !mimeMsg.parts) return;

    const plainPart = mimeMsg.parts.find(p => p.contentType === "text/plain");
    if (!plainPart || !plainPart.body) return;

    insertPlainText(plainPart.body);
  }, true);
}, { once: true }); // Важно: один раз, иначе будет вставлять повторно
