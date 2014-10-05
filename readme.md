<h1 align="center">
async-flat-map
<br>
<a href="https://travis-ci.org/quarterto/async-flat-map"><img alt="Build Status" src="https://travis-ci.org/quarterto/async-flat-map.svg"></a>
</h1>

Like `flatMap`, but asynchronous.

## API
#### ∀ a, b. (a → (Error → [b] → ()) → ()) → [a] → (Error → [b] → ())

Exits early on error. Collects and concats array results. Runs in parallel. Maintains result order.

## Licence
MIT
