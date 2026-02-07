#### HTML

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link href="style.css" rel="stylesheet" type="text/css" />
  </head>

  <body>
    <button>
      <span class="container">
        <span class="mask"></span>
      </span>
      Book A Demo!
    </button>
  </body>
</html>
```

---

#### CSS

```css
button {
  cursor: pointer;
  border: 4px solid black;
  position: relative;
  border-radius: 10px;
  background: black;
  height: 70px;
  width: 240px;
  color: white;
  font-size: 24px;
  padding-left: 60px;
}

.container {
  border-radius: 6px;
  position: absolute;
  left: 0;
  top: 0;
  width: 60px;
  height: 62px;
  background-color: #d2ff4d;
  box-shadow: 0 10px 10px -5px #00000033;
  transition: width 0.2s ease-in-out;
  background-repeat: no-repeat;
  background-position: center;
}

.mask {
  mask: url('https://assets.codepen.io/605876/chev-mask.png');
  mask-repeat: no-repeat;
  position: absolute;
  inset: 0px;
  left: 6px;
  top: 6px;
  background: radial-gradient(#000, transparent);
  background-size: 500px;
  animation: fly 2s infinite;
}

button:is(:hover, :focus-visible) .container {
  width: 100%;
  background-repeat: repeat-x;
}

button:is(:hover, :focus-visible) .container .mask {
  mask-repeat: repeat-x;
}

button:is(:active) .container {
  transform: scale(0.95);
}

@keyframes fly {
  0% {
    background-position-x: 100%;
  }

  100% {
    background-position-x: 0%;
  }
}
```
