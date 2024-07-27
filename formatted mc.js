const base64 = {
  encode(data) {
    if (typeof data !== 'string') {
      console.error('Error Code 2: Invalid data. The format is base64.encode("data").');
      return '';
    }try{return btoa(data);}
    catch(e){
      return data;
    }
  },

  decode(data) {
    if (typeof data !== 'string') {
      console.error('Error Code 2: Invalid data. The format is base64.decode("data").');
      return '';
    }
    try{return atob(data);}
    catch(e){
      return data;
    }
  }
};

const storage = {
  cookie: {
    setData(name, value, days) {
      if (typeof name !== 'string' || typeof value !== 'string' || (days && typeof days !== 'number')) {
        console.error('Error Code 2: Invalid data. The format is storage.cookie.setData("name","value",days).');
        return;
      }

      let expiry = '';
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expiry = '; expires=' + date.toUTCString();
      }

      const encodedValue = base64.encode(value || '');
      const encodedCookie = name + '=' + encodedValue + expiry + '; path=/';
      document.cookie = encodedCookie;
    },

    getData(name) {
      if (typeof name !== 'string') {
        console.error('Error Code 2: Invalid data. The format is storage.cookie.getData("name").');
        return 'No cookie found';
      }

      name = name + '=';
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(name)) {
          const encodedValue = cookie.substring(name.length);
          return base64.decode(encodedValue);
        }
      }
      return 'No cookie found';
    },

    eraseData(name) {
      if (typeof name !== 'string') {
        console.error('Error Code 2: Invalid data. The format is storage.cookie.eraseData("name").');
        return;
      }
      document.cookie = name + '=; Max-Age=-99999999;';
    }
  },

  local: {
    setData(key, value, expiryDays) {
      if (typeof key !== 'string' || typeof value !== 'string' || (expiryDays && typeof expiryDays !== 'number')) {
        console.error('Error Code 2: Invalid data. The format is storage.local.setData("key","value",expiryDays).');
        return;
      }

      const item = {
        value: base64.encode(value || ''),
        expiry: expiryDays ? new Date().getTime() + (expiryDays * 24 * 60 * 60 * 1000) : null
      };

      localStorage.setItem(key, JSON.stringify(item));
    },

    getData(key) {
      if (typeof key !== 'string') {
        console.error('Error Code 2: Invalid data. The format is storage.local.getData("key").');
        return 'No item found';
      }

      const item = JSON.parse(localStorage.getItem(key));
      if (!item) return 'No item found';

      if (item.expiry && new Date().getTime() > item.expiry) {
        localStorage.removeItem(key);
        return 'Item expired';
      }

      return base64.decode(item.value);
    },

    eraseData(key) {
      if (typeof key !== 'string') {
        console.error('Error Code 2: Invalid data. The format is storage.local.eraseData("key").');
        return;
      }
      localStorage.removeItem(key);
    }
  },

  session: {
    setData(key, value) {
      if (typeof key !== 'string' || typeof value !== 'string') {
        console.error('Error Code 2: Invalid data. The format is storage.session.setData("key","value").');
        return;
      }

      sessionStorage.setItem(key, value);
    },

    getData(key) {
      if (typeof key !== 'string') {
        console.error('Error Code 2: Invalid data. The format is storage.session.getData("key").');
        return 'No item found';
      }

      const item = sessionStorage.getItem(key);
      return item !== null ? item : 'No item found';
    },

    eraseData(key) {
      if (typeof key !== 'string') {
        console.error('Error Code 2: Invalid data. The format is storage.session.eraseData("key").');
        return;
      }
      sessionStorage.removeItem(key);
    }
  }
};

const uri = {
  encode(data) {
    if (typeof data !== 'string') {
      console.error('Error Code 2: Invalid data. The format is uri.encode("data").');
      return '';
    }
    try{return encodeURI(data);}catch(e){
      return data;
    }
  },

  decode(data) {
    if (typeof data !== 'string') {
      console.error('Error Code 2: Invalid data. The format is uri.decode("data").');
      return '';
    }
    try{return decodeURI(data);}catch(e){
      return data;
    }
  },

  component: {
    encode(data) {
      if (typeof data !== 'string') {
        console.error('Error Code 2: Invalid data. The format is uri.component.encode("data").');
        return '';
      }
      try{return encodeURIComponent(data);}catch(e){
        return data;
      }
    },

    decode(data) {
      if (typeof data !== 'string') {
        console.error('Error Code 2: Invalid data. The format is uri.component.decode("data").');
        return '';
      }
      try{return decodeURIComponent(data);}catch(e){
        return data;
      }
    }
  }
};

