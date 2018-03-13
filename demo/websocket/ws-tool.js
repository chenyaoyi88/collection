function getChatHistory(arr) {
    if (!(arr && arr.length)) return;
    let str = '';
    for (let item of arr) {
        str += saySomething(item);;
    }
    return str;
}

function saySomething(json) {
    let str = '';
    if (json.id && json.name) {
        str =
            `
        <div class="ws-content-list ws-content-list-left">
            <div class="ws-content-avatar"></div>
            <div class="ws-content">
                <div class="ws-content-name">${json.name}</div>
                <div class="ws-content-main">${json.content}</div>
            </div>
        </div>
        `;
    } else {
        str =
            `
        <div class="ws-content-list ws-content-list-right">
            <div class="ws-content">
                <div class="ws-content-main">${json.content}</div>
            </div>
            <div class="ws-content-avatar"></div>
        </div>
        `;
    }
    return str;
}

function sendMsg(websocket, oInput, oContentWrap, options) {
    if (!(/\S/.test(oInput.value))) {
        return;
    };

    websocket.send(JSON.stringify({
        id: options.id,
        name: options.name,
        content: oInput.value
    }));

    oContentWrap.innerHTML += saySomething({
        content: oInput.value
    });
    oInput.value = '';
    oContentWrap.scrollTop = oContentWrap.scrollHeight;
}