# 1-basics

AI tool: ChatGPT

## Prompt 1

Explain 10 core concepts of React with example codes.

## Answer 1

1. JSX:<br>
   JSX is a syntax extension of JavaScript which allows us to write HTML-like code in our JavaScript files. It helps us to write code in a more intuitive and readable way. JSX is not a requirement for writing React, but it makes things simpler. Here is an example of how JSX looks like:

```javascript
const element = <h1>Hello, world!</h1>;
```

2. Components<br>
   Components are the building blocks of any React application. A component can be a simple reusable piece of UI or a complex container that has multiple child components. We can define components as functions or classes. Here is an example of a functional component:

```javascript
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

<Greeting name="React" />;
```

3. Props<br>
   Props (short for properties) are the way we pass data from a parent component to a child component. They are read-only and cannot be modified by the child component. Here is an example of how props are passed from a parent component to a child component:

```javascript
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

function App() {
  return <Greeting name="React" />;
}
```

4. State:<br>
   State is an object that holds data that can change over time. It is used to store data that is local to a component and is not passed down from a parent component. We can change the state of a component using the setState method. Here is an example of how state is used in a class component:

```javascript
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}
```

5. Lifecycle methods:<br>
   Lifecycle methods are methods that get called at different stages of a component's lifecycle. They are useful for performing actions such as setting up or tearing down a component, fetching data, or updating the state. Here is an example of how the componentDidMount method is used to fetch data when a component mounts:

```javascript
class DataFetcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  async componentDidMount() {
    const response = await fetch(this.props.url);
    const data = await response.json();
    this.setState({ data });
  }

  render() {
    return (
      <div>
        {this.state.data ? <p>{this.state.data}</p> : <p>Loading...</p>}
      </div>
    );
  }
}
```

6. Event handling:<br>
   React provides a way to handle events such as onClick, onSubmit, onChange, etc. by using event handlers. We can define event handlers as methods in our components and pass them down to child components as props. Here is an example of how an onClick event handler is used to increment a counter:

```javascript
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.handleClick()}>Increment</button>
      </div>
    );
  }
}
```

7. Conditional rendering:<br>
   Conditional rendering is the way we conditionally display content in our components. We can use if statements,ternary operators, or logical && operators to conditionally render content. Here is an example of how conditional rendering using a ternary operator:

```javascript
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  return isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please log in.</h1>;
}

<Greeting isLoggedIn={true} />;
```

8. Lists and Keys:<br>
   Lists and keys are used when we want to render a collection of items. We can use the map method to loop through an array and render a list of items. We also need to assign a unique key to each item in the list to help React identify which items have changed. Here is an example of how to render a list of items using the map method:

```javascript
function TodoList(props) {
  const todos = props.todos;
  const listItems = todos.map((todo) => <li key={todo.id}>{todo.text}</li>);
  return <ul>{listItems}</ul>;
}

const todos = [
  { id: 1, text: "Buy milk" },
  { id: 2, text: "Do laundry" },
  { id: 3, text: "Walk the dog" },
];

<TodoList todos={todos} />;
```

9. Hooks:<br>
   Hooks are a way to use state and other React features in functional components. They were introduced in React 16.8 and allow us to use state and lifecycle methods in functional components. Here is an example of how the useState hook is used to manage state in a functional component:

```javascript
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

10. Context:<br>
    Context is a way to pass data down the component tree without having to pass props down manually at every level. Context provides a way to share data between components without having to use props. Here is an example of how to create a context and use it in a child component:

```javascript
import React, { createContext, useContext } from "react";

const ThemeContext = createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Header />
    </ThemeContext.Provider>
  );
}

function Header() {
  const theme = useContext(ThemeContext);
  return (
    <h1 style={{ color: theme === "light" ? "black" : "white" }}>
      Hello, world!
    </h1>
  );
}
```

## Prompt 2

Explain the 3 most commonly used Hooks in React with examples, and explain your examples line-by-line.

## Answer 2

In React, Hooks are functions that allow you to use state and other React features inside functional components. There are several hooks available in React, but the three most commonly used ones are useState, useEffect, and useContext.

1. useState Hook:<br>
   The useState hook allows you to add state to functional components. It returns an array with two values: the current state and a function to update the state. You can use array destructuring to extract these values.
   Example:

```javascript
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

In the above example, we are creating a functional component named Counter that uses the useState hook to manage state. The useState hook is called inside the component, passing 0 as the initial state value. We are destructuring the returned array into two variables: count and setCount. We are then rendering the count value inside a paragraph element, and adding a button that updates the state when clicked. The setCount function takes a new value, which is the current count value plus one.

2. useEffect Hook:<br>
   The useEffect hook allows you to perform side effects in functional components. It runs after every render by default, but you can control when it runs by passing a second argument to the hook. This argument is an array of values that the hook depends on. If any of these values change, the hook runs again.
   Example:

```javascript
import React, { useState, useEffect } from "react";

function TitleUpdater() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

In the above example, we are creating a functional component named TitleUpdater that uses the useState and useEffect hooks. The useState hook is used to manage the count state, just like in the previous example. The useEffect hook is used to update the document title every time the count state changes. We are passing an array with the count variable as the second argument to the useEffect hook. This ensures that the hook only runs when the count variable changes.

3. useContext Hook:<br>
   The useContext hook allows you to consume a context in functional components. Context provides a way to share data between components without having to pass props down through every level of the component tree.
   Example:

```javascript
import React, { useContext } from "react";

const ThemeContext = React.createContext("light");

function ThemedButton() {
  const theme = useContext(ThemeContext);

  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}

function App() {
  return (
    <ThemeContext.Provider value={{ background: "dark", foreground: "white" }}>
      <ThemedButton />
    </ThemeContext.Provider>
  );
}
```

In the above example, we are creating a context named ThemeContext using the createContext function. We are then creating a functional component named ThemedButton that uses the useContext hook to consume the ThemeContext.
The useContext hook takes the ThemeContext object as its argument and returns its current value. In the ThemedButton component, we are using the theme value to style the button element. We are setting the background and color styles to the background and foreground properties of the theme object, respectively.

In the App component, we are wrapping the ThemedButton component inside a ThemeContext.Provider component. The Provider component takes a value prop that sets the current value of the context. In this case, we are setting the value to an object with background and foreground properties to apply a dark theme to the button.

Overall, these three hooks are very powerful and useful in creating functional components with state and side effects. The useState hook allows you to add state to functional components, the useEffect hook allows you to perform side effects, and the useContext hook allows you to consume a context. By using these hooks, you can create more flexible and reusable components in your React applications.

## Problems Found

ChatGPT will automatically stop when reaching a length limit. How to prompt ChatGPT to ouput complete texts no matter how long the text is.
