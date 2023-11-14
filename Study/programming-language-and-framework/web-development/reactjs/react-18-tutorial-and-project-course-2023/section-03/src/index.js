import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// function Greeting() {
//   return <h2>My First Component</h2>;
// }

// function Greeting() {
//   return React.createElement("h2", {}, "hello world");
// }

// function Greeting() {
//   return (
//     <div>
//       <h2>My First Component</h2>
//     </div>
//   );
// }

// function Greeting() {
//   return React.createElement(
//     "div",
//     {},
//     React.createElement("h2", {}, "My First Component")
//   );
// }

// function Greeting() {
//   return (
//     <div>
//       <h3>Hello people</h3>
//       <ul>
//         <li>
//           <a href="#">Hello world</a>
//         </li>
//       </ul>
//     </div>
//   );
// }

// function Greeting() {
//   return (
//     <div>
//       <Person />
//       <Message />
//     </div>
//   );
// }

// const Person = () => <h2>John Doe</h2>;
// const Message = () => {
//   return <p>This is my message</p>;
// };

function BookList() {
  return (
    <section className="booklist">
      <Book />
    </section>
  );
}

const Book = () => {
  return (
    <article className="book">
      <Image />
      <Title />
      <Author />
    </article>
  );
};

const Image = () => (
  <img src="https://images-na.ssl-images-amazon.com/images/I/61KI7oL-u9L._AC_UL450_SR450,300_.jpg" />
);
const Title = () => <h2>The Woman in Me</h2>;
const Author = () => {
  return <h4>Britney Spears</h4>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<BookList />);
