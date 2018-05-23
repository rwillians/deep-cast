'use strict'

module.exports = (fields) => (value) => {
  if (!value || ![ 'Object', 'Array' ].includes((value).constructor.name)) {
    return value
  }

  const deeper = (data, paths, fn) => {
    const [ path, ...remainingPaths ] = paths

    if (Array.isArray(data)) {
      return data.map(item => deeper(item, paths, fn))
    }

    if (!(path in data)) {
      return data
    }

    const nodeValue = data[path]

    if (remainingPaths.length > 0) {
      return Object.assign({ ...data}, {
        [path]: deeper(nodeValue, remainingPaths, fn)
      })
    }

    return Object.assign({ ...data }, { [path]: fn(nodeValue) })
  }

  let data = Array.isArray(value)
    ? [ ...value ]
    : { ...value }

  Object.keys(fields).forEach(field => {
    data = deeper(data, field.split('.'), fields[field])
  })

  return data
}
