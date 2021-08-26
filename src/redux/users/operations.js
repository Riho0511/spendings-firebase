import { signInAction, signOutAction, updateUserStateAction } from "./action";
import { push } from 'connected-react-router';
import { auth, db, FirebaseTimestamp } from '../../firebase/index';
import { isValidRequiredInput, isValidEmailFormat, isValidInput } from '../../components/parts/common';
import firebase from 'firebase/app';

const userRef = db.collection('users');
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export const changeUsername = (username, email, currentPassword, newPassword) => {
  return async (dispatch) => {
    const user = auth.currentUser;
    const uid = user.uid;
    let check = true;

    if (isValidInput(email, newPassword) !== 2 && isValidInput(currentPassword) === 1) {
      return false;
    }

    if (isValidInput(currentPassword) === 0 && isValidInput(email, newPassword) === 2) {
      check = window.confirm('ユーザー名のみ変更しますか？');
    }

    if (check) {
      userRef
      .doc(uid).set({
        username: username,
      }, {merge: true})
      .then(() => {
        return userRef
        .doc(uid).get()
        .then(snapshot => {
          const data = snapshot.data();
          if (!data) {
            throw new Error('ユーザーデータが存在しません。');
          }
      
          dispatch(updateUserStateAction({
            auth: data.auth,
            isSignedIn: data.isSignedIn,
            means: data.means,
            uid: uid,
            username: username
          }));
        })
      })
      .catch(error => {
        throw new Error(error);
      })

      if (isValidInput(email, newPassword) === 2) {
        alert('ユーザー名が変更されました。');
        dispatch(push('/'));
      }
    }
  }
}

export const changeEmailorPassword = (email, currentPassword, newPassword, confirmPassword) => {
  return async (dispatch) => {
    if (isValidInput(email, currentPassword, newPassword, confirmPassword) === 4) {
      return false;
    }

    if (isValidInput(currentPassword) === 0 && isValidInput(email, newPassword, confirmPassword) === 3) {
      return false;
    }

    if (isValidInput(currentPassword) === 1 && isValidInput(email, newPassword, confirmPassword) < 3) {
      alert('現在のパスワードを入力してください');
      return false;
    }
    
    if (email.length > 0 && !isValidEmailFormat(email)) {
      alert('メールアドレスの形式が正しくありません。');
      return false;
    }

    if (newPassword !== confirmPassword) {
      alert('パスワードが一致しません。もう1度お試しください。')
      return false;
    }
    
    if (0 < newPassword.length && newPassword.length < 6) {
      alert('パスワードは6文字以上で入力してください。')
      return false;
    }

    const user = auth.currentUser;
    const uid = user.uid;
    const credential = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);

    user
    .reauthenticateWithCredential(credential)
    .then(() => {
      if (isValidInput(newPassword) === 0) {
        user
        .updatePassword(newPassword)
        .then(() => {
          alert('パスワードの変更が完了しました。再度、サインインをしてください。');
          dispatch(signOut());
        })
        .catch(() => {
          alert('パスワードの変更が失敗しました。もう一度お試しください。');
        })
      } else {
        userRef
        .doc(uid).set({
          means: email,
        }, {merge: true})
        .then(() => {
          user
          .updateEmail(email)
          .then(() => {
            alert('メールアドレスの変更が完了しました。再度、サインインをしてください。');
            dispatch(signOut());
          })
          .catch(() => {
            alert('メールアドレスの変更が失敗しました。もう一度お試しください。');
          });
        })
        .catch(error => {
          console.log(error);
        })
      }
    })
    .catch(error => {
      alert('パスワードが間違っています。');
      console.log(error);
    });
  }
}

export const deleteUser = (currentPassword) => {
  return async (dispatch) => {
    if (!isValidRequiredInput(currentPassword)) {
      return false;
    }

    const user = auth.currentUser;
    if (user !== null) {
    const credential = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    const uid = user.uid;

    user
    .reauthenticateWithCredential(credential)
    .then(() => {
      userRef
      .doc(uid).delete()
      .then(() => {
        user.delete()
        .then(() => {
          alert('アカウントを削除しました。');
          dispatch(signOutAction());
          dispatch(push('/signin'));
        })
        .catch(() => {
          alert('アカウントの削除が失敗しました。');
        })
      })
      .catch(error => {
        console.log(error);
      });
    })
    .catch(() => {
      alert('パスワードが間違っています。');
    });
  }
  }
}

export const facebookSignIn = () => {
  return async (dispatch) => {
    return auth
    .signInWithPopup(facebookProvider)
    .then(result => {
      const user = result.user;
      
      if (user) {
        const uid = user.uid;
        const timestamp = FirebaseTimestamp.now();

        const userInitialData = {
          auth: 'facebook',
          created_at: timestamp,
          means: user.email,
          uid: uid,
          updated_at: timestamp,
          username: user.displayName
        }

        userRef
        .doc(uid).set(userInitialData)
        .then(() => {
          dispatch(push('/'));
        })
        .catch(error => {
          throw new Error(error);
        })
      }
    })
  }
}

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged(user => {
      if (user) {
        const uid = user.uid;

        userRef
        .doc(uid).get()
        .then(snapshot => {
          const data = snapshot.data();
          if (!data) {
            throw new Error('ユーザーデータが存在しません。');
          }

          dispatch(signInAction({
            auth: data.auth,
            isSignedIn: true,
            means: data.means,
            uid: uid,
            username: data.username
          }));
        })
        .catch(error => {
          throw new Error(error);
        })
      } else {
        dispatch(push('/signin'));
      }
    })
  }
}

export const resetPassword = (email) => {
  return async (dispatch) => {
    if (!isValidEmailFormat(email)) {
      alert('メールアドレスの形式が正しくありません。');
      return false;
    } else {
      return auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert('入力されたアドレス宛にパスワードリセットのメールをお送りしましたのでご確認ください。');
        dispatch(push('/signin'));
      })
      .catch(() => {
        alert('登録されていないメールアドレスです。もう一度ご確認ください。');
      })
    }
  }
}

export const signIn = (email, password) => {
  return async (dispatch) => {
    if (!isValidRequiredInput(email, password)) {
      alert('メールアドレスまたはパスワードが未入力です。');
      return false;
    }

    if (!isValidEmailFormat(email)) {
      alert('メールアドレスの形式が正しくありません。');
      return false;
    }

    return auth
    .signInWithEmailAndPassword(email, password)
    .then(result => {
      const user = result.user;
      const uid = user.uid;

      if (!user) {
        throw new Error('ユーザーIDを取得できません');
      }

      return userRef
      .doc(uid).get()
      .then(snapshot => {
        const data = snapshot.data();
        if (!data) {
          throw new Error('ユーザーデータが存在しません');
        }

        dispatch(signInAction({
          auth: 'password',
          isSignedIn: true,
          means: data.means,
          uid: uid,
          username: data.username
        }));

        dispatch(push('/'));
      })
    })
    .catch(() => {
      alert('ユーザー情報がありません。アカウント登録をしてください。');
    })
  }
}

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    if (!isValidRequiredInput(username, email, password, confirmPassword)) {
      alert('必須項目が未入力です。');
      return false;
    }

    if (!isValidEmailFormat(email)) {
      alert('メールアドレスの形式が正しくありません。もう1度お試しください。')
      return false;
    }

    if (password !== confirmPassword) {
      alert('パスワードが一致しません。もう1度お試しください。')
      return false;
    }

    if (password.length < 6) {
      alert('パスワードは6文字以上で入力してください。')
      return false;
    }

    return auth
    .createUserWithEmailAndPassword(email, password)
    .then(result => {
      const user = result.user;

      if (user) {
        const uid = user.uid;
        const timestamp = FirebaseTimestamp.now();

        const userInitialData = {
          auth: 'password',
          created_at: timestamp,
          means: email,
          uid: uid,
          updated_at: timestamp,
          username: username,
        }

        userRef
        .doc(uid).set(userInitialData)
        .then(() => {
          alert('アカウント登録が完了しました。');
          dispatch(push('/'));
        })
        .catch(error => {
          throw new Error(error);
        })
      }
    })
    .catch(error => {
      alert('アカウント登録に失敗しました。もう1度お試しください。');
      throw new Error(error);
    })
  }
}

export const signOut = () => {
  return async (dispatch) => {
    auth
    .signOut()
    .then(() => {
      dispatch(signOutAction());
      dispatch(push('/signin'));
    })
    .catch(() => {
      throw new Error('ログアウトに失敗しました。');
    })
  }
};