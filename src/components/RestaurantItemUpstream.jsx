import { Text, Button, NumberInput, TextInput } from '@mantine/core';
import { useDbData, useDbUpdate, getDbStorage } from '../utils/firebase';
import uuid from 'react-uuid';
import { useEffect, useRef, useState } from 'react';
import { useForm } from '@mantine/form';

export const RestaurantItemUpstream = ({ user, setCurrDisplay }) => {
    const [update, result] = useDbUpdate(`/restaurants/3/menu_sections}`);
    const [menu_sections, error] = useDbData(`/restaurants/3/menu_sections}`);
    const formRef = useRef(null); // to disable form submission on enter
    // LISTS
    const [addOns, setAddOns] = useState([])
    const [customizableCategories, setCustomizableCategories] = useState([])
    const [items, setItems] = useState([])
    const [newMenuSections, setNewMenuSections] = useState(menu_sections)
    // CURRENT TEXT
    const [currentAddOn, setCurrentAddOn] = useState({name:"",price:0})
    const [currentCustomizableCategory, setCurrentCustomizableCategory] = useState({name:"",desc:"",required_amount:""})
    const [currentItem, setCurrentItem] = useState({name:"",price:"",servings:"",tags:"",ingredients:"",photo:""})
    const [currentNewMenuSections, setCurrentNewMenuSections] = useState("")

    // let new_menu_sections = menu_sections
    // let add_ons = []
    // let customizable_categories = []
    // let items = []
    // console.log(currentAddOn)
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    console.log("currentAddOn: ", currentAddOn)
    console.log("currentCustomizableCategory: ", currentCustomizableCategory)
    console.log("currentItem: ", currentItem)
    console.log("currentNewMenuSections: ", currentNewMenuSections)

    const form = useForm({
        initialValues: {
            id: uuid(),
            name: "",
            items: items,
        },
        // proceed
    });



    

    const createAddOn = (add_on_name, add_on_price) => {

        let add_on = {
            id: uuid(),
            name: add_on_name,
            price: add_on_price,
        }
        let newAddOns=addOns
        newAddOns.push(add_on)
        setAddOns(newAddOns)

    }

    const createCustomizableCategory = (add_ons, required_amount, name, desc) => {

        let customizable_category = {
            id: uuid(),
            name: name,
            desc: desc,
            'required-select-amount': required_amount,
            "customizable-add-ons": add_ons,
        }
        let newCustomizableCategories=customizableCategories
        newCustomizableCategories.push(customizable_category)
        setCustomizableCategories(newCustomizableCategories)
    }

    const createItem = (name, price, servings, tags, ingredients, photo) => {
        let item = {
            name: name,
            price: price,
            servings: servings,
            tags: tags,
            ingredients: ingredients,
            photo: photo,
        }
        let new_items=items
        new_items.push(item)
        setItems(new_items)
    }

    const createMenuSection = (name, items) => {
        let menu_section = {
            id: uuid(),
            name: name,
            items: items,
        }
        let new_menu_sections=newMenuSections
        new_menu_sections.push(menu_section)
        setNewMenuSections(new_menu_sections)
    }

    const submitForm = (e) => {
        e.preventDefault()

    }

    return (

        <>
            <form data-cy="create-hobby-form" onSubmit={submitForm} ref={formRef} onKeyDown={handleKeyDown}>
                <div className="add-on">
                    <Text>ADD ON</Text>
                    <TextInput
                        label="Name"
                        value={currentAddOn.name}
                        onChange={(event)=>setCurrentAddOn({name:event.currentTarget.value,price:currentAddOn.price})}
                    />
                    <NumberInput
                        label="Price"
                        value={currentAddOn.price}
                        onChange={(val)=>setCurrentAddOn({name:currentAddOn.name,price:val})}
                    />
                    <Button>Add to add_on list</Button>
                </div>
                <div className="customizable-category">
                    <Text>CUSTOMIZABLE CATEGORY</Text>
                    <TextInput
                        label="Name"
                        value={currentCustomizableCategory.name}
                        onChange={(event)=>setCurrentCustomizableCategory({...currentCustomizableCategory, name:event.currentTarget.value})}
                    />
                    <TextInput
                        label="Description"
                        value={currentCustomizableCategory.desc}
                        onChange={(event)=>setCurrentCustomizableCategory({...currentCustomizableCategory, desc:event.currentTarget.value})}
                    />
                    <NumberInput
                        label="Required amount"
                        value={currentCustomizableCategory.required_amount}
                        onChange={(val)=>setCurrentCustomizableCategory({...currentCustomizableCategory,required_amount:val})}
                    />
                    <Button>Add to customizable category list</Button>
                </div>
                <div className="item">
                    <Text>ITEM</Text>
                    <TextInput
                        label="Name"
                        value={currentItem.name}
                        onChange={(event)=>setCurrentItem({...currentItem, name:event.currentTarget.value})}
                    />
                    <NumberInput
                        label="Price"
                        value={currentItem.name}
                        onChange={(val)=>setCurrentItem({...currentItem,price:val})}
                    />
                    <NumberInput
                        label="Servings"
                        value={currentItem.servings}
                        onChange={(val)=>setCurrentItem({...currentItem, servings:val})}
                    />
                    <TextInput
                        label="Tags"
                        value={currentItem.tags}
                        onChange={(event)=>setCurrentItem({...currentItem, tags:event.currentTarget.value})}
                    />
                    <TextInput
                        label="Ingredients"
                        value={currentItem.ingredients}
                        onChange={(event)=>setCurrentItem({...currentItem, ingredients:event.currentTarget.value})}
                    />
                    <TextInput
                        label="Photo"
                        value={currentItem.photo}
                        onChange={(event)=>setCurrentItem({...currentItem, photo:event.currentTarget.value})}
                    />
                    <Button>Add to item list</Button>
                </div>
                <div className="item">
                    <Text>SECTION</Text>
                    <TextInput
                        label="Name"
                        value={currentNewMenuSections}
                        onChange={(event)=>setCurrentNewMenuSections(event.currentTarget.value)}
                    />
                    <Button>Add to Section list</Button>
                </div>
            </form>
        </>
    );
};

export default RestaurantItemUpstream;