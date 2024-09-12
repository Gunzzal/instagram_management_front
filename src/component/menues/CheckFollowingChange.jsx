import React, { useEffect, useState } from 'react';
import ShowList from '../listes/ShowList';


function CheckFollowingChange(props) {

    const [formattedTimestamps, setFormattedTimestamps] = useState([]);
    const [showFlag, setShowFlag] = useState(false);
    const [beforeDate, setBeforeDate] = useState();
    const [afterDate, setAfterDate] = useState();
    const [resultFlag, setResultFlag] = useState(true);
    const [beforeFollowers, setBeforeFollowers] = useState([]);
    const [afterFollowers, setAfterFollowers] = useState([]);
    const [beforeFollowings, setBeforeFollowings] = useState([]);
    const [afterFollowings, setAfterFollowings] = useState([]);
    const [unfolloweres, setUnfolloweres] = useState([]);
    const [newfolloweres, setNewfolloweres] = useState([]);
    const [unfollowinges, setUnfollowinges] = useState([]);
    const [newfollowinges, setNewfollowinges] = useState([]);

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



    const selectBeforeDate = (e) => {
       
        // console.log(e.target.value);
        const selectedTimestamp = Number(e.target.value);
        setBeforeDate(selectedTimestamp);

        const bFollower = props.follower.filter(item => item.timestamp === selectedTimestamp);
        setBeforeFollowers(bFollower);
        const bFollowing = props.following.filter(item => item.timestamp === selectedTimestamp);
        setBeforeFollowings(bFollowing);
    }


    const selectAftereDate = (e) => {
        // console.log(e.target.value);
        const selectedTimestamp = Number(e.target.value);
        setAfterDate(selectedTimestamp);

        const aFollower = props.follower.filter(item => item.timestamp === selectedTimestamp);
        setAfterFollowers(aFollower);
        const aFollowing = props.following.filter(item => item.timestamp === selectedTimestamp);
        setAfterFollowings(aFollowing);
    }


    const showResult = () => {
        if (beforeDate <= afterDate) {
            setShowFlag(true);
            console.log(beforeDate);
            setResultFlag(false);

            const unfollower = analyzeData(beforeFollowers, afterFollowers);
            setUnfolloweres(unfollower);

            const newfollower = analyzeData(afterFollowers, beforeFollowers);
            setNewfolloweres(newfollower);

            const unfollowing = analyzeData(beforeFollowings, afterFollowings);
            setUnfollowinges(unfollowing);

            const newfollowing = analyzeData(afterFollowings, beforeFollowings);
            setNewfollowinges(newfollowing);
        }else{
            setResultFlag(true);
            setShowFlag(false);
        }
    }

    const analyzeData = (dataA, dataB) => {
        return dataA.filter(a => !dataB.some(b => a.value === b.value));
    };

    useEffect(() => {
        changeTimestamp(props.follower);
    }, [props.follower]);

    useEffect(() => {
        console.log(unfolloweres);
    }, [unfolloweres]);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <select className="form-select" aria-label="Default select example" onChange={selectBeforeDate} style={{ margin: '10px' }}>
                    <option disabled selected>
                        {
                            (formattedTimestamps.length > 0) ? "시작 날짜를 선택해 주세요." : "저장된 데이터가 없습니다."
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
                <select className="form-select" aria-label="Default select example" onChange={selectAftereDate} style={{ margin: '10px' }}>
                    <option disabled selected>
                        {
                            (formattedTimestamps.length > 0) ? "마지막 날짜를 선택해 주세요." : "저장된 데이터가 없습니다."
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
                <button type="button" className="btn btn-info" style={{ width: '150px', height: '38px', margin: '10px' }} onClick={showResult} >완료</button>
            </div>
            <hr />
            {
                resultFlag && <p style={{ color: 'red' }}>사직 날짜가 미자믹 날짜보다 최신 혹은 같으면 안됩니다!</p>
            }

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ margin: '15px' }}>
                    {showFlag && <ShowList data={unfolloweres} label={(unfolloweres.length) ? "기간 내 사라진 팔로워":"기간 내 사라진 팔로워가 없습니다."} />}
                </div>
                <div style={{ margin: '15px' }}>
                    {showFlag && <ShowList data={newfolloweres} label={(newfolloweres.length)? "기간 내 새로 생긴 팔로워":"기간 내 새로 생긴 팔로워가 없습니다."} />}
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ margin: '15px' }}>
                    {showFlag && <ShowList data={unfollowinges} label={(unfollowinges.length) ? "기간 내 사라진 팔로잉":"기간 내 사라진 팔로잉은 없습니다."} />}
                </div>
                <div style={{ margin: '15px' }}>
                    {showFlag && <ShowList data={newfollowinges} label={(newfollowinges.length)? "기간 내 새로생긴 팔로잉":"기간 내 새로생긴 팔로잉은 없습니다."} />}
                </div>
            </div>

        </div>
    )
}

export default CheckFollowingChange;