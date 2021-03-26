# either-ts

Either-ts is a light typescript library created to help developers to use main set of functional programming patterns. Borned to be _SIMPLE!_

# Table of contents

1. [Installation](#installation)
2. [Documentation](#documentation)

Documentation

# Installation

```sh
npm install @luizcgr/either-ts
```

or

```sh
yarn add @luizcgr/either-ts
```

# Documentation

## Either class

### isRight

Return's true value if the object contains a right value.

```typescript
const eitherResult = doAnything()
if (eitherResult.isRight()) {
  // do something
}
```

### isLeft

Return's true value if the object contains a left value.

```typescript
const eitherResult = doAnything()
if (eitherResult.isLeft()) {
  // do something
}
```

### fold

Fold's the either object in two parts: left or right.

```typescript
const eitherResult = doAnything() // Left - SomeError | Right - string
eitherResult.fold(
  (err) => console.log(err.message), // err is an instance of SomeError class indicated in left either part
  (doc) => console.log(doc), // doc is an instance of string class indicated in right either part
)
```

Is possible indicate the fold return using the generic notation.

```typescript
/**
 * If the query result is right and return's a number greater than 10, the function must return true.
 * If the query result is left, the function must return false.
 */
function exists(): boolean {
  const eitherResult = countAnything() // Left - SomeError | Right - number
  eitherResult.fold<boolean>(
    (err) => false,
    (count) => count > 10,
  )
}
```

### getRight

Returns the right part of Either object if the object represets right result.

```typescript
const eitherResult = doAnything() // Left - AnyhingError | Right - number
const result = eitherResult.getRight() // Extracts the right value
console.log(result) // number value
```

### getLeft

Returns the left part of Either object if the object represets left result.

```typescript
const eitherResult = doAnything() // Left - AnyhingError | Right - number
const result = eitherResult.getRight() // Extracts the right value
console.log(result) // AnythingError object
```

### right and left functions

Creates new instance of Either with a right or left value.

```typescript
function doAnything(number value): Either<Error, boolean> {
  if (value > 10) {
    return right(value)
  }
  return left(Error('Incorrect value'))
}
```
