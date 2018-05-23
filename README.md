# deep-cast

Casts a given set o properties from a given object or array using a given callback.


## Usage

Test on [RunKit](https://runkit.com/rwillians/deepcast-sample).

```js
const { inspect } = require('util')
const dc = require("deep-cast")

const cast = dc({
  /**
   * Will parse the property at path 'a.c.d' to unix time.
   */
  'a.c.d': (value) => Date.parse(value),  
  /**
   * Nothing's going to happen to the property 'x.y.z' because it doesn't
   * exists.
   */
  'x.y.z': (value) => Date.parse(value)
})

const data1 = {
  a: {
    b: 235,
    c: {
      d: '2018-01-20T12:50:11.000Z',
      e: '55'
    }
  },
  f: 'foo'
}

const data2 = [{
  a: {
    b: 234,
    c: {
      d: '2018-01-20T12:50:11.000Z',
      e: '55'
    }
  },
  f: 'bar'
}]

const data3 = [{
  a: {
    b: 233,
    c: [
      {
        d: '2018-01-20T12:50:11.000Z',
        e: '55'
      },
      {
        d: '2018-01-20T12:50:11.000Z',
        e: '54'
      },
      {
        d: '2018-01-20T12:50:11.000Z',
        e: '53'
      }
    ]
  },
  f: 'baz'
}]

console.log('data1:', cast(data1))
console.log('data2:', cast(data2))
console.log('data3:', cast(data3))
```
