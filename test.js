window.addEventListener("load", () => {
    let messagePane = document.getElementById("messagepane");
    if (!messagePane) return;
  
    messagePane.addEventListener("load", async () => {
      try {
        let msgHdr = gFolderDisplay?.selectedMessage;
        if (!msgHdr) return;
  
        // Попробуем получить MIME-объект (если доступен)
        let parts = gMessageDisplay?.displayedMessage?.allBodyParts;
        if (!parts) {
          console.warn("MIME части не найдены");
          return;
        }
  
        // Вставим в DOM для проверки
        let container = document.createElement("div");
        container.id = "extraContent";
        container.style.padding = "1em";
        container.style.border = "1px solid #aaa";
        container.style.margin = "1em";
  
        for (let part of parts) {
          if (["text/plain", "text/calendar"].includes(part.contentType)) {
            let text = await part.getContentAsText();
            let block = document.createElement("pre");
            block.textContent = `[${part.contentType}]\n` + text;
            container.appendChild(block);
          }
        }
  
        messagePane.parentNode.insertBefore(container, messagePane.nextSibling);
      } catch (e) {
        console.error("Ошибка извлечения MIME:", e);
      }
    }, { once: true });
  });
  