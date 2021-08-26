import React from 'react';
import { Route, Switch } from 'react-router';
import Main from './Main';
import { Auth, Reset, SignIn, SignUp } from './sign/index';
import { Expense, Income } from './spendings/index';
import MyPage from './MyPage';
import '../styles/App.css';
import { Header } from './parts';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/signin' component={SignIn} />
        <Route exact path='/reset' component={Reset} />

        <Auth>
          <Route exact path='(/)?' component={Main} />
          <Route exact path='/mypage' component={MyPage} />

          <Route path='/edit/expense(/:id)?' component={Expense} />
          <Route path='/edit/income(/:id)?' component={Income} />
        </Auth>
      </Switch>
    </>
  );
}

export default App;
