import { useState } from "react";
import { Title } from "./Title";
import menuData from "./data";
import Menu from "./Menu";
import Categories from "./Categories";

// const tempCategories = menuData.map((item) => item.category.toLowerCase());
// const categories = new Set(tempCategories);
// const tempItems = ["all", ...categories];

const allCategories = [
  "all",
  ...new Set(menuData.map((item) => item.category.toLowerCase())),
];

const App = () => {
  const [menu, setMenu] = useState(menuData);
  const [categories, setCategories] = useState(allCategories);

  const filterItems = (category) => {
    if (category === "all") {
      setMenu(menuData);
      return;
    }
    const newItems = menuData.filter((item) => item.category === category);
    setMenu(newItems);
  };

  return (
    <main>
      <section className="menu">
        <Title text="our menu" />
        <Categories categories={categories} filterItems={filterItems} />
        <Menu items={menu} />
      </section>
    </main>
  );
};
export default App;
