# json2url

Encodes and decodes JavaScript objects into/from an URL usable string

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
    inputIds.forEach(id => {
      document.getElementById(id).addEventListener('change', e => {
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

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
