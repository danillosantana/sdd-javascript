const HEADER = {CONTENT_TYPE : 'Content-Type', APPLICATION : 'application/json'}

/**
 * Realiza a requisição GET. 
 * 
 * @param {*} url 
 */
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

/**
 * Realiza a requisição POST.
 * 
 * @param {*} url 
 * @param {*} data 
 */
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