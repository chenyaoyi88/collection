/**
 * 显示信息
 * 
 * @param {any} id 发送者id
 * @param {any} target 对方id
 * @returns 
 */
function showMsg(id, target) {
    let isMe = true;
    // 如果 isMe 为 true，则显示在右边，false 显示在左边
    if (id !== target.id) {
        isMe = false;
    }
    let str =
        `
    <div class="ws-content-list ws-content-list-${isMe ? 'right' : 'left'}" data-id="${target.id}">
        <div class="ws-content-avatar"></div>
        <div class="ws-content">
            ${isMe ? '' : `<div class="ws-content-name">${target.name}</div>`}
            <div class="ws-content-main">${target.content}</div>
        </div>
    </div>
    `;
    return str;
}

/**
 * 发送消息
 * 
 * @param {any} websocket 
 * @param {any} oInput input 元素
 * @param {any} oContentWrap 插入聊天内容元素
 * @param {any} options 
 * @returns 
 */
function sendMsg(websocket, oInput, oContentWrap, options) {
    if (!(/\S/.test(oInput.value))) {
        return;
    };

    const sMsgSend = JSON.stringify(Object.assign(options, {
        content: oInput.value
    }));

    websocket.send(sMsgSend);

    oContentWrap.innerHTML += showMsg(options.id, {
        id: options.id,
        content: oInput.value
    });

    oInput.value = '';
    oContentWrap.scrollTop = oContentWrap.scrollHeight;
}

function chatStart() {
    const clientID = +new Date();
    const clientName = '游客-' + clientID;
    const oChat = {
        id: clientID,
        name: clientName
    };

    const oContentWrap = document.getElementById('ws-content-wrap');
    const oInput = document.getElementById('ws-input');
    const oSubmit = document.getElementById('ws-submit');

    const wsUri = `ws://localhost:8000/?clientID=${oChat.id}`;
    const websocket = new WebSocket(wsUri);

    websocket.onopen = function (ev) {
        console.log(oChat.id + '客户端连接成功');
    };

    websocket.onmessage = function (ev) {
        const data = JSON.parse(ev.data);
        oContentWrap.innerHTML += showMsg(oChat.id, data);
        oContentWrap.scrollTop = oContentWrap.scrollHeight;
    };

    document.addEventListener('keydown', function (ev) {
        if (ev.keyCode === 13) {
            sendMsg(websocket, oInput, oContentWrap, oChat);
        }
    }, false);

    oSubmit.addEventListener('click', function () {
        sendMsg(websocket, oInput, oContentWrap, oChat);
    }, false);
}