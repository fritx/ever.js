# ever.js

> Ever Simple, Ever Fast

Angular-like but templating library

## Brief

- Anuglar-like dom style
- No data-bindings here
- jQuery/Zepto based, make sure `.data()` is enabled
- Remember to handle style of `[m-cloak]`
- Use arrays to `[m-repeat]`


## Directives

- `m-app`: Outward scanning boundary
- `m-unit`: Template storing unit
- `m-cloak`: Tells a unit is not ready
- `m-repeat`: Repeats an item
- `m-text`: Sets the text content
- `m-with`: Sets a var scope


## Demo

```html
<style>[m-cloak]{display:none;}</style>

<div id="app" m-app>
  <div m-unit m-cloak>
    <h1 m-text="title"></h1>
    <ul>
      <li m-repeat="jobs"
        m-text="content + (completed ? ' √' : '')"></li>
    </ul>
  </div>
</div>

<script src="ever.js"></script>
```

```js
var todosData = {
  title: 'Todos',
  jobs: [
    {
      completed: false,
      content: 'Read the book'
    },
    {
      completed: true,
      content: 'Write the code'
    },
    {
      completed: false,
      content: 'Go to bed'
    }
  ]
}
$('#app').m(todosData)
```