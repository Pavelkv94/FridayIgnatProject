import React, { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ResponseLoginType } from '../../api/fridayProject-api';
import { authTC, logoutTC, updateUserTC } from '../../Redux/login-reducer';
import { AppStateType } from '../../Redux/store';
import { Redirect } from 'react-router-dom';
import s from './Profile.module.css'
import { Search } from '../../Common/Search/Search';
import { responsePacksType } from '../../api/packs-api';
import { packsAddTC, packsTC, setPageCountOfPacksAC, setPageOfPacksAC, setSearchValuePackAC, setUserIdforPacksAC, sortPackAC } from '../../Redux/packs-reducer';
import { SortButton } from '../../Common/SortButton/SortButton';
import { Paginator } from '../../Common/Paginator/Paginator';
import { Pack } from '../Packs/Pack/Pack';
import { UpdateItem } from '../../Modal/UpdateModal';
import { useState } from 'react';
import { AddedItem } from '../../Modal/AddedModal';

export function Profile() {

    const dispatch = useDispatch();
    const isAuth = useSelector<AppStateType, string>(state => state.loginPage.isAuth)
    const isAuthError = useSelector<AppStateType, string | null>(state => state.loginPage.error)
    const data = useSelector<AppStateType, ResponseLoginType>(state => state.loginPage.userData)
    const { min, max, page, pageCount, packName, sortPacks, error, cardPacks, cardPacksTotalCount, user_id } = useSelector<AppStateType, responsePacksType>(state => state.packs)
    let [value, setValue] = useState("")
    useEffect(() => {
        dispatch(setUserIdforPacksAC(data._id));
        if (!isAuth)
            dispatch(authTC())
    }, [])

    useEffect(() => {
        if (isAuth)
            dispatch(packsTC())
    }, [isAuth, page, pageCount, sortPacks, user_id])

    // const logout = () => {
    //     dispatch(logoutTC());
    // }
    if (isAuthError) {
        return <Redirect to={"/login"} />;
    }
    //пагинация
    const onPageChanged = (page: number) => {
        dispatch(setPageOfPacksAC(page))
    }
    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setPageCountOfPacksAC(Number(e.currentTarget.value)))
    }

    //сортировка 
    const sortingPack = (n: 1 | 0, sortValue: string) => {

        dispatch(sortPackAC(n, sortValue))
    }

    //поисковая строка
    const setSearchResult = (value: string) => {
        dispatch(setSearchValuePackAC(value))

    }
    const searchPackCallback = () => {
        dispatch(packsTC())
    }

    const updateItem = (title: string, title2: string | undefined) => {

        dispatch(updateUserTC(title, title2))
    }
    const onMainPhotoSelected = (e: any) => { setValue(e.currentTarget.value) }
    const photoCallBack = () => { dispatch(updateUserTC(data.name, value)); setValue("") }
    const addedCallback = (name: string) => {
        dispatch(packsAddTC(name))
    }

    //при успешной логинизации отрисовываем данные пользователя
    return (

        <div className={s.rootProfile}>
            <div className={s.container} style={pageCount < 11 ? { minHeight: "644px" } : { minHeight: "1250px" }}>
                <div className={s.leftBox} style={pageCount < 11 ? { minHeight: "644px" } : { minHeight: "1250px" }}>
                    <div className={s.avatarName}>
                        {data.avatar
                            ? <img className={s.avatar} alt={"ava"}
                                src={data.avatar} />
                            : <img className={s.avatar} alt={"ava"}
                                src={"https://image.flaticon.com/icons/png/512/21/21104.png"} />}
                        <div className={s.nameUser}>{data.name?.split("@")[0]}</div>
                        <div className={s.nameEmail}>{data.email}</div>
                        <form>
                            <input type="text" value={value} onChange={onMainPhotoSelected} placeholder="Enter the URL of new photo" />
                            <button onClick={photoCallBack}>&#9658;</button>
                        </form>


                        <UpdateItem callback={updateItem} value={data.name} value2={data.avatar} disabled={false} point="profile" />
                    </div>

                    <div className={s.userInfoBlock}>
                        <div className={s.infoTitle}>User info</div>

                        <div className={s.infoItem}><b> Created profile:</b> {data.created?.toString().slice(0, 10)}</div>
                        <div className={s.infoItem}> <b> Total packs:</b> {data.publicCardPacksCount}</div>
                        <div className={`${s.infoItem} ${s.verifiedBlock}`}><b> Account verified:</b> {data.verified
                            ? <div className={s.verified} style={{ background: "green" }}></div>
                            : <div className={s.verified} style={{ background: "red" }}></div>}</div>
                            <br />
                        <AddedItem callback={addedCallback} title="Add New Pack"/>
                    </div>
                </div>

                <div className={s.main}>
                    <h2 className={s.mainTitle}>My Packs</h2>
                    <div className={s.searchBar}>
                        <Search
                            packName={packName}
                            min={min}
                            max={max ? max : 10}
                            target="packs"
                            inputCallback={setSearchResult}
                            btnCallback={searchPackCallback}
                        />
                    </div>
                    <div className={s.packsTitles}>
                        <div className={s.headerItem} style={{ width: "140px" }}>Name <SortButton sortValue="name" sortPacks={sortPacks}
                            sortCallback={sortingPack} /></div>
                        <div className={s.headerItem} style={{ width: "80px" }}>Cards<SortButton sortValue="cardsCount" sortPacks={sortPacks}
                            sortCallback={sortingPack} /></div>
                        <div className={s.headerItem} style={{ width: "120px" }}>Last Updated<SortButton sortValue="updated" sortPacks={sortPacks}
                            sortCallback={sortingPack} /></div>
                        <div className={s.headerItem} style={{ width: "200px" }}>Created By<SortButton sortValue="user_name" sortPacks={sortPacks}
                            sortCallback={sortingPack} /></div>
                        <div className={s.headerItem} style={{ width: "100px" }}>Actions</div>
                    </div>
                    <div className={s.packs}>
                        {cardPacks.map(m => {

                            return <Pack card={m} key={m._id} />

                        })}
                        <div className={s.paginator}>
                            <Paginator totalItemsCount={cardPacksTotalCount} pageSize={pageCount} currentPage={page} pageCount={pageCount}
                                onPageChanged={onPageChanged} onChangeHandler={onChangeHandler} profileView={true} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}