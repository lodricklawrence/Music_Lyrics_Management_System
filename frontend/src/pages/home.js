import { useState,useEffect} from "react";
import { useParams} from "react-router-dom";
export function HomePage(){
    const {id}=useParams()
    const[isLoaded,setIsLoaded]=useState(false)
    const [allSongs,setAllSongs]=useState([])
    const [isRead,setIsRead]=useState(false)
    const [category,setCategory]=useState('')
    const [filename,setFileName]=useState('')
    const [fileDetail,setFileDetail]=useState('')
    const [searchValue,setSearchValue]=useState('')
    const [filteredSongs,setFilteredSongs]=useState([])
    const [isSearched,setIsSearched]=useState(false)


    useEffect(()=>{
        async function getSongs(){
            try {
                const response=await fetch(`http://localhost:5000/getFile/${id}`)
                const data=await response.json()
                setIsLoaded(true)
                if(isLoaded){
                    setAllSongs(data)
                }
            } catch (error) {
                
            }
        }

        getSongs()

    },[id,isLoaded])


    useEffect(()=>{
        if(isRead){
            async function readSONG(){
                try {
                    const response=await fetch(`http://localhost:5000/readFile/${category}/${filename}/${id}`)
                    const data=await response.json()
                    if(!response.ok){
                        throw new Error("server response was not okay")
                    }else{
                        const fileDetail=JSON.stringify(data)
                        setFileDetail(fileDetail)
                        if(fileDetail){
                            setIsRead(false)
                        }
                    }
                } catch (error) {
                 console.log(error)   
                }

            }
            readSONG()
        }

    },[category,filename,id,isRead])

    const handleReadbutton=(e)=>{
        setIsRead(true)
        setCategory(e.target.id)
        setFileName(e.target.name)

    }

    const handleSearchChange=(e)=>{
        const searchData = e.target.value;
        setSearchValue(searchData);
        if (searchData.trim() === '') {
          setIsSearched(false);
          setFilteredSongs([]);
        } else {
          setIsSearched(true);
          const filteredSongs = allSongs.filter(obj => obj.category === searchData);
          setFilteredSongs(filteredSongs);
        }

    }

    return(
        <div  style={{ marginLeft:"20px"}}>
            <div style={{paddingLeft:"20px"}}>
            <h1>ALL SONGS WITH THEIR CATEGORIES</h1>
            </div>
            <div style={{paddingLeft:"100px"}}>
                <p>SEARCH<input type="search" value={searchValue} onChange={handleSearchChange} /></p> 
            </div>
        <div style={{paddingLeft:"100px"}}>
        <table border={1} style={{borderCollapse:"collapse"}}>
            <tbody>
             <tr>
                <th>SONG_NAME</th>
                <th>SONG_CATEGORY</th>
                <th>READ_BUTTON</th>
            </tr> 
                    {!isSearched?allSongs.map((files,index)=>
                        files.files.map((name,index)=>
                            <tr key={index}>
                                <td >{name}</td>
                                <td >{files.category}</td>
                                <td><button name={name} id={files.category} onClick={handleReadbutton}>READ</button></td>
                            </tr>
                            )
                        
                    ):
                    
                    filteredSongs.map((files,index)=>
                    files.files.map((name,index)=>
                        <tr key={index}>
                            <td >{name}</td>
                            <td >{files.category}</td>
                            <td><button name={name} id={files.category} onClick={handleReadbutton}>READ</button></td>
                        </tr>
                        )
                    
                )}
            </tbody> 
        </table>
         
         </div>
         <div style={{paddingLeft:"10px"}}>
         <h3>Song Lyrics</h3>
         <p>{fileDetail}</p>
         </div>
         </div>
    )

    
}