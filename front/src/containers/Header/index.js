import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Paper from 'material-ui/Paper';
import { blue400 } from 'material-ui/styles/colors';
import Logo from 'components/Logo';
import { logout } from 'containers/App/actions';
import { createStructuredSelector } from 'reselect';
import { selectUserRole } from 'containers/App/selectors';
import Button from './Button';

const style = {
  backgroundColor: blue400,
  height: '56px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px',
};

export const Header = (props) => {
  const {
    handleLogout,
    goToExpenses,
    goToReports,
    goToUsers,
    userRole,
    location: { pathname },
  } = props;
  const headerItems = [];
  const headerMiddleItems = [];
  const headerLogo = (
    <Logo
      key="header-logo"
    />
  );
  const headerMiddleExpenses = (
    <Button
      active={pathname === '/expenses'}
      label="Expenses"
      key="header-middle-expenses"
      handleClick={goToExpenses}
    />
  );
  const headerMiddleReports = (
    <Button
      active={pathname === '/reports'}
      label="Reports"
      key="header-middle-reports"
      handleClick={goToReports}
    />
  );
  const headerMiddleUsers = (
    <Button
      active={pathname === '/users'}
      label="Users"
      key="header-middle-users"
      handleClick={goToUsers}
    />
  );
  const headerLogout = (
    <Button
      active={false}
      label="Logout"
      key="header-logout
      " handleClick={handleLogout}
    />
  );

  headerItems.push(headerLogo);
  if (userRole >= 100) {
    headerMiddleItems.push(headerMiddleExpenses);
    headerMiddleItems.push(headerMiddleReports);
  }
  if (userRole >= 200) headerMiddleItems.push(headerMiddleUsers);
  headerItems.push(<div key="header-middle">{headerMiddleItems}</div>);
  if (userRole >= 100) headerItems.push(headerLogout);

  return (
    <Paper style={style} className="header-w">
      {headerItems}
    </Paper>
  );
};

Header.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  goToExpenses: PropTypes.func.isRequired,
  goToReports: PropTypes.func.isRequired,
  goToUsers: PropTypes.func.isRequired,
  userRole: PropTypes.number.isRequired,
  location: PropTypes.object.isRequired,
};

export const mapStateToProps = createStructuredSelector({
  userRole: selectUserRole(),
});

export const mapDispatchToProps = dispatch => ({
  handleLogout: () => dispatch(logout()),
  goToExpenses: () => dispatch(push('/expenses')),
  goToReports: () => dispatch(push('/reports')),
  goToUsers: () => dispatch(push('/users')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
