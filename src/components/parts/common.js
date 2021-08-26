import HTMLReactParser from 'html-react-parser';

export const datetimeToString = (dt) => {
  return dt.getFullYear() + '-'
    + ('00' + (dt.getMonth()+1)).slice(-2) + '-'
    + ('00' + dt.getDate()).slice(-2);
};

export const isValidEmailFormat = (email) => {
  const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
  return regex.test(email);
}

export const isValidInput = (...args) => {
  let validator = 0;
  for (let i=0; i < args.length; i=(i+1)|0) {
      if (args[i] === "") {
          validator++;
      }
  }
  return validator;
};

export const isValidRequiredInput = (...args) => {
  let validator = true;
  for (let i=0; i < args.length; i=(i+1)|0) {
      if (args[i] === "") {
          validator = false;
      }
  }
  return validator;
};

export const getDate = () => {
  const today = new Date();
  today.setDate(today.getDate());
  const year = today.getFullYear();
  const month = ("0"+(today.getMonth()+1)).slice(-2);
  const date = ("0"+today.getDate()).slice(-2);
  return year + '-' + month + '-' + date;
}

export const returncodeToBr = (text) => {
  if (text === "") {
    return text;
  } else {
    return HTMLReactParser(text.replace(/\r?\n/g, '<br/>'));
  }
};