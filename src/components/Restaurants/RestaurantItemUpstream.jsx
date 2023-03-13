import { Textarea, Text, Button, NumberInput, TextInput } from '@mantine/core';
import { useDbData, useDbUpdate } from '../../utils/firebase';
import uuid from 'react-uuid';
import { useEffect, useRef, useState } from 'react';
import { showNotification } from '@mantine/notifications';


export const RestaurantItemUpstream = ({ user, setCurrDisplay }) => {
    const [updateMenuSections, result] = useDbUpdate(`/restaurants/3`);
    const [menu_sections, error] = useDbData(`/restaurants/3/menu_sections`);
    const formRef = useRef(null); // to disable form submission on enter
    // LISTS
    const [addOns, setAddOns] = useState([])
    const [customizableCategories, setCustomizableCategories] = useState([])
    const [items, setItems] = useState([])
    const [newMenuSections, setNewMenuSections] = useState(menu_sections === undefined || menu_sections === null ? [] : menu_sections)
    // CURRENT TEXT
    const [currentAddOn, setCurrentAddOn] = useState({ name: "", price: 0 })
    const [currentCustomizableCategory, setCurrentCustomizableCategory] = useState({ name: "", required_amount: 0 })
    const [currentItem, setCurrentItem] = useState({ name: "", price: 0, servings: 0, tags: "", ingredients: "", photo: "" })
    const [currentNewMenuSections, setCurrentNewMenuSections] = useState("")
    const [editableMenuSection, setEditableMenuSection] = useState("")

    useEffect(() => {
        setNewMenuSections(menu_sections)
    },[menu_sections])
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    const displayInfo = () => {
        console.log("addOns", addOns)
        console.log("customizableCategories", customizableCategories)
        console.log("items", items)
        console.log("newMenuSections", newMenuSections)
    }

    const createAddOn = () => {
        if (currentAddOn.name === "" || !(currentAddOn.price > -1)) {
            showNotification({
                message: 'Fill in required fields',
                autoClose: 3000,
                color: 'red'
            });
            return;
        }
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
        if (addOns.length === 0) {
            showNotification({
                message: 'Must create at least one add-on to create a customizable category',
                autoClose: 3000,
                color: 'red'
            });
            return;
        }
        if (currentCustomizableCategory.name === "" || !(currentCustomizableCategory.required_amount > -1)) {
            showNotification({
                message: 'Fill in required fields',
                autoClose: 3000,
                color: 'red'
            });
            return;
        }

        let customizable_category = {
            id: uuid(),
            name: currentCustomizableCategory.name,
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
        setCurrentCustomizableCategory({ name: "", required_amount: 0 })
        setAddOns([])
    }

    const createItem = () => {

        if (currentItem.name === "" || !(currentItem.price > -1) || !(currentItem.servings > -1)) {
            showNotification({
                message: 'Fill in required fields',
                autoClose: 3000,
                color: 'red'
            });
            return;
        }
        let item = {
            id: uuid(),
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
        if (items.length === 0) {
            showNotification({
                message: 'Must create at least one item to create a section',
                autoClose: 3000,
                color: 'red'
            });
            return;
        }
        if (currentNewMenuSections === "") {
            showNotification({
                message: 'Fill in required fields',
                autoClose: 3000,
                color: 'red'
            });
            return;
        }
        let menu_section = {
            id: uuid(),
            name: currentNewMenuSections,
            items: items
        }
        setEditableMenuSection(JSON.stringify(menu_section));
        setCurrentNewMenuSections("")
        setItems([])
    }

    const submitForm = () => {
        if (editableMenuSection === "") {

            showNotification({
                message: 'Must have something in the textbox to submit',
                autoClose: 3000,
                color: 'red'
            });
            return;

        }
        let objectSection = JSON.parse(editableMenuSection);
        
        let new_menu_sections = newMenuSections
        new_menu_sections.push(objectSection)
        setNewMenuSections(new_menu_sections)
        setEditableMenuSection("")

        showNotification({
            message: `Created ${editableMenuSection.name} section`,
            autoClose: 1500,
        });

        updateMenuSections({ menu_sections: new_menu_sections})
    }

    return (

        <>
            <form data-cy="create-hobby-form" onSubmit={submitForm} ref={formRef} onKeyDown={handleKeyDown}>
                <Button onClick={displayInfo}>CONSOLE.LOG</Button>
                <div className="add-on">
                    <Text>ADD ON</Text>
                    <TextInput
                        label="Name"
                        required
                        value={currentAddOn.name}
                        onChange={(event) => setCurrentAddOn({ ...currentAddOn, name: event.currentTarget.value })}
                    />
                    <NumberInput
                        label="Price"
                        required
                        precision={2}
                        value={currentAddOn.price}
                        onChange={(val) => setCurrentAddOn({ ...currentAddOn, price: val })}
                    />
                    <Button onClick={createAddOn}>Add to add_on list</Button>
                </div>
                <div className="customizable-category">
                    <Text>CUSTOMIZABLE CATEGORY</Text>
                    <TextInput
                        label="Name"
                        required
                        value={currentCustomizableCategory.name}
                        onChange={(event) => setCurrentCustomizableCategory({ ...currentCustomizableCategory, name: event.currentTarget.value })}
                    />

                    <NumberInput
                        label="Required amount"
                        required
                        value={currentCustomizableCategory.required_amount}
                        onChange={(val) => setCurrentCustomizableCategory({ ...currentCustomizableCategory, required_amount: val })}
                    />
                    <Button onClick={createCustomizableCategory}>Add to customizable category list</Button>
                </div>
                <div className="item">
                    <Text>ITEM</Text>
                    <TextInput
                        label="Name"
                        required
                        value={currentItem.name}
                        onChange={(event) => setCurrentItem({ ...currentItem, name: event.currentTarget.value })}
                    />
                    <NumberInput
                        precision={2}
                        label="Price"
                        required
                        value={currentItem.price}
                        onChange={(val) => setCurrentItem({ ...currentItem, price: val })}
                    />
                    <NumberInput
                        label="Servings"
                        required
                        value={currentItem.servings}
                        onChange={(val) => setCurrentItem({ ...currentItem, servings: val })}
                    />
                    <TextInput
                        label="Tags"
                        required
                        value={currentItem.tags}
                        onChange={(event) => setCurrentItem({ ...currentItem, tags: event.currentTarget.value })}
                    />
                    <TextInput
                        label="Ingredients"
                        required
                        value={currentItem.ingredients}
                        onChange={(event) => setCurrentItem({ ...currentItem, ingredients: event.currentTarget.value })}
                    />
                    <TextInput
                        label="Photo"
                        required
                        value={currentItem.photo}
                        onChange={(event) => setCurrentItem({ ...currentItem, photo: event.currentTarget.value })}
                    />
                    <Button onClick={createItem}>Add to item list</Button>
                </div>
                <div className="item">
                    <Text>SECTION</Text>
                    <TextInput
                        label="Name"
                        required
                        value={currentNewMenuSections}
                        onChange={(event) => setCurrentNewMenuSections(event.currentTarget.value)}
                    />
                    <Button onClick={createMenuSection}>View constructed Section list below</Button>
                    <Textarea
                        placeholder="Complete above sections to view here"
                        label="Completed Section (edit if you want)"
                        value={editableMenuSection}
                        autosize
                        required
                        
                        onChange={(event) => setEditableMenuSection(event.currentTarget.value)}
                    />
                    <Button color="orange" onClick={submitForm}>Submit to Firebase</Button>
                </div>
            </form>
        </>
    );
};

export default RestaurantItemUpstream;