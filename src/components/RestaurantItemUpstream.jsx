import './CreateHobby.css'
import { ActionIcon, Alert, Button, FileInput, MultiSelect, Textarea, TextInput } from '@mantine/core';
import { useDbData, useDbUpdate, getDbStorage } from '../utils/firebase';
import uuid from 'react-uuid';
import { useEffect, useRef, useState } from 'react';
import { useForm } from '@mantine/form';
import { RiErrorWarningLine } from '@react-icons/all-files/ri/RiErrorWarningLine';
import { HiOutlineUpload } from '@react-icons/all-files/hi/HiOutlineUpload';
import { showNotification } from '@mantine/notifications';
import { getDownloadURL, ref as sRef, uploadBytes } from 'firebase/storage';

export const RestaurantItemUpstream = ({ user, setCurrDisplay }) => {
    const [update, result] = useDbUpdate(`/restaurants/3/menu_sections}`);
    const [menu_sections, error] = useDbData(`/restaurants/3/menu_sections}`);






    const formRef = useRef(null); // to disable form submission on enter

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    const form = useForm({

        initialValues: {
            id: uuid(),
            name: menu_section_name,
            items: items,
        },
        // proceed
    });



    let add_ons = []
    let customizable_categories = []
    let required_amount = 0
    let items = []

    const createAddOn = (add_on_name, add_on_price) => {

        let add_on = {
            id: uuid(),
            name: add_on_name,
            price: add_on_price,
        }

        add_ons.push(add_on)
    }

    const createCustomizableCategory = (add_ons, required_amount, name, desc) => {


        let customizable_category = {
            id: uuid(),
            name: name,
            desc: desc,
            'required-select-amount': required_amount,
            "customizable-add-ons": add_ons,
        }
        customizable_categories.push(customizable_category)
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
        items.push(item)

    }

    const createMenuSection = (name, items) => {
        let menu_section = {
            id: uuid(),
            name: menu_section_name,
            items: items,
        }
        menu_sections.push(menu_section)
    }






    const [raiseAlert, setRaiseAlert] = useState(false) // 
    const [alertMessage, setAlertMessage] = useState("Please fill in the required fields")

    const submitForm = (e) => {
        form.validate() // mantine 


        // form.validateField('name')

        e.preventDefault()

        // FIXME: something wrong with the form validation
        // !form.values.desc && form.setFieldError('desc', "Please enter desc")
        let formData = { ...form.values, tags: tags, id: hobbyId }
        // if there issues with the form, show an alert
        // handle the hobby name

        let hobbyNameExists = currentHobbyNames.includes(form.values.name)
        if (hobbyNameExists) {
            setDuplicateHobby(true)
        } else {
            setDuplicateHobby(false)
        }


        if (
            Object.values(form.errors).length > 0 ||
            !form.values.desc ||
            !form.values.name ||
            hobbyNameExists
        ) {
            setRaiseAlert(true);
        } else {
            setRaiseAlert(false);

            if (image) {
                // Upload hobby with image
                const imageName = user.id + "_" + Date.now();
                const storageRef = sRef(getDbStorage(), `/hobby_images/${imageName}`);

                uploadBytes(storageRef, image).then((snapshot) => {
                    console.log('Uploaded a hobby image file!');
                }).then(() => {
                    getDownloadURL(storageRef).then((url) => {
                        formData.img = url;
                    }).then(() => {
                        update(formData)

                        updateUser({
                            [hobbyId]: hobbyId,
                        })

                        updateInitialMessage({
                            content: "Welcome to \"" + e.target[0].value + "\"!",
                            date: new Date().toISOString(),
                            id: messageId,
                            user: user.id,
                        });
                        // setCurrDisplay("hobbies");
                    });
                });
            } else {
                // Upload hobby without image (default image)
                update(formData)

                updateUser({
                    [hobbyId]: hobbyId,
                })

                updateInitialMessage({
                    content: "Welcome to \"" + e.target[0].value + "\"!",
                    date: new Date().toISOString(),
                    id: messageId,
                    user: user.id,
                });
                setCurrDisplay("hobbies");
            }
        }
        showNotification({
            title: `You created the ${form.values.name} hobby!`,
            message: 'Go to "My Hobbies" to see your new hobby!',
            autoClose: 3000,
        })
    }

    return (

        <>
            <form data-cy="create-hobby-form" onSubmit={submitForm} ref={formRef} onKeyDown={handleKeyDown}>

                {raiseAlert && <Alert data-cy="alert" icon={<RiErrorWarningLine />} title="Missing Fields" color="red">
                    {duplicateHobby ? "Hobby name already exists" : "Please fill in the required fields"}
                </Alert>
                }

                <TextInput
                    data-cy="add-hobby-name"
                    // required
                    style={{ marginBottom: 10 }}
                    {...form.getInputProps('name')}
                    label="Hobby Name" placeholder="e.g. Ukuleles, Badminton, Competitive Smash" withAsterisk
                    caption={duplicateHobby ? "Hobby already exists" : ""}
                    status={duplicateHobby ? "error" : "basic"}
                />

                <Textarea
                    // required
                    style={{ marginBottom: 10 }}
                    placeholder="Describe your hobby here"
                    label="Description"
                    {...form.getInputProps('desc')}
                    withAsterisk
                    autosize
                    minRows={3}
                    data-cy="add-hobby-desc"
                />

                <MultiSelect label="Tags" value={tags} searchable onChange={setTags} data={tagsData} clearable />

                <FileInput className="hobby-image-upload" label="Image" placeholder="Upload Hobby Image" icon={<HiOutlineUpload />} accept="image/png,image/jpeg" value={image} onChange={setImage} />

                <div style={{ textAlign: "center" }}>
                    <Button data-cy="create-hobby-submit-button" style={{ marginTop: 10 }} type="submit">Create Hobby</Button>
                </div>
            </form>
        </>
    );
};

export default RestaurantItemUpstream;