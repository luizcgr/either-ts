# either-ts

Either-ts is a light typescript library created to help developers to use main set of functional programming patterns. Borned to be _SIMPLE!_

# Table of contents

1. [Installation](#installation)
2. [Documentation](#documentation)

# Installation

```sh
npm install @luizcgr/either-ts
```

or

```sh
yarn add @luizcgr/either-ts
```

# Documentation

## Either object

### isRight

True if the object represents the right part of Either object.

```typescript
const eitherResult = doAnything()
if (eitherResult.isRight()) {
  // do something
}
```

### isLeft

True if the object represents the left part of Either object.

```typescript
const eitherResult = doAnything()
if (eitherResult.isLeft()) {
  // do something
}
```

### fold

Folds the Either object in two parts: left and right.

```typescript
const eitherResult = doAnything() // Left - SomeError | Right - string
eitherResult.fold(
  (err) => console.log(err.message), // err is an instance of SomeError class indicated in left either part
  (doc) => console.log(doc), // doc is an instance of string class indicated in right either part
)
```

Is possible indicate the fold return using generics notation.

```typescript
/**
 * If the query result is right and returns a number greater than 10, the function must return true.
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
const eitherResult = doAnything() // Left - SomeError | Right - number
const result = eitherResult.getRight() // Extracts the right value
console.log(result) // number value
```

### getLeft

Returns the left part of Either object if the object represets left result.

```typescript
const eitherResult = doAnything() // Left - SomeError | Right - number
const result = eitherResult.getRight() // Extracts the right value
console.log(result) // SomeError object
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

## EitherP object

Encapsulates a promise of Either. See the complete example below. The main goal is simplify the function declaration reducing the code verbosity.

SearchUserByLogin class makes a direct call to users repository. Instead of re-throw the error, the function returns the Either (left ou right) object that will be analyzed by the caller.

```typescript
export class SearchUserByLogin {
  constructor(private _userRepository: UserRepository) {}

  async find(login: string): EitherP<UserError, User> {
    // EitherP<UserError, User> === Promise<Either<UserError, User>>
    try {
      const eitherResult = await this._userRepository.findByLogin(login)
      return eitherResult<EitherP<UserError, User>>(
        (err) => left(new UserError('User not found')),
        (user) => right(user),
      )
    } catch (err) {
      return left(new UserError('Connection error'))
    }
  }
}
```

The caller function will treat the result.

```typescript
const searchUserByLogin = ... // inject an SearchIserByLogin instance
const eitherResult = await searchUserByLogin.find('logan')
eitherResult.fold(
  err => res.status(400).json({error: err.message}),
  user => res.status(200).json(user)
)
```