Object.prototype.toInteger = function() {
  const intOfMC = parseInt(this);
  if (isNaN(intOfMC)) {
    return "Not A Number";
  } else {
    return intOfMC;
  }
};

Object.prototype.toDecimal = function() {
  const floatOfMC = parseFloat(this);
  if (isNaN(floatOfMC)) {
    return "Not A Number";
  } else {
    return floatOfMC;
  }
};

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function MCmain() {
  const mcElement = document.getElementById("mc");
  if (!mcElement) {
    console.error("Error code 1: MC not found");
    return;
  }const findReplacePairs = [
    [/<xlheading/gi, "<h1"],
    [/<\/xlheading/gi, "</h1"],
    [/<lheading/gi, "<h2"],
    [/<\/lheading/gi, "</h2"],
    [/<mheading/gi, "<h3"],
    [/<\/mheading/gi, "</h3"],
    [/<sheading/gi, "<h4"],
    [/<\/sheading/gi, "</h4"],
    [/<xsheading/gi, "<h5"],
    [/<\/xsheading/gi, "</h5"],
    [/<xxsheading/gi, "<h6"],
    [/<\/xxsheading/gi, "</h6"],
    [/<listitem/gi, "<li"],
    [/<\/listitem/gi, "</li"],
    [/<bulletedlist/gi, "<ul"],
    [/<\/bulletedlist/gi, "</ul"],
    [/<numberedlist/gi, "<ol"],
    [/<\/numberedlist/gi, "</ol"],
    [/<anchor/gi, "<a"],
    [/<\/anchor/gi, "</a"],
    [/<image/gi, `<img loading="lazy"`],  
    [/<\/image/gi, "",],                       
    [/<info/gi, "<head"],                     
    [/<\/info/gi, ` <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"s crossorigin="anonymous"></head`],  // Standard head with Bootstrap
    [/<browsertitle/gi, "<title"],
    [/<\/browsertitle/gi, "</title"],
    [/<content/gi, `<body`],
    [/<\/content/gi, ` <script defer src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js"  crossorigin="anonymous"></script><script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-u3s5FVf6IVe4hnLCvbzqhNQUQIkft9yehEbrsrYqXJPBKUCzPraxofco1zleEjT" crossorigin="anonymous"></script>
    <style>body {
    background: linear-gradient(to bottom right,
      #f0f0f0,#f1f1f1,#f2f2f2,#f3f3f3,#f4f4f4,#f5f5f5, #f6f6f6, #f7f7f7, #f8f8f8, #f9f9f9, 
      #fafafa, #fbfbfb, #fcfcfc, #fdfdfd, #fefefe, #ffffff);min-height: 100vh;
  }
  </style></body`],  
    [/<guide/gi, "<nav"],
    [/<\/giuide/gi, "</nav"],
    [/<media/gi, "<figure"],
    [/<\/media/gi, "</figure"],
    [/<mediacap/gi, "<figcaption"],
    [/<\/mediacap/gi, "</figcaption"],
    [/<quote/gi, "<blockquote"],
    [/<\/quote/gi, "</blockquote"],
    [/<bold/gi, "<strong"],
    [/<\/bold/gi, "</strong"],
    [/<division/gi, "<div"],
    [/<\/division/gi, "</div"],
    [/<marker/gi, "<span"],
    [/<\/marker/gi, "</span"],
    [/<linebreak/gi, "<hr"],
    [/<\/linebreak/gi, ""],
    [/<break/gi, "<br"],
    [/<\/break/gi, ""],
    [/<keyboard/gi, "<kbd"],
    [/<\/keyboard/gi, "</kbd"],
    [/<paragraph/gi, "<p"],
    [/<\/paragraph/gi, "</p"],
    [/<script/gi, "<script defer"],
  ];
  
  let htmlBody = mcElement.outerHTML;
  
  // Efficiently perform replacements using a loop:
  try {
    for (const [find, replace] of findReplacePairs) {
      htmlBody = htmlBody.replace(find, replace);
    }
  } catch (error) {
    console.error("Error during replacements:", error);
  }
  
  mcElement.innerHTML = htmlBody;
}
if (document.getElementById("mc")) {
  MCmain();
}

document.getElementById('fileInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file && file.name.endsWith('.mc')) {
      const reader = new FileReader();
      reader.onload = function(e) {
          const content = e.target.result;
          processFileContent(content);
      };
      reader.readAsText(file);
  } else {
      console.error('Please upload a valid .mc file.');
  }
});

function processFileContent(content) {
  // Example of interpreting file content
  try {
      const parsedContent = JSON.parse(content);
  } catch (e) {
      console.error = 'Invalid file format.';
  }
}

