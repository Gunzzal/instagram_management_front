import React, { useEffect, useState } from 'react';
import CheckFollowingBoth from "../menues/CheckFollowingboth";
import RecordFollowingboth from "../menues/RecordFollowingboth";
import CheckFollowingChange from "../menues/CheckFollowingChange";
import api from '../api/axios';

function SelectMenuPage(){

    const [selectMenu, setSelectMenu] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [onlyFollower, setOnlyFollower] = useState([]);
    const [onlyFollowing, setOnlyFollowing] = useState([]);
    const [follower, setFollower] = useState([]);
    const [following, setFollowing] = useState([]);

    const checkFollowingBoth = () => {
        setSelectMenu("CheckFollowingBoth");
    }

    const recordFollowingboth = () => {
   
        setSelectMenu("RecordFollowingboth");
      
        getOnlyFollower("OnlyFollower");
        getOnlyFollower("OnlyFollowing");
    }

    const checkFollowingChange = () => {
        setSelectMenu("CheckFollowingChange");

        getFollower("Follower");
        getFollower("Following");
    }


    const getOnlyFollower = async (string) => {
        try {
            const response = await api.get(`insta/get${string}/${id}`);
            string === "OnlyFollower" ? 
            await setOnlyFollower(response.data) 
            : await setOnlyFollowing(response.data) ;
            console.log("debug >>> response, ", response.data);
        } catch (err) {
            console.log(err);
        }
    };


    const getFollower = async (string) => {
        try {
            const response = await api.get(`insta/get${string}/${id}`);
            string === "Follower" ? 
            await setFollower(response.data) 
            : await setFollowing(response.data) ;
            console.log("debug >>> response, ", response.data);
        } catch (err) {
            console.log(err);
        }
    };
    
    const id = sessionStorage.getItem("userId");
    useEffect(() => {
        if(id){
            setIsButtonDisabled(false);
        }else{
            setIsButtonDisabled(true);
        }
    },[])

    return(
        <div>
            
            <div align="center">
                <button type="button" className="btn btn-info" onClick={checkFollowingBoth} style={{margin:"20px"}} >맞팔로우 분석</button>
                <button type="button" className="btn btn-info" onClick={recordFollowingboth} style={{margin:"20px"}} disabled={isButtonDisabled}>맞팔로우 분석 기록</button>
                <button type="button" className="btn btn-info" onClick={checkFollowingChange} style={{margin:"20px"}} disabled={isButtonDisabled}>기간 내 팔로우 팔로잉 변화</button>
                {/* <button type="button" className="btn btn-info" onClick={checkFollowingBoth} style={{margin:"20px"}} disabled={isButtonDisabled}>맞팔로우 확인하기</button> */}
            </div>
            <hr/>
            { selectMenu === "CheckFollowingBoth" && (<CheckFollowingBoth/>)}
            { selectMenu === "RecordFollowingboth" && (<RecordFollowingboth follower={onlyFollower} following={onlyFollowing}/>)}
            { selectMenu === "CheckFollowingChange" && (<CheckFollowingChange follower={follower} following={following}/>)}
        </div>
    );
}

export default SelectMenuPage;