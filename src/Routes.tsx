import React from 'react'
import {Redirect, Route, Switch } from 'react-router-dom';
import {Page404} from "./Components/404/Page404";
import {Loginization} from "./Components/Loginization/Loginization";
import {NewPassword} from "./Components/NewPassword/NewPassword";
import {PasswordRecovery} from "./Components/PasswordRecovery/PasswordRecovery";
import {Profile} from "./Components/Profile/Profile";
import {Registration} from "./Components/Registration/Registration";
import {TestPage} from "./Components/TestPage/TestPage";


export const PATH = {
    LOGIN: '/login',
    NEW_PASS: '/newPassword/:token',
    RECOVERY_PASS: '/recoveryPass',
    PROFILE: '/profile',
    REGISTRATION: '/registration',
    TEST_PAGE: '/testt'
}

function Routes() {
    return (
        <div>
            {/*//Switch выбирает первый подходящий роут*/}
            <Switch>

                {/*exact нужен чтоб указать полное совподение (что после '/' ничего не будет)*/}
                <Route path={'/'} exact render={() => <Redirect to={PATH.LOGIN}/>}/>
                <Route path={'/'} exact render={() => <Redirect to={PATH.NEW_PASS}/>}/>
                <Route path={'/'} exact render={() => <Redirect to={PATH.RECOVERY_PASS}/>}/>
                <Route path={'/'} exact render={() => <Redirect to={PATH.PROFILE}/>}/>
                <Route path={'/'} exact render={() => <Redirect to={PATH.REGISTRATION}/>}/>
                <Route path={'/'} exact render={() => <Redirect to={PATH.TEST_PAGE}/>}/>

                <Route path={PATH.LOGIN} render={() => <Loginization/>}/>
                <Route path={PATH.NEW_PASS} render={() => <NewPassword/>}/>
                <Route path={PATH.RECOVERY_PASS} render={() => <PasswordRecovery/>}/>
                <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                <Route path={PATH.REGISTRATION} render={() => <Registration/>}/>
                <Route path={PATH.TEST_PAGE} render={() => <TestPage/>}/>
                {/*    // add routes*/}

                {/*у этого роута нет пути, он отрисуется если пользователь захочет попасть на несуществующую страницу*/}
                <Route render={() => <Page404/>}/>

            </Switch>
        </div>
    )
}

export default Routes
