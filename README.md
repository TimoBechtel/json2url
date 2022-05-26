# json2url

Encodes and decodes JavaScript objects into/from an URL usable string

**✨[Demo](https://timobechtel.github.io/json2url/)**


## Motivation

The goal was to create URLs as small as possible by using a template approach.
If don't care about the length of the url, you can just use something simpler like this:

```js
const serialize = obj => encodeURIComponent(JSON.stringify(obj));
const deserialize = str => JSON.parse(decodeURIComponent(str));
```

Otherwise, read on.

## Getting Started

### Installing

#### NPM:

```
npm i json2url
```

#### CDN:

```html
<script src="https://unpkg.com/json2url/dist/index.umd.js"></script>
```

#### Locally:

Download <https://unpkg.com/json2url/dist/index.umd.js> and link it in your html.

### Using

#### Example

```html
<input type="range" id="a" value="0" />
<input type="range" id="b" value="0" />
<input type="range" id="c" value="0" />
<input type="range" id="d" value="0" />

<button onclick="serialize()">Serialize</button>
<textarea id="out" cols="30" rows="10"></textarea>

<script src="https://unpkg.com/json2url/dist/index.umd.js"></script>
<script>
  const template = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
  };
  const config = { ...template };

  const inputIds = ['a', 'b', 'c', 'd'];

  window.addEventListener('load', () => {
    inputIds.forEach((id) => {
      document.getElementById(id).addEventListener('change', (e) => {
        config[id] = e.target.value;
      });
    });
  });

  function serialize() {
    const serialized = json2Url.serialize(config);
    document.getElementById('out').value = serialized;
    console.log(json2Url.deserialize(serialized, template));
  }
</script>
```

## Testing

```
npm run test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
