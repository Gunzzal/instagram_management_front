import React, { useEffect, useState } from 'react';
import ShowList from '../listes/ShowList';

function RecordFollowingboth(props) {
    const [formattedTimestamps, setFormattedTimestamps] = useState([]);
    const [onlyFollower, setOnlyFollower] = useState([]);
    const [onlyFollowing, setOnlyFollowing] = useState([]);
    const [showFlag, setShowFlag] = useState(false);

    const changeTimestamp = (data) => {
        const timestamps = [...new Set(data.map(item => item.timestamp))];
        const formatTimestamp = timestamps.map(data => {
            const date = new Date(data);
            return {
                original: data, // 원본 타임스탬프
                formatted: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
            };
        });
        setFormattedTimestamps(formatTimestamp);
        console.log(formatTimestamp);
    };

    const selectDate = (e) => {
        setShowFlag(true);
        // console.log(e.target.value);
        const selectedTimestamp = Number(e.target.value);
        const filteredFollowers = props.follower.filter(item => item.timestamp === selectedTimestamp);
        setOnlyFollower(filteredFollowers);

        const filteredFollowings = props.following.filter(item => item.timestamp === selectedTimestamp);
        setOnlyFollowing(filteredFollowings);
    }

    useEffect(() => {
        changeTimestamp(props.follower);
    }, [props.follower]);

    return (
        <div>
            <select className="form-select" aria-label="Default select example" onChange={selectDate}>
                <option disabled selected>
                    {
                        (formattedTimestamps.length > 0) ? "날짜를 선택해 주세요." : "저장된 데이터가 없습니다."
                    }
                </option>
                {
                    formattedTimestamps.map((item, index) => {
                        return (
                            <option key={index} value={item.original}>
                                {item.formatted} 
                            </option>
                        );
                    })
                }
            </select>
            <hr />
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

export default RecordFollowingboth;
