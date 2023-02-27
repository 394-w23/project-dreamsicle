import { Text, Button, NumberInput, TextInput } from '@mantine/core';
import { useDbData, useDbUpdate, getDbStorage } from '../utils/firebase';
import uuid from 'react-uuid';
import { useEffect, useRef, useState } from 'react';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';


export const RestaurantItemUpstream = ({ user, setCurrDisplay }) => {
    const [updateMenuSections, result] = useDbUpdate(`/restaurants/3`);
    const [menu_sections, error] = useDbData(`/restaurants/3`);
    const formRef = useRef(null); // to disable form submission on enter
    // LISTS
    const [addOns, setAddOns] = useState([])
    const [customizableCategories, setCustomizableCategories] = useState([])
    const [items, setItems] = useState([])
    const [newMenuSections, setNewMenuSections] = useState(menu_sections === undefined || menu_sections === null ? [] : menu_sections)
    // CURRENT TEXT
    const [currentAddOn, setCurrentAddOn] = useState({ name: "", price: 0 })
    const [currentCustomizableCategory, setCurrentCustomizableCategory] = useState({ name: "", desc: "", required_amount: 0 })
    const [currentItem, setCurrentItem] = useState({ name: "", price: 0, servings: 0, tags: "", ingredients: "", photo: "" })
    const [currentNewMenuSections, setCurrentNewMenuSections] = useState("")

    // console.log(newMenuSections)

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    // console.log("currentAddOn: ", currentAddOn)
    // console.log("currentCustomizableCategory: ", currentCustomizableCategory)
    // console.log("currentItem: ", currentItem)
    // console.log("currentNewMenuSections: ", currentNewMenuSections)

    const form = useForm({
        initialValues: {
            id: uuid(),
            name: "",
            items: items,
        },
        // proceed
    });



    const displayInfo = () => {
        console.log("addOns", addOns)
        console.log("customizableCategories", customizableCategories)
        console.log("items", items)
        console.log("newMenuSections", newMenuSections)
    }

    const createAddOn = () => {

        let add_on = {
            id: uuid(),
            name: currentAddOn.name,
            price: currentAddOn.price,
        }
        let newAddOns = addOns
        newAddOns.push(add_on)
        setAddOns(newAddOns)
        showNotification({
            message: `Created ${add_on.name} add on`,
            autoClose: 1500,
        });

        setCurrentAddOn({ name: "", price: 0 })

    }

    const createCustomizableCategory = () => {

        let customizable_category = {
            id: uuid(),
            name: currentCustomizableCategory.name,
            desc: currentCustomizableCategory.desc,
            'required-select-amount': currentCustomizableCategory.required_amount,
            "customizable-add-ons": addOns,
        }
        let newCustomizableCategories = customizableCategories
        newCustomizableCategories.push(customizable_category)
        setCustomizableCategories(newCustomizableCategories)
        showNotification({
            message: `Created ${customizable_category.name} customizableCategory`,
            autoClose: 1500,
        });
        setCurrentCustomizableCategory({ name: "", desc: "", required_amount: 0 })
        setAddOns([])
    }

    const createItem = () => {
        let item = {
            name: currentItem.name,
            price: currentItem.price,
            servings: currentItem.servings,
            tags: currentItem.tags,
            ingredients: currentItem.ingredients,
            photo: currentItem.photo,
            "customizable-categories": customizableCategories
        }
        let new_items = items
        new_items.push(item)
        setItems(new_items)
        showNotification({
            message: `Created ${item.name} item`,
            autoClose: 1500,
        });
        setCurrentItem({ name: "", price: 0, servings: 0, tags: "", ingredients: "", photo: "" })
        setCustomizableCategories([])
    }

    const createMenuSection = () => {
        let menu_section = {
            id: uuid(),
            name: currentNewMenuSections,
            items: items
        }
        let new_menu_sections = newMenuSections
        new_menu_sections.push(menu_section)
        setNewMenuSections(new_menu_sections)

        

        setCurrentNewMenuSections("")
        showNotification({
            message: `Created ${menu_section.name} section`,
            autoClose: 1500,
        });
        setItems([])
        updateMenuSections({menu_sections:new_menu_sections})
    }

    const submitForm = (e) => {
        e.preventDefault()

    }

    return (

        <>
            <form data-cy="create-hobby-form" onSubmit={submitForm} ref={formRef} onKeyDown={handleKeyDown}>
                <Button onClick={displayInfo}>CONSOLE.LOG</Button>
                <div className="add-on">
                    <Text>ADD ON</Text>
                    <TextInput
                        label="Name"
                        value={currentAddOn.name}
                        onChange={(event) => setCurrentAddOn({ ...currentAddOn, name: event.currentTarget.value })}
                    />
                    <NumberInput
                        label="Price"
                        value={currentAddOn.price}
                        onChange={(val) => setCurrentAddOn({ ...currentAddOn, price: val })}
                    />
                    <Button onClick={createAddOn}>Add to add_on list</Button>
                </div>
                <div className="customizable-category">
                    <Text>CUSTOMIZABLE CATEGORY</Text>
                    <TextInput
                        label="Name"
                        value={currentCustomizableCategory.name}
                        onChange={(event) => setCurrentCustomizableCategory({ ...currentCustomizableCategory, name: event.currentTarget.value })}
                    />
                    <TextInput
                        label="Description"
                        value={currentCustomizableCategory.desc}
                        onChange={(event) => setCurrentCustomizableCategory({ ...currentCustomizableCategory, desc: event.currentTarget.value })}
                    />
                    <NumberInput
                        label="Required amount"
                        value={currentCustomizableCategory.required_amount}
                        onChange={(val) => setCurrentCustomizableCategory({ ...currentCustomizableCategory, required_amount: val })}
                    />
                    <Button onClick={createCustomizableCategory}>Add to customizable category list</Button>
                </div>
                <div className="item">
                    <Text>ITEM</Text>
                    <TextInput
                        label="Name"
                        value={currentItem.name}
                        onChange={(event) => setCurrentItem({ ...currentItem, name: event.currentTarget.value })}
                    />
                    <NumberInput
                        label="Price"
                        value={currentItem.name}
                        onChange={(val) => setCurrentItem({ ...currentItem, price: val })}
                    />
                    <NumberInput
                        label="Servings"
                        value={currentItem.servings}
                        onChange={(val) => setCurrentItem({ ...currentItem, servings: val })}
                    />
                    <TextInput
                        label="Tags"
                        value={currentItem.tags}
                        onChange={(event) => setCurrentItem({ ...currentItem, tags: event.currentTarget.value })}
                    />
                    <TextInput
                        label="Ingredients"
                        value={currentItem.ingredients}
                        onChange={(event) => setCurrentItem({ ...currentItem, ingredients: event.currentTarget.value })}
                    />
                    <TextInput
                        label="Photo"
                        value={currentItem.photo}
                        onChange={(event) => setCurrentItem({ ...currentItem, photo: event.currentTarget.value })}
                    />
                    <Button onClick={createItem}>Add to item list</Button>
                </div>
                <div className="item">
                    <Text>SECTION</Text>
                    <TextInput
                        label="Name"
                        value={currentNewMenuSections}
                        onChange={(event) => setCurrentNewMenuSections(event.currentTarget.value)}
                    />
                    <Button onClick={createMenuSection}>Add to Section list</Button>
                </div>
            </form>
        </>
    );
};

export default RestaurantItemUpstream;