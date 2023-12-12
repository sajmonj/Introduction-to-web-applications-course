import { useEffect, useState } from "react";

const Protected = ({ token }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/protected', {
                method: 'GET',    
                headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Error fetching protected data');
                }
                
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching protected data', error);
            }
        };
        fetchData();
    }, [token]);

    return (
        <div>
            <h2>Protected Things</h2>
            {data ? <p>{`Logged in as: ${data.logged_in_as}`}</p> : <p>Loading...</p>}
        </div>
    );
};

export default Protected;