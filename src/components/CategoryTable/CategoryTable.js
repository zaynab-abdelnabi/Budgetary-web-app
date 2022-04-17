import React, { useState } from "react";
import { Card } from "../../components/Card/Card";
import { CategoriesTableHead } from "../Head/Head";
import { EditCategoryForm } from "../Forms/Form";
import { AddCategoryForm } from "../Forms/Form";
import { CategoryItem } from "../../components/Tables/Tables";
import "./CategoryTable.css";

export function CategoriesTable(props) {
  const [addCategory, setAddCategory] = useState(props.addView);
  const [editItem, setEditItem] = useState(0);
  const [categories, setCategories] = useState(props.data);

  const getByType = (type) => {
    if (type === "all") {
      setCategories(props.data);
    } else {
      const filtered = props.data.filter((category) => category.type === type);
      setCategories(filtered);
    }
  };

  return (
    <Card class="table categories">
      <CategoriesTableHead
        status={(type) => getByType(type)}
        onAddClick={() => {
          setAddCategory(true);
          setEditItem(0);
        }}
      />
      <div className="table-content">
        {addCategory && (
          <AddCategoryForm
            closecategory={() => {
              setAddCategory(false);
            }}
            onSubmitHandler={(data) => props.onSubmitHandler(data)}
          />
        )}

        {categories.map((category) => {
          if (editItem === category.id) {
            return (
              <EditCategoryForm
                key={category.id}
                closeEditMode={() => setEditItem(0)}
                data={category}
                onChangeHandlerEdit={(data) => props.onEdit(data, category.id)}
              />
            );
          } else {
            return (
              <CategoryItem
                key={category.id}
                data={category} 
                onEdit={(id) => {
                  setAddCategory(false);
                  setEditItem(id);
                }}
                onDelete={() => props.onChangeHandlerdelete(category.id)}
              />
            );
          }
        })}
      </div>
    </Card>
  );
}

export default CategoriesTable;
