const HEADER = {CONTENT_TYPE : 'Content-Type', APPLICATION : 'application/json'}

function httpGet(url) {
    return new Promise((resolve, reject) => {
        $.ajax({
          method : 'GET',
          url: url,
          contentType: HEADER.APPLICATION,
          dataType: "json",
        }).done(function(data) {
          resolve(data);
        })
        .fail(function(data) {
          reject(data.responseText)
        });
      });
}

function httpPost(url, data) {
  return new Promise((resolve, reject) => {
      $.ajax({
        method : 'POST',
        url: url,
        data: JSON.stringify(data),
        contentType: HEADER.APPLICATION,
        dataType: "json",
      }).done(function(data) {
        resolve(data);
      })
      .fail(function(data) {
        reject(data.responseText)
      });
  });
}