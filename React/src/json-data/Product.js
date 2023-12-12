import React, { useState } from 'react';

const Product = ({ product, onUpdateProduct }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(product.title);


    const editProduct = () => {
      setIsEditing(true);
    } 

    const handleTitleChange = (event) => {
      setNewTitle(event.target.value);
    }

    const handleSave = () => {
      onUpdateProduct(product.id, { title: newTitle });
      setIsEditing(false);
    }

    return (
        <section className='flex-container'>
                <section className='list-element'>
                  {isEditing ? (
                    <>
                      <label htmlFor="newTitle">New title: </label>
                      <input type="text" id="newTitle" value={newTitle} onChange={handleTitleChange} />
                      <button onClick={handleSave}>Save changes</button>
                    </>
                  ) : (
                    <>
                      <h3>{product.title}</h3>
                      <br></br>
                      {product.description}
                      <br></br>
                      <button onClick={editProduct}>Edit product</button>
                    </>
                  ) }
                </section>
                <img src={product.thumbnail} alt="{product.title}"></img>
              </section>
  
    );
};

export default Product;