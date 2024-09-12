import React, { useState, useEffect } from 'react';

function ShowList(props) {
    return(
        <div style={{width:"350px"}}>
            <p>{props.label}</p>
            <ul className="list-group list-group-flush">
                {
                    props.data.map((data) => {
                        return(
                            <li className="list-group-item" key={data.value}><a href={data.href} target="_blank" >{data.value}</a></li>
                        )
                    })
                }
                
                
            </ul>
        </div>
    );
}

export default ShowList;