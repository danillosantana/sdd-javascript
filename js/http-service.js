function httpGet(url) {
    var xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {

        xhr.onreadystatechange = (e) => {
          if (xhr.status === 200) {
            console.log('SUCCESS', xhr.responseText);
            resolve(JSON.parse(xhr.responseText));
          } else {
            console.warn('request_error');
          }
        };
    
        xhr.open('GET', url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
      });
}