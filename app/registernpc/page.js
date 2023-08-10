'use client'
import React, { useState } from 'react';
import styles from '../page.module.css';
import {addNPC} from "../persistence"; // Import your CSS styles
import roles from '../roles.js'
import {FaClipboardList} from "react-icons/fa6";
import Link from "next/link";
import {FaClipboard} from "react-icons/fa";

export default function Page() {
    const [field1, setField1] = useState('');
    const [field2, setField2] = useState('');
    const [bigTextField, setBigTextField] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [selectedRole, setSelectedRole] = useState('Unaffiliated');
    const [successMessage, setSuccessMessage] = useState('');


    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!isValidUrl(imageUrl)){
            setAlertMessage('Please enter a valid image URL.');
            return;
        }

        const formData = {
            field1,
            field2,
            bigTextField: bigTextField.replace(/\n/g, '<br>'),
            image: imageUrl,
            role: selectedRole,
        };

        try {
            await addNPC(formData)

            setSuccessMessage('NPC has been registered successfully!');

            // Reset form fields and image URL
            setField1('');
            setField2('');
            setBigTextField('');
            setImageUrl('');
        } catch (error){
            console.error('Error inserting data:', error);
            setAlertMessage('An error occurred while registering NPC.');
        }
    };

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Register New NPC</h1>
            <div className={styles.container}>
                <form onSubmit={handleFormSubmit} className={styles.form}>
                    <div className={styles.characterInput}>
                        <input
                            className={styles.input}
                            required={true}
                            type="text"
                            placeholder="Name"
                            value={field1}
                            onChange={(e) => setField1(e.target.value)}
                        />
                    </div>
                    <div className={styles.characterInput}>
                        <input
                            required={true}
                            className={styles.input}
                            type="text"
                            placeholder="Role"
                            value={field2}
                            onChange={(e) => setField2(e.target.value)}
                        />
                    </div>
                    <div className={styles.characterInput}>
                        <textarea
                            className={styles.input}
                            required={true}
                            placeholder="Description"
                            value={bigTextField}
                            onChange={(e) => setBigTextField(e.target.value)}
                        />
                    </div>
                    <div className={styles.characterInput}>
                        <input
                            className={styles.input}
                            type="text"
                            required={true}
                            placeholder="Image URL"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </div>
                    <div className={styles.characterInput}>
                        <select
                            className={`${styles.input} ${styles.dropdown}`}
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                        >
                            {roles.map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.characterInput}>
                        <button type="submit" className={styles.button}>
                            Save
                        </button>
                        {alertMessage && (
                            <div className={`${styles.alert}`}>
                                {alertMessage}
                            </div>
                        )}
                        {successMessage && (
                            <div className={`${styles.success}`}>
                                {successMessage}
                            </div>
                        )}
                    </div>
                </form>
            </div>

            <div className={styles.linkButton}>
                <Link href="/listnpcs"><FaClipboardList/> NPC List </Link>
            </div>
        </main>
    );
}
