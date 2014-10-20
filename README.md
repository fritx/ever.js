# ever.js

> Ever Simple, Ever Fast

Angular-like but templating library

## Brief

- Anuglar-like dom style
- No data-bindings here
- jQuery/Zepto based, make sure `.data()` is enabled
- Remember to handle style of `[r-cloak]`
- Use arrays to `[r-repeat]`


## Directives

- `r-app`: Outward scanning boundary
- `r-unit`: Template storing unit
- `r-cloak`: Tells a unit is not ready
- `r-repeat`: Repeats an item
- `r-text`: Sets the text content
- `r-with`: Sets a var scope


## Demo

```html
<style>[r-cloak]{display:none;}</style>

<div id="app" r-app r-cloak>
  <div r-unit>
    <h1 r-text="title"></h1>
    <ul>
      <li r-repeat="jobs"
        r-text="content + (completed ? ' √' : '')"></li>
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
$('#app').ever(todosData)
```