# Svelte Intro Notes

## a11y callouts/warnings
Warnings will occur on compile to indicate issues with a11y.

## Updating arrays and objects
Inline updates require reassignment (numbers.push(5); numbers = numbers;) or else no changes will be detected so no dom update.

## prop declaration
Uses `export let propName = 'default value here';`
`<Component propName="new value here" />`

## html blocks
`{#if ...}` and `{/if}` are opening and closing blocks. `{:else}` and similar are continuation blocks between opening and closing blocks.

## inline event handlers
```html
<div on:mousemove="{({ clientX: x, clientY: y }) => m = { x, y }}">
	The mouse position is {m.x} x {m.y}
</div>
```

## Component event dispatch
```html
<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	function sayHello() {
		dispatch('message', { text: 'Hello!' });
	}
</script>

<button on:click={sayHello}>
	Click to say hello
</button>
```
```html
<Inner on:message={handleMessage}/>
```

### Bubble event
```html
<script>
	import Inner from './Inner.svelte';
</script>

<Inner on:message/>
```

## Bind
`<input bind:value={name}>`

Shorthand:
```html
<script>
	let value = `Some value here`;
</script>
<textarea bind:value />
```

## Lifecycle Methods
`onMount` - runs after the component is first rendered to the DOM. Typically used for data fetching.

`onDestroy` - runs after the component is destroyed. Used for clean up and memory leaks.

`beforeUpdate` - before DOM is updated with changes

`afterUpdate` - after DOM is updated (think auto scroll behavior)

`tick` - resolves (promise) when pending changes have been applied to DOM

## Stores
Subscribe to stores, or use auto-subscription:
```js
import { writable } from 'svelte/store';
export const count = writable(0);
```
```js
	import { count } from './stores.js';
	let countValue;
	count.subscribe(value => {
		countValue = value;
	});
```
```js
	import { count } from './stores.js';
	console.log($count); // $ used for shorthand subsribe. Gets value.
```

Read-only stores can be defined with:
```js
export const time = readable(null, function start(set) {
	const interval = setInterval(() => {
		set(new Date());
	});

	return function stop() { clearInterval(interval); };
});
```

## CSS class directive
```html
<button
	class:selected="{current === 'foo'}"
	on:click="{() => current = 'foo'}"
>foo</button>
```
`selected` class is applied when `current === 'foo'` (truthy)

Or shorthand:
```html
<script>
	$: selected = current === 'foo';
</script>
<button
	class:selected
	on:click="{() => current = 'foo'}"
>foo</button>
```

## CSS style directive
```html
<p 
	style:color="{color}" 
	style:--opacity="{bgOpacity}"
>
```

## Component Slots
Similar to React children.
```html
<div class="box">
	<slot></slot>
</div>
```
```html
<Box>
	<h2>Hello!</h2>
	<p>This is a box. It can contain anything.</p>
</Box>
```
You can also define defaults/fallbacks.
```html
<div class="box">
	<slot>
		<p>This is the default UI shown</p>
	</slot>
</div>
```

Slots can be named for controlled placements.
```html
<article class="contact-card">
	<h2>
		<slot name="name">
			<span class="missing">Unknown name</span>
		</slot>
	</h2>

	<div class="address">
		<slot name="address">
			<span class="missing">Unknown address</span>
		</slot>
	</div>

	<div class="email">
		<slot name="email">
			<span class="missing">Unknown email</span>
		</slot>
	</div>
</article>
```

### Checking slot content
We can check whether content was provided for a slot by using `$$slots`, like:
```html
{#if $$slots.comments}
	<div class="discussion">
		<h3>Comments</h3>
		<slot name="comments"></slot>
	</div>
{/if}
```

### Slot props
Slot props allow passing of data back to parent from slot.
```html
<div on:mouseenter={enter} on:mouseleave={leave}>
	<slot hovering={hovering}></slot>
</div>
```
```html
<Hoverable let:hovering={active}>
	<div class:active>
		{#if active}
			<p>I am being hovered upon.</p>
		{:else}
			<p>Hover over me!</p>
		{/if}
	</div>
</Hoverable>
```

## setContext and getContext
```js
setContext(key, {
	getMap: () => map
});
```
```js
import { getContext } from 'svelte';

const { getMap } = getContext(key);
const map = getMap();
```

> Contexts and stores seem similar. They differ in that stores are available to any part of an app, while a context is only available to a component and its descendants. This can be helpful if you want to use several instances of a component without the state of one interfering with the state of the others. In fact, you might use the two together. Since context is not reactive, values that change over time should be represented as stores.

## Special elements
`<svelte:self />` allows recursively rendering components (File directory can contain folders that render other folders).

`svelte:component` used for dynamically rendering different elements.
```html
<script>
	import RedThing from './RedThing.svelte';
	import GreenThing from './GreenThing.svelte';
	import BlueThing from './BlueThing.svelte';
	const options = [
		{ color: 'red',   component: RedThing   },
		{ color: 'green', component: GreenThing },
		{ color: 'blue',  component: BlueThing  },
	];
	let selected = options[0];
</script>
<svelte:component this={selected.component} />
```
`svelte:element` used similarly to `svelte:component`. Instead of Svelte components, html elements are used:
```html
<script>
	const options = ['h1', 'h3', 'p'];
	let selected = options[0];
</script>
<svelte:element this={selected}>I'm a {selected} tag</svelte:element>
```

`svelte:window` to add event listeners to the `window` object.
```html
<svelte:window on:keydown={handleKeydown}/>
```
`svelte:body` to add event listeners to `document.body`. Useful for `mouseenter` and `mouseleave`.
```html
<svelte:body
	on:mouseenter={handleMouseenter}
	on:mouseleave={handleMouseleave}
/>
```
`svelte:head` for inserting elements insead of `<head>` of the document.
```html
<svelte:head>
	<link rel="stylesheet" href="/tutorial/dark-theme.css">
</svelte:head>
```

`svelte:options` - element that allows you to specify compiler options for a component.
```html
<svelte:options immutable={true}/>
```

`<svelte:fragment>` allows content to be placed in a name slot without a container DOM element (like React fragment).


## Module context
`<script context="module">`
Code contained inside module context script will run once when the module first evaluates, rather when a component is instantiated. (Similar to static variables?)

It can also be used for (non-prop) exports from the module.
```html
<script context="module">
	const elements = new Set();

	export function stopAll() {
		elements.forEach(element => {
			element.pause();
		});
	}
</script>
```

## Debugging
Use `{@debug blah}` to debug when `blah` changes.

## HTML rendering
`{@html ...}` is used to render HTML using strings. `<p>{@html string}</p>`
