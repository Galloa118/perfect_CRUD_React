import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import ItemRow from 'components/ItemRow';
import {
  UsersItemColumnId,
  UsersItemColumnEmail,
  UsersItemColumnRole,
  UsersItemColumnEdit,
} from 'components/UsersItemColumn';
import ActionIcons from './ActionIcons';

const roleToRoleLabel = (role, labels) => labels.find(item => item[0] === role)[1];

const UsersItem = ({ user, userRoleLabels }) => (
  <ItemRow>
    <UsersItemColumnId>
      {user.get('id')}
    </UsersItemColumnId>
    <UsersItemColumnEmail>
      {user.get('email')}
    </UsersItemColumnEmail>
    <UsersItemColumnRole>
      {roleToRoleLabel(user.get('role'), userRoleLabels)}
    </UsersItemColumnRole>
    <UsersItemColumnEdit>
      <ActionIcons user={user} />
    </UsersItemColumnEdit>
  </ItemRow>
);

UsersItem.propTypes = {
  userRoleLabels: PropTypes.array.isRequired,
  user: PropTypes.instanceOf(Map),
};

export default UsersItem;