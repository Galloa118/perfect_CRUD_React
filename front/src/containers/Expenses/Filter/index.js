import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUserRole } from 'containers/App/selectors';
import { selectColumnWidths } from 'containers/Expenses/selectors';
import TextField from 'material-ui/TextField';
import ExpensesItemRow from 'components/ExpensesItemRow';
import {
  ExpensesItemColumnId,
  ExpensesItemColumnUser,
  ExpensesItemColumnAmount,
  ExpensesItemColumnDate,
  ExpensesItemColumnComment,
  ExpensesItemColumnDescription,
  ExpensesItemColumnEdit,
} from 'components/ExpensesItemColumn';
import { updateFilter } from './actions';

const fieldStyle = {
  width: '100%',
};

export const ExpensesFilter = ({ role, widths, handleUpdate }) => {
  const columns = [];
  columns.push(
    <ExpensesItemColumnId key="id" width={widths.id} />
  );

  if (role === 300) {
    columns.push(
      <ExpensesItemColumnUser key="user" width={widths.user} >
        <TextField
          name="user"
          style={fieldStyle}
          onChange={handleUpdate('user')}
        />
      </ExpensesItemColumnUser>
    );
  }

  columns.push(
    <ExpensesItemColumnAmount key="amount" width={widths.amount} >
      <TextField
        name="amount"
        style={fieldStyle}
        onChange={handleUpdate('amount')}
      />
    </ExpensesItemColumnAmount>
  );
  columns.push(
    <ExpensesItemColumnDate key="date" width={widths.date} />
  );
  columns.push(
    <ExpensesItemColumnComment key="comment" width={widths.comment} >
      <TextField
        name="comment"
        style={fieldStyle}
        onChange={handleUpdate('comment')}
      />
    </ExpensesItemColumnComment>
  );
  columns.push(
    <ExpensesItemColumnDescription key="description" width={widths.description} >
      <TextField
        name="description"
        style={fieldStyle}
        onChange={handleUpdate('description')}
      />
    </ExpensesItemColumnDescription>
  );
  columns.push(
    <ExpensesItemColumnEdit key="edit" width={widths.edit} />
  );

  return (
    <ExpensesItemRow>
      {columns}
    </ExpensesItemRow>
  );
};

export const mapStateToProps = createStructuredSelector({
  role: selectUserRole(),
  widths: selectColumnWidths(),
});

export const mapDispatchToProps = dispatch => ({
  handleUpdate: field => ev => dispatch(updateFilter({ field, value: ev.target.value })),
});

ExpensesFilter.propTypes = {
  role: PropTypes.number.isRequired,
  widths: PropTypes.object.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesFilter);