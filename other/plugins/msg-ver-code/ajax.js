function json2url(json) {
  if (JSON.stringify(json) === '{}') {
    return '';
  } else {
    let url = '';
    for (let name in json) {
      url += `&${name}=${encodeURI(json[name])}`;
    }
    return `?${url.slice(1)}`;
  }
}

var ajax = {
  get: function(url, oParams) {
    return window
      .fetch(url + json2url(oParams), {
        headers: {
          'X-GHB-VERSION': 3.8
        }
      })
      .then(res => {
        return res.json();
      });
  },
  post: function(url, oParams) {
    return window
      .fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          token: sessionStorage.getItem('token') || '1234'
        },
        body: json2url(oParams).substring(1)
      })
      .then(res => {
        return res.json();
      });
  }
};
