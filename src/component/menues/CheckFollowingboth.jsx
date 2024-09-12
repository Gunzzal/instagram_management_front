import React, { useState } from 'react';
import JSZip from 'jszip';
import ShowList from '../listes/ShowList';
import api from '../api/axios';

function CheckFollowingBoth() {
    const [file, setFile] = useState(null);
    const [onlyFollowing, setOnlyFollowing] = useState([]);
    const [onlyFollower, setOnlyFollower] = useState([]);
    const [showFlag, setShowFlag] = useState(false);

    const id = sessionStorage.getItem("userId");
    const timestamp = Date.now();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleAnalyze = async () => {
        if (!file) {
            alert('파일을 업로드해주세요.');
            setShowFlag(false);
            return;
        }

        const zip = new JSZip();
        try {
            const zipFile = await zip.loadAsync(file);
            const jsonFile = zipFile.file("connections/followers_and_following/followers_1.json");
            const jsonFile2 = zipFile.file("connections/followers_and_following/following.json");

            if (!jsonFile || !jsonFile2) {
                alert('필요한 JSON 파일이 ZIP 파일에 없습니다.');
                return;
            }

            const data = await jsonFile.async("string");
            const jsonData = JSON.parse(data);
            const data2 = await jsonFile2.async("string");
            const jsonData2 = JSON.parse(data2);

            const newFollowersData = jsonData.map(item => item.string_list_data[0]);
            const newFollowingsData = jsonData2.relationships_following.map(item => item.string_list_data[0]);

            setShowFlag(true);

            const uniqueFollowings = analyzeData(newFollowingsData, newFollowersData);
            const uniqueFollowers = analyzeData(newFollowersData, newFollowingsData);
            setOnlyFollowing(uniqueFollowings);
            setOnlyFollower(uniqueFollowers);

            await saveAllData(newFollowersData, newFollowingsData, uniqueFollowings, uniqueFollowers);

        } catch (error) {
            alert(`오류 발생: ${error.message}`);
            setShowFlag(false);
        }
    };

    const analyzeData = (dataA, dataB) => {
        return dataA.filter(a => !dataB.some(b => a.value === b.value));
    };

    const saveAllData = async (followers, followings, onlyFollowing, onlyFollower) => {
        const savePromises = [];
        if(id){
            if (followers.length > 0) savePromises.push(saveData('insta/saveFollower', followers));
            if (followings.length > 0) savePromises.push(saveData('insta/saveFollowing', followings));
            if (onlyFollowing.length > 0) savePromises.push(saveData('insta/saveOnlyFollowing', onlyFollowing));
            if (onlyFollower.length > 0) savePromises.push(saveData('insta/saveOnlyFollower', onlyFollower));
        }
        

        try {
            await Promise.all(savePromises);
        } catch (error) {
            console.error(error);
            alert("데이터 저장 중 오류가 발생했습니다.");
        } 
    };

    const saveData = async (url, dataArray) => {
        for (const item of dataArray) {
            const data = {
                id: id,
                href: item.href,
                value: item.value,
                timestamp: timestamp
            };
            await api.post(url, data);
        }
    };

    return (
        <div>
            <div className="mb-3">
                <label className="form-label">인스타에서 다운받은 .zip 파일을 업로드하세요.</label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input className="form-control" type="file" accept=".zip" required onChange={handleFileChange} />
                    <button type="button" className="btn btn-info" style={{ width: '80px', height: '38px' }} onClick={handleAnalyze}>분석</button>
                </div>
            </div><hr/><br/>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <div style={{margin:'15px'}}>
                    {showFlag && <ShowList data={onlyFollowing} label={"나를 팔로우하지 않는 사람"} />}
                </div>
                <div style={{margin:'15px'}}>
                    {showFlag && <ShowList data={onlyFollower} label={"내가 팔로우하지 않는 사람"} />}
                </div>
            </div>
        </div>
    );
}

export default CheckFollowingBoth;
