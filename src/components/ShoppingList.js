
import React, { useState, useEffect } from "react";
import Item from "./Item";
import ItemForm from "./ItemForm";
import Filter from "./Filter";

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // ✅ Fetch items from the server (READ)
  useEffect(() => {
    let isMounted = true;

    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((items) => {
        if (isMounted) {
          setItems(items);
        }
      });

    return () => {
      isMounted = false; // ✅ cleanup prevents memory leak
    };
  }, []);

  // ✅ CREATE - Add a new item
  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  // ✅ UPDATE - Toggle inCart status
  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setItems(updatedItems);
  }

  // ✅ DELETE - Remove item
  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }

  // ✅ Filter items by category
  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        onCategoryChange={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
