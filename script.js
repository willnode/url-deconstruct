document.getElementById("urlinput").oninput = function (e) {
  var url = new URL(e.target.value);
  var params = [...url.searchParams.entries()];
  document.getElementById("output").innerHTML = `
    <table class="table table-light table-striped">
    <thead>
      <tr>
        <td>[Host]</td>
        <td>${encode(url.hostname)}</td>
      </tr>
      <tr>
        <td>[Path]</td>
        <td>${encode(url.pathname)}</td>
      </tr>
    </thead>
    <tbody>
    ${params.map(
        ([x, y]) => `<tr>
        <th>${encode(x)}</th>
        <td>${smartEncode(y)}</td>
    </tr>`
      )
      .join("")}
    </tbody>
    </table>
    `;
};

function smartEncode(str) {
  if (isValidBase64(str)) {
    return encode(str)+`<br><div class="alert alert-success p-2 mt-2 mb-0">
    <div class="small">Decoded Base64</div>
    ${smartEncodeUrl(atob(str))}
    </div>`
  } else {
    return smartEncodeUrl(str);
  }
}

function smartEncodeUrl(str) {
  return isValidUrl(str)
  ? `<a href="${encode(str)}" target="_blank" rel="noopener noreferrer">${encode(str)}</a>`
  : encode(str);
}

function encode(str) {
  return str.replace(/[\u00A0-\u9999<>\&"']/gim, function (i) {
    return "&#" + i.charCodeAt(0) + ";";
  });
}

function isValidUrl(string) {
  try {
    new URL(string);
  } catch (_) {
    return false;
  }

  return true;
}

function isValidBase64(str) {
  return str.length % 4 == 0 && /^[A-Za-z0-9+/]+[=]{0,3}$/.test(str);
}
