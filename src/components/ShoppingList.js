import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(" http://localhost:4000/items")
    .then(res => res.json())
    .then(data => setItems(data))
  }, [])

  function handleDeleteItem(deleteditem){
    const deletedItem = items.filter((item) => {
      return item !== deleteditem
    })

    setItems(deletedItem)
  }

  function handleAddItem(newItem){
    setItems([...items, newItem])
  }

  function handleUpdateItem(updatedItem){
     const upDate = items.map((item) => {
      if(item.id === updatedItem.id){
        return updatedItem
      }else{
        return item
      }
     })

     setItems(upDate)
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} onDeleteItem={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
