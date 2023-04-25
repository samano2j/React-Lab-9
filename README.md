# Introduction to Redux

- Learn about Flux
- Understand the differences between Redux and Flux.
- Learn about the different redux terminologies used.
- Learn about the general concepts required.
- Learn how Redux complements React

## Flux
Flux is like a big plan for how to make things on the application. It's not just one thing, it's a bunch of ideas all together. Flux is different from other plans like MVC and MVVM because it makes things go in just one direction instead of going back and forth. It's like a river that only flows one way. That's what Flux does on the application

![Unidirectional Flow](https://i.gyazo.com/5ddc9806c505c2ca4cf46de1749dc798.png)

In Flux, events are managed one at a time in a circular flow with several actors: dispatcher, stores, and actions.

- An action is a structure that describes any change in the system: mouse clicks, timeout events, etc.
- Actions are sent to a dispatcher. A dispatcher is a single point in the system where anyone can submit an action for handling.
- Stores hold parts of the application state for maintenance and react to commands from the dispatcher.

![Flux Flow](https://i.gyazo.com/6328bb60a6d268e33f086974ed993f5c.png)

Here is the simplest Flux flow:

1. Stores subscribe to a subset of actions.
2. An action is sent to the dispatcher.
3. The dispatcher notifies subscribed stores of the action.
4. Stores update their state based on the action.
5. The view updates according to the new state in the stores.
6. The next action can then be processed.

This flow ensures that it’s easy to reason about how actions flow in the system, what will cause the state to change, and how it will change.

## Redux and Flux

While Redux derives from Flux concepts, there are a few distinctions between the two architectures.

In contrast to Flux, Redux only has a single `store` that holds no logic by itself. The store dispatches and handles `Actions` directly, eliminating the need for a standalone dispatcher. In turn, the store passes the actions to state-changing functions called `reducers`.

![Dispatcher vs. Reducer](https://i.gyazo.com/b8d4cdc105a13686d13b03e4d2d7630e.png)

#### Application data
While many other frameworks divide the data between different services and areas, in Redux, we keep all our data in a central repository accessible by all parts of the UI.

#### Changing the data
So, we have this thing called data that we keep in a special place in our application. We need to be careful about changing it because if too many parts of the program can change it directly, it might be hard to keep track of what's going on.

In Redux, they came up with a way to make changing the data easier. They made a special message called an `action` that describes what change we want to make. Then, the program takes that message and uses it to figure out what the new data will look like. They call this special place where we keep our data the `store`. But, to figure out how to change the data, we need to use something called a `reducer`.

#### Updating the UI
Each UI framework using Redux (React, Angular, etc.) is responsible for subscribing to the store to listen to its “store updated” events and updating the UI accordingly.

The core concept of Redux is that our UI always reflects the state of the application in the store. Sending an action will cause our store to use our reducers to calculate a new state and notify the UI layer to update the UI accordingly.

![Redux Overview](https://i.gyazo.com/8d8e8484111defe4f877531ba40dc4c4.png)

## Redux Terminology

#### Actions and action creators
The only way for an application to change its state is by processing `actions`.

In most cases, actions in Redux are nothing more than plain JavaScript objects passed to the `store` that holds all the information needed for the `store` to be able to modify the state:

```bash
//Example of an action object
{
  type: 'INCREMENT',
  payload: {
    counterId: 'main',
    amount: -10
  }
}
```

These objects are commonly wrapped in a `function` that can generate the objects based on a parameter because they often contain logic that can be used in multiple places in an application:

```bash
//function that generates an object
function incrementAction(counterId, amount) {
  return {
    type: 'INCREMENT',
    payload: {
      counterId,
      amount
    }
  };
};
```

As these functions create action objects, they are aptly named `action creators`.

#### Reducers
When a `store` receives an action, the `store` must figure out how to change the state accordingly. To do so, it calls a function, passing it the current state and the received `action`:

```bash
//A function that calculates the next state
function calculateNextState(currentState, action) {
  ...
  return nextState;
}
```

This function is called a `reducer`. In real Redux applications, there will be one **root reducer** function that will call additional reducer functions to calculate the nested state:

```bash
//A simple reducer implementation
function rootReducer(state, action) {
  switch (action.type) {

    case 'INCREMENT':
      return Object.assign({}, state, {
        counter: state.counter + action.payload.amount
      });

    default:
      return state;
  }
}
```

This sample reducer copies the original state into a new JavaScript object and overwrites the `counter` key with an updated value. The reducer does not change the original `state` parameter passed to it, keeping it immutable.

> Note: Reducers never modify the original state; they always create a new copy with the needed modifications.

![Redux Overview](https://i.gyazo.com/08b4409e524b8753f925464bc4bde8bb.png)

#### Middleware
Middleware are the most powerful and versatile entities in Redux because they have has access to the actions, the `dispatch()` function, and the `store`. Middleware acts like interceptors for actions. Before reaching the `store`, middleware can modify, create, and suppress actions.

#### Store
Unlike many other Flux implementations, Redux has a single `store` that holds the application information but no user logic. The role of the `store` is to receive actions, pass them through all the registered middleware, and then use reducers to calculate a new state and save it.

When a shift in the state is made, the `store` will receive an action and in turn notify all registered listeners of the change. This allows various parts of the system, like the UI, to update themselves according to the new state.

## General Concepts

Redux is all about functional programming and pure functions. Understanding these concepts is crucial to understanding the underlying principles of Redux.

Functional programming centers around avoiding changing state and mutable data—in other words, making your code predictable and free of side effects.

JavaScript allows you to write code in a functional style, as it treats functions as first-class objects (You can store functions in variables, pass them as arguments to other functions, and return them as values of other functions). However, JavaScript was not designed to be a functional programming language, so there are some caveats that you will need to keep in mind.

#### Pure and impure functions
A **pure function** returns values by using only its arguments: it uses no additional data, changes no data structures, touches no storage, and emits no external events (like network calls). This means that you can be completely sure that you will always get the same result every time you call the function with the same arguments. Here is an example of pure functions:

```bash
// Example of pure functions
function square(x) {
  return x * x;
}
y = square(4)
console.log("The square of 4 is", y) //The square of 4 is 16
```

If a function uses any variables not passed in as arguments or creates side effects, the function is **impure**. When a function depends on variables or functions outside of its lexical scope, you can never be sure that the function will behave the same every time it’s called. For example, the following is an impure function:

```bash
// Example of impure functions
function rand() {
  return Math.random();
}
y = rand()
console.log("Random number is", y)
```

#### Mutating Objects
Another important concept that often causes headaches for developers starting to work with Redux is **immutability**. JavaScript has limited tooling for managing immutable objects, and we are often required to use external libraries.

Immutability means that something can’t be changed, guaranteeing developers that it will have the same properties and values forever if you create an object. For example, let’s declare a simple object as a constant:

```bash
// An object defined as a constant in JavaScript
const colors = {
  red: '#FF0000',
  green: '#00FF00',
  blue: '#0000FF'
};

console.log("Previous Value ", colors);

colors.red = '#FFFFFF';
console.log("New Value ", colors);
```

Even though the `colors` object is a constant, we can still change its content, as `const` will only check if the *reference* to the object has changed. To make the `colors` object appear immutable, we can use the `Object.freeze()` method:

The value of the `red` property will now be `'#FFFFFF'` since we have already updated the value.

```bash
// An object defined as a constant in JavaScript
const colors = {
  red: '#FF0000',
  green: '#00FF00',
  blue: '#0000FF'
};

console.log("Previous Value ", colors);

colors.red = '#FFFFFF';
console.log("New Value ", colors);

Object.freeze(colors);

colors.red = '#000000';

console.log("Value after freezing ", colors);
```

Here, once we used `Object.freeze()`, the `colors` object became immutable. In practice, things are often more complicated, though. JavaScript does not provide good native ways to make data structures fully immutable. For example, `Object.freeze()` won’t freeze nested objects:

```bash
// Object.freeze() does not freeze nested objects

const orders = {
  bread: {
    price: 10
  },
  milk: {
    price: 20
  }
};

Object.freeze(orders);

orders.milk.price -= 15;

console.log("Price of Milk", orders.milk.price);
```

To work around the nature of our beloved language, we have to use third-party libraries like **deep-freeze**, **seamless-immutable**, or **Immutable.js**.


---
## Gist Dummy Data

```bash
{
	"snackData": [
		{ "id": 1, "food": "Doritos", "quantity": 10 },
		{ "id": 2, "food": "Cheetos", "quantity": 5 },
		{ "id": 3, "food": "Chips Ahoy", "quantity": 2 },
		{ "id": 4, "food": "Kit Kat", "quantity": 8 },
		{ "id": 5, "food": "Senbei", "quantity": 6 }
	],
	"drinksData": [
		{ "id": 1, "name": "Gatorade", "quantity": 5 },
		{ "id": 2, "name": "Coke", "quantity": 2 },
		{ "id": 3, "name": "Pokka", "quantity": 11 },
		{ "id": 4, "name": "Poccari", "quantity": 8 },
		{ "id": 5, "name": "Schweppes", "quantity": 9 }
	]
}
```

---
> *Note*:
One part of Redux is called "useSelector()" and it basically means that when something in the app changes, like a button being clicked, this function will automatically check to see if anything needs to be updated based on that change.<br>
If there is something that needs to be updated, the function will tell the app to redraw or "re-render" that part of the app with the new information.<br>
And one important thing to know is that the function uses something called "strict === reference equality checks" to compare the old and new information, which just means it's really careful about checking if something has actually changed before updating it.