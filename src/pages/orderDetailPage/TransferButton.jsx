import React from 'react'
import styled from "styled-components";

import TransferImage from "../../assets/transfer.png"


const TransferButton = ({ currentDept }) => {
    return (
        <Container>
            <TransButtons>
                <div>
                    <p>Current Department</p>
                    <div className="current">{currentDept}</div>
                </div>
                <img src={TransferImage} alt="TransferImage" />
                <button className="current"></button>
            </TransButtons>
        </Container>
    )
}

const Container = styled.div`
width: 100%;
`;

const TransButtons = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;


.current{
    max-width: max(25%, 200px);
    height: 3em;
    font-size:1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background: linear-gradient(99.24deg, #2D3298 -19.47%, #8C8EC0 115.73%);
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 8px; 
}
`;

export default TransferButton
