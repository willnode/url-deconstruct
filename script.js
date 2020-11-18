document.getElementById("urlinput").oninput = function (e) {
  var url = new URL(e.target.value);
  var params = [...url.searchParams.keys()].reduce(
    (p, c) => ((p[c] = url.searchParams.get(c)), p),
    {}
  );
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
    ${Object.keys(params).map(
      (x) => `<tr>
        <th>${encode(x)}</th>
        <td>${isValidUrl(params[x]) ? `<a href="${encode(params[x])}" target="_blank">${ encode(params[x])}</a>` : encode(params[x])}</td>
    </tr>`
    ).join('')}
    </tbody>
    </table>
    `;
};

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