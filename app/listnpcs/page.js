'use client'
import React, {useState, useEffect} from 'react';
import styles from '../page.module.css';
import { listAllNPCs } from '../persistence';
import Image from 'next/dist/client/legacy/image';
import roles from "../roles";
import Link from 'next/link'
import { FaClipboard } from 'react-icons/fa';

export default function Page() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [allNPCs, setAllNPCs] = useState([]);
    const [selectedNPCId, setSelectedNPCId] = useState(null);
    const [selectedRole, setSelectedRole] = useState('Unselected');

    const handleContainerClick = (id) => {
        setSelectedNPCId(id);
    };

    useEffect(() => {
        async function fetchAllNPCs() {
            try {
                const allNPCsData = await listAllNPCs();
                setAllNPCs(allNPCsData);
            } catch (error) {
                console.error('Error fetching NPCs:', error);
            }
        }

        fetchAllNPCs();
    }, []);

    useEffect(() => {
        // Filter results based on the selected role
        const filteredByRole = selectedRole !== 'Unselected'
            ? allNPCs.filter((result) => result.Role.toLowerCase() === selectedRole.toLowerCase())
            : allNPCs;
        console.log(selectedRole)
        // Filter results based on the search query
        const filteredBySearch = filteredByRole.filter(
            (result) =>
                result.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                result.Description.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setSearchResults(filteredBySearch);
    }, [searchQuery, selectedRole, allNPCs]);


    const handleRoleChange = (e) => {

        setSelectedRole(e.target.value)

        const filteredByRole = selectedRole !== 'Unselected'
            ? allNPCs.filter((result) => result.Role === selectedRole)
            : allNPCs;


    }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        const filteredResults = allNPCs.filter(
            (result) =>
                result.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                result.Description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredResults);
    };



    return (
        <main className={styles.main}>
            <div className={styles.searchContainer}>
                <form className={styles.searchinput}>
                    <input
                        type="text"
                        className={styles.search}
                        placeholder={"Search NPC's"}
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </form>
                <div className={styles.dropdownSearch}>
                    <select
                        value={selectedRole}
                        className={styles.select}
                        onChange={(e) => (
                            handleRoleChange(e)
                            )}
                    >
                        <option>Unselected</option>
                        {roles.map((gang, index) => (
                            <option key={index} value={gang}>{gang}</option>
                        ))}

                    </select>
                </div>
                <div className={styles.linkButton}>
                    <Link href="/registernpc"><FaClipboard/> Register NPC </Link>
                </div>
            </div>
            <div className={styles.resultsContainer}>
                {(searchResults.length === 0 || searchQuery.length === 0) && selectedRole === 'Unselected'
                    ? allNPCs.map((result) => (
                        <div
                            key={result.id}
                            className={`${selectedNPCId === result.id ? styles.selectedResultContainer : styles.resultContainer}`}
                            onClick={() => handleContainerClick(result.id)}
                        >
                            <div className={`${styles.infoContainer} ${selectedNPCId === result.id ? '' : styles.unselected}`}>

                                {selectedNPCId === result.id ? (
                                    <div className={styles.textContainer}>
                                        <h1>{result.Name}</h1>
                                        <h2>{result.Occupation}</h2>
                                        <p>
                                            {result.Description.split('<br>').map((paragraph, index) => (
                                                <p key={index} className={styles.paragraph}>
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </p>
                                    </div>

                                ) : (
                                    <div className={styles.textContainer}>
                                        <h4>{result.Name}</h4>
                                        <p>{result.Occupation}</p>
                                    </div>
                                )}
                                <div className={styles.npcImageContainer}>
                                    <Image
                                        src={result.image}
                                        alt={'NPC Picture'}
                                        width={250} // Adjust the width value as needed
                                        height={250} // Adjust the height value as needed
                                        layout="intrinsic"
                                        sizes={'80vw'}
                                        className={`${styles.image}`}
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                    : searchResults.map((result) => (
                        <div
                            key={result.id}
                            className={`${styles.resultContainer} ${selectedNPCId === result.id ? styles.selected : ''}`}
                            onClick={() => handleContainerClick(result.id)}
                        >
                            <div className={`${styles.infoContainer} ${selectedNPCId === result.id ? '' : styles.unselected}`}>

                                {selectedNPCId === result.id ? (
                                    <div className={styles.textContainer}>
                                        <h1>{result.Name}</h1>
                                        <h2>{result.Occupation}</h2>
                                        <p>
                                            {result.Description.split('<br>').map((paragraph, index) => (
                                                <p key={index} className={styles.paragraph}>
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </p>
                                    </div>

                                ) : (
                                    <div className={styles.textContainer}>
                                        <h4>{result.Name}</h4>
                                        <p>{result.Occupation}</p>
                                    </div>
                                )}
                                <div className={styles.npcImageContainer}>
                                    <Image
                                        src={result.image}
                                        width={250} // Adjust the width value as needed
                                        height={250} // Adjust the height value as needed
                                        layout="intrinsic"
                                        className={`${styles.image}`}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

        </main>
    );
}
