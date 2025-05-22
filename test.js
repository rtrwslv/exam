window.addEventListener("messagepane-loaded", () => {
  let msgHdr = gFolderDisplay.selectedMessage;

  if (!msgHdr) {
    console.warn("msgHdr is null/undefined");
    return;
  }

  MsgHdrToMimeMessage(
    msgHdr,
    null,
    function (msgHdr, mimeMsg) {
      const plainPart = mimeMsg.allBodyParts.find(
        part => part.contentType === "text/plain"
      );

      if (plainPart && plainPart.body) {
        const div = document.createElement("div");
        div.style.marginTop = "1em";
        div.style.padding = "0.5em";
        div.style.background = "#f5f5f5";
        div.style.border = "1px dashed #ccc";
        div.style.whiteSpace = "pre-wrap";
        div.textContent = plainPart.body;

        const messagePane = document.getElementById("messagepane");
        if (messagePane?.contentDocument?.body) {
          messagePane.contentDocument.body.appendChild(div);
        }
      }
    },
    true
  );
});
