import { useEffect, useState } from "react";

const INTERVAL = 10

const PageController = ({totalpages,currentPage,callback}) => {
    const [startIndex, setStartindex] = useState(1)  
    const [numberOfPage, setNumberOfPage] = useState([])
    
    useEffect(() => {
        const count = getNumberOfPage(totalpages,currentPage);
        setNumberOfPage(count)
    },[totalpages,currentPage])

        
    function getNumberOfPage(totalpages,currentPage) {
        currentPage <= 4 ? setStartindex(1) : setStartindex(currentPage - 4);
        let finishIndex = currentPage <= 4 ? INTERVAL : INTERVAL + currentPage - 4;
        finishIndex = finishIndex >= totalpages ? totalpages : finishIndex;
        let numberOfPage = [];
        for (let index = startIndex; index < finishIndex; index++) {
            numberOfPage.push(index);
        }
        return numberOfPage;
    }

    return <ul className = "list-of-pages">
                <li onClick={() => callback(--currentPage)} className = "item-of-pages" hidden = {currentPage == 1}>Previus</li>
                <li className = "item-of-pages" hidden = {startIndex > 1}>1 ..</li>
            {numberOfPage.map((number) => <li key={number} onClick = {() => callback(number)} value = {number} className = "item-of-pages" > {number} </li>)}
                <li onClick = {() => callback(totalpages)} className = "item-of-pages">{totalpages}</li> 
                <li onClick={() => callback(++currentPage)} className = "item-of-pages">Next</li>   
            </ul>

    
}

export default PageController