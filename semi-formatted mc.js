const base64 = {
  encode(data) {
    if (typeof data !== 'string') {
      console.error('Error Code 2: Invalid data. The format is base64.encode("data").');
      return '';
    }
    return btoa(data);
  },

  decode(data) {
    if (typeof data !== 'string') {
      console.error('Error Code 2: Invalid data. The format is base64.decode("data").');
      return '';
    }
    return atob(data);
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
    return encodeURI(data);
  },

  decode(data) {
    if (typeof data !== 'string') {
      console.error('Error Code 2: Invalid data. The format is uri.decode("data").');
      return '';
    }
    return decodeURI(data);
  },

  component: {
    encode(data) {
      if (typeof data !== 'string') {
        console.error('Error Code 2: Invalid data. The format is uri.component.encode("data").');
        return '';
      }
      return encodeURIComponent(data);
    },

    decode(data) {
      if (typeof data !== 'string') {
        console.error('Error Code 2: Invalid data. The format is uri.component.decode("data").');
        return '';
      }
      return decodeURIComponent(data);
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

const _0x5060f3=_0x2a50;function _0x2deb(){const _0x3b1fb3=['4373770sYtAeH','<h1','<ol','</h6','Error\x20code\x201:\x20MC\x20not\x20found','innerHTML','<li','replace','<link\x20rel=\x22stylesheet\x22\x20href=\x22https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css\x22</head','11923960SyqlUr','1118405TvRBPO','81QFzgdJ','<nav','</ol','<body','</figcaption','2330FDIcnM','<img\x20loading=\x22lazy\x22','<h3','38856bFjqns','getElementById','</div','<blockquote','error','</figure','545IIfsSo','</h5','<h2','</nav','</strong','<hr','</h3','6191016LWJuwU','outerHTML','<ul','<div','<h6','3843uyUAwu','</h1','<figure','</ul','</h4','</title','<br','<strong','6880307WHIANv','</a','<h5','</blockquote','\x20<script\x20defer\x20src=\x22https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js\x22\x20crossorigin=\x22anonymous\x22</script><script\x20defer\x20src=\x22https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js\x22crossorigin=\x22anonymous\x22</script>\x0a\x20\x20\x20\x20\x20\x20<style>body\x20{\x0a\x20\x20background:\x20linear-gradient(to\x20bottom\x20right,\x0a\x20\x20\x20\x20#f0f0f0,#f1f1f1,#f2f2f2,#f3f3f3,#f4f4f4,#f5f5f5,\x20#f6f6f6,\x20#f7f7f7,\x20#f8f8f8,\x20#f9f9f9,\x20\x0a\x20\x20\x20\x20#fafafa,\x20#fbfbfb,\x20#fcfcfc,\x20#fdfdfd,\x20#fefefe,\x20#ffffff);min-height:\x20100vh;\x0a}\x0a</style></body','</li','<head'];_0x2deb=function(){return _0x3b1fb3;};return _0x2deb();}(function(_0x157382,_0x522896){const _0x3d6a9a=_0x2a50,_0x54eda7=_0x157382();while(!![]){try{const _0x33fc95=-parseInt(_0x3d6a9a(0x87))/0x1+-parseInt(_0x3d6a9a(0x8d))/0x2*(parseInt(_0x3d6a9a(0xa2))/0x3)+parseInt(_0x3d6a9a(0x90))/0x4*(-parseInt(_0x3d6a9a(0x96))/0x5)+parseInt(_0x3d6a9a(0x9d))/0x6+parseInt(_0x3d6a9a(0xaa))/0x7+-parseInt(_0x3d6a9a(0xba))/0x8+parseInt(_0x3d6a9a(0x88))/0x9*(parseInt(_0x3d6a9a(0xb1))/0xa);if(_0x33fc95===_0x522896)break;else _0x54eda7['push'](_0x54eda7['shift']());}catch(_0xb24380){_0x54eda7['push'](_0x54eda7['shift']());}}}(_0x2deb,0xc11ff));function _0x2a50(_0x5676d4,_0x4f54f3){const _0x2deb2a=_0x2deb();return _0x2a50=function(_0x2a50e0,_0x471bb9){_0x2a50e0=_0x2a50e0-0x87;let _0x28e5b6=_0x2deb2a[_0x2a50e0];return _0x28e5b6;},_0x2a50(_0x5676d4,_0x4f54f3);}function MCmain(){const _0x3ac83b=_0x2a50,_0x414c31=document[_0x3ac83b(0x91)]('mc');if(!_0x414c31){console[_0x3ac83b(0x94)](_0x3ac83b(0xb5));return;}let _0x2eb55f=_0x414c31[_0x3ac83b(0x9e)][_0x3ac83b(0xb8)](/<xlheading/gi,_0x3ac83b(0xb2))['replace'](/<\/xlheading/gi,_0x3ac83b(0xa3))[_0x3ac83b(0xb8)](/<lheading/gi,_0x3ac83b(0x98))['replace'](/<\/lheading/gi,'</h2')[_0x3ac83b(0xb8)](/<mheading/gi,_0x3ac83b(0x8f))[_0x3ac83b(0xb8)](/<\/mheading/gi,_0x3ac83b(0x9c))[_0x3ac83b(0xb8)](/<sheading/gi,'<h4')[_0x3ac83b(0xb8)](/<\/sheading/gi,_0x3ac83b(0xa6))[_0x3ac83b(0xb8)](/<xsheading/gi,_0x3ac83b(0xac))[_0x3ac83b(0xb8)](/<\/xsheading/gi,_0x3ac83b(0x97))[_0x3ac83b(0xb8)](/<xxsheading/gi,_0x3ac83b(0xa1))[_0x3ac83b(0xb8)](/<\/xxsheading/gi,_0x3ac83b(0xb4))[_0x3ac83b(0xb8)](/<listitem/gi,_0x3ac83b(0xb7))[_0x3ac83b(0xb8)](/<\/listitem/gi,_0x3ac83b(0xaf))[_0x3ac83b(0xb8)](/<bulletedlist/gi,_0x3ac83b(0x9f))[_0x3ac83b(0xb8)](/<\/bulletedlist/gi,_0x3ac83b(0xa5))[_0x3ac83b(0xb8)](/<numberedlist/gi,_0x3ac83b(0xb3))[_0x3ac83b(0xb8)](/<\/numberedlist/gi,_0x3ac83b(0x8a))[_0x3ac83b(0xb8)](/<anchor/gi,'<a')['replace'](/<\/anchor/gi,_0x3ac83b(0xab))[_0x3ac83b(0xb8)](/<image/gi,_0x3ac83b(0x8e))[_0x3ac83b(0xb8)](/<\/image/gi,'')[_0x3ac83b(0xb8)](/<info/gi,_0x3ac83b(0xb0))['replace'](/<\/info/gi,_0x3ac83b(0xb9))[_0x3ac83b(0xb8)](/<browsertitle/gi,'<title')[_0x3ac83b(0xb8)](/<\/browsertitle/gi,_0x3ac83b(0xa7))['replace'](/<content/gi,_0x3ac83b(0x8b))['replace'](/<\/content/gi,_0x3ac83b(0xae))[_0x3ac83b(0xb8)](/<guide/gi,_0x3ac83b(0x89))[_0x3ac83b(0xb8)](/<\/giuide/gi,_0x3ac83b(0x99))[_0x3ac83b(0xb8)](/<media/gi,_0x3ac83b(0xa4))[_0x3ac83b(0xb8)](/<\/media/gi,_0x3ac83b(0x95))[_0x3ac83b(0xb8)](/<mediacap/gi,'<figcaption')['replace'](/<\/mediacap/gi,_0x3ac83b(0x8c))[_0x3ac83b(0xb8)](/<quote/gi,_0x3ac83b(0x93))[_0x3ac83b(0xb8)](/<\/quote/gi,_0x3ac83b(0xad))['replace'](/<bold/gi,_0x3ac83b(0xa9))['replace'](/<\/bold/gi,_0x3ac83b(0x9a))['replace'](/<division/gi,_0x3ac83b(0xa0))[_0x3ac83b(0xb8)](/<\/division/gi,_0x3ac83b(0x92))[_0x3ac83b(0xb8)](/<marker/gi,'<span')['replace'](/<\/marker/gi,'</span')['replace'](/<linebreak/gi,_0x3ac83b(0x9b))[_0x3ac83b(0xb8)](/<\/linebreak/gi,'')[_0x3ac83b(0xb8)](/<break/gi,_0x3ac83b(0xa8))['replace'](/<\/break/gi,'')[_0x3ac83b(0xb8)](/<keyboard/gi,'<kbd')[_0x3ac83b(0xb8)](/<\/keyboard/gi,'</kbd')[_0x3ac83b(0xb8)](/<paragraph/gi,'<p')['replace'](/<\/paragraph/gi,'</p')['replace'](/<script/gi,'<script\x20defer');_0x414c31[_0x3ac83b(0xb6)]=_0x2eb55f;}document[_0x5060f3(0x91)]('mc')&&MCmain();