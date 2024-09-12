import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';


function MainPage() {
    const navigate = useNavigate();

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);

    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');

    // const [userInfo, setUserInfo] = useState([]);

    const handleLoginClose = () => setShowLoginModal(false);
    const handleLoginShow = () => setShowLoginModal(true);

    const handleJoinClose = () => setShowJoinModal(false);
    const handleJoinShow = () => setShowJoinModal(true);

    const moveToJoin = () => {
        handleLoginClose();
        handleJoinShow();
    }

    const nameHandler = (e) => {
        setName(e.target.value);
    }

    const idHandler = (e) => {
        setId(e.target.value);
    }

    const pwdHandler = (e) => {
        setPwd(e.target.value);
    }

    const saveUserInfo = async () => {
        const data = {
            name: name,
            id: id,
            pwd: pwd
        };
        console.log(data);
        try {
            if (name === '' || id === '' || pwd === '') {
                alert("제목과 내용 모두 입력해 주세요!");

            } else {

                const response = await api.post('insta/saveUserInfo', data);
                console.log(response);
                if (response.status == 200) {
                    alert("회원가입이 완료되었습니다.");
                    setShowJoinModal(false);
                    setShowLoginModal(true);
                } else {
                    alert("회원가입 중 오류발생!!");
                }
            }
        } catch (error) {
            // console.error(error);
            if (error.status == 500) {
                alert("아이디가 중복되었습니다. 다른 아이디로 회원가입을 시도하세요.");
                setId('');

            } else {
                alert("데이터 저장 중 오류가 발생했습니다.");
            }
        }
    }

    const getUserInfo = async () => {

        try {
            const response = await api.get(`insta/getUserInfo/${id}`);
            console.log("debug >>> response data, ", response.data);
      
            if(response.data.pwd === pwd){
                sessionStorage.setItem('userId', response.data.id);
                sessionStorage.setItem('userName', response.data.name);
                alert("로그인 했습니다.");
                navigate(`/select-menu/${response.id}`);
            }else{
                alert("아이도 혹은 비밀번호가 틀렸습니다.");
            }

        } catch (err) {
            console.log(err);
            alert("아이도 혹은 비밀번호가 틀렸습니다.");
        }
    }
    

    return (
        <div>
            <div align="center">
                <br /><br /><br /><br /><br /><br />
                <button type="button" className="btn btn-primary btn-lg" onClick={handleLoginShow}>
                    로그인 후 이용하기
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="button" className="btn btn-secondary btn-lg" onClick={() => navigate('/select-menu')}>비회원으로 이용하기</button>
            </div>
            <br /><br /><br /><br /><br /><br />
            <div>
                <h5 style={{ color: "red" }}>비회원으로 이용시 분석 정보가 저장되지 않으며, 정보가 제한됩니다.</h5>
            </div>

            {/* 로그인 Modal */}
            <div className={`modal fade ${showLoginModal ? 'show' : ''}`} style={{ display: showLoginModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden={!showLoginModal}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Login</h1>
                            <button type="button" className="btn-close" onClick={handleLoginClose} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3 row">
                                <label className="col-sm-2 col-form-label">ID</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" value={id} onChange={idHandler} />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <input type="password" className="form-control" value={pwd} onChange={pwdHandler} />
                                </div>
                            </div>
                            <div align="right" onClick={moveToJoin}>
                                회원가입
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleLoginClose}>취소</button>
                            <button type="button" className="btn btn-primary" onClick={getUserInfo}>로그인</button>
                        </div>
                    </div>
                </div>
            </div>


            {/* 회원가입 Modal */}
            <div className={`modal fade ${showJoinModal ? 'show' : ''}`} style={{ display: showJoinModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden={!showJoinModal}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Join</h1>
                            <button type="button" className="btn-close" onClick={handleJoinClose} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3 row">
                                <label className="col-sm-2 col-form-label">이름</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" value={name} onChange={nameHandler} />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-2 col-form-label">ID</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" value={id} onChange={idHandler} />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <input type="password" className="form-control" value={pwd} onChange={pwdHandler} />
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleJoinClose}>취소</button>
                            <button type="button" className="btn btn-primary" onClick={saveUserInfo}>회원가입</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
