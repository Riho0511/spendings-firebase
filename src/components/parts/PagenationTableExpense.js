import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { datetimeToString, returncodeToBr } from './common';
import { deleteExpense } from '../../redux/spendings/operations';
import { db } from '../../firebase';
import { push } from 'connected-react-router';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 700,
  },
  head: {
    backgroundColor: 'gray',
  },
  cell: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgb(238, 237, 237)'
    }
  },
  white: {
    fontSize: 15,
    color: 'white'
  }
});

const PagenationTableExpense = (props) => {
  const classes = useStyles2();
  const dispatch = useDispatch();
  const expense = props.expense;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [categories, setCategories] = useState([]);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, expense.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const changeCategory = (categories, category) => {
    for (let i=0; i < categories.length; i++) {
      if (categories[i].id === category) {
        return categories[i].name; 
      }
    }
  };

  useEffect(() => {
    db.collection('categoriesExpense')
    .orderBy('order', 'asc')
    .get()
    .then(snapshots => {
      const list = [];
      snapshots.forEach(snapshot => {
        const data = snapshot.data();
        list.push({
          id: data.id,
          name: data.name
        })
      })
      setCategories(list);
    })
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead className={classes.head}>
          <TableRow>
            <TableCell className={classes.white} align="center">日付</TableCell>
            <TableCell className={classes.white} align="center">カテゴリー</TableCell>
            <TableCell className={classes.white} align="center">内容</TableCell>
            <TableCell className={classes.white} align="center">金額</TableCell>
            <TableCell className={classes.white} align="center">メモ</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? expense.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : expense
          ).map(row => (
            <TableRow key={row.expenseId}>
              <TableCell align='center'>
                {datetimeToString(row.date.toDate())}
              </TableCell>
              <TableCell align="center">
                {changeCategory(categories, row.category)}
              </TableCell>
              <TableCell align="center">
                {row.content}
              </TableCell>
              <TableCell align="center">
                {row.money.toLocaleString()}
              </TableCell>
              <TableCell align="center">
                {returncodeToBr(row.memo)}
              </TableCell>
              <TableCell align='center'>
                <IconButton onClick={() => dispatch(push('/edit/expense/'+ row.expenseId))}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => dispatch(deleteExpense(row.expenseId))}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={7} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, { label: 'All', value: -1 }]}
              colSpan={7}
              count={expense.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default PagenationTableExpense;