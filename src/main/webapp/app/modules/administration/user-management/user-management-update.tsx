import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getUser, getRoles, updateUser, createUser, reset } from './user-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const UserManagementUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { login } = useParams<'login'>();
  const isNew = login === undefined;

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getUser(login));
    }
    dispatch(getRoles());
    return () => {
      dispatch(reset());
    };
  }, [login]);

  const handleClose = () => {
    navigate('/admin/user-management');
  };

  const saveUser = values => {
    if (isNew) {
      dispatch(createUser(values));
    } else {
      dispatch(updateUser(values));
    }
    handleClose();
  };

  const isInvalid = false;
  const user = useAppSelector(state => state.userManagement.user);
  const loading = useAppSelector(state => state.userManagement.loading);
  const updating = useAppSelector(state => state.userManagement.updating);
  const authorities = useAppSelector(state => state.userManagement.authorities);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1>Stwórz lub edytuj użytkownika</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm onSubmit={saveUser} defaultValues={user}>
              {user.id ? <ValidatedField type="text" name="id" required readOnly label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                type="text"
                name="login"
                label="Login"
                validate={{
                  required: {
                    value: true,
                    message: 'Twój login jest wymagany.',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                    message: 'Niewłaściwa nazwa użytkownika.',
                  },
                  minLength: {
                    value: 1,
                    message: 'Twój login musi mieć długość co najmniej 1 znaku',
                  },
                  maxLength: {
                    value: 50,
                    message: 'Twój login nie może być dłuższy niż 50 znaków',
                  },
                }}
              />
              <ValidatedField
                type="text"
                name="firstName"
                label="Imię"
                validate={{
                  maxLength: {
                    value: 50,
                    message: 'Wartość nie może być dłuższa niż 50 znaków.',
                  },
                }}
              />
              <ValidatedField
                type="text"
                name="lastName"
                label="Nazwisko"
                validate={{
                  maxLength: {
                    value: 50,
                    message: 'Wartość nie może być dłuższa niż 50 znaków.',
                  },
                }}
              />
              <FormText>This field cannot be longer than 50 characters.</FormText>
              <ValidatedField
                name="email"
                label="Email"
                placeholder="Twój email"
                type="email"
                validate={{
                  required: {
                    value: true,
                    message: 'Twój email jest wymagany.',
                  },
                  minLength: {
                    value: 5,
                    message: 'Twój email musi mieć przynajmniej 5 znaków',
                  },
                  maxLength: {
                    value: 254,
                    message: 'Twój email nie może być dłuższy niż 50 znaków',
                  },
                  validate: v => isEmail(v) || 'Twój email jest błędny.',
                }}
              />
              <ValidatedField type="checkbox" name="activated" check value={true} disabled={!user.id} label="Aktywny" />
              <ValidatedField type="select" name="authorities" multiple label="Profile">
                {authorities.map(role => (
                  <option value={role} key={role}>
                    {role}
                  </option>
                ))}
              </ValidatedField>
              <Button tag={Link} to="/admin/user-management" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Wstecz</span>
              </Button>
              &nbsp;
              <Button color="primary" type="submit" disabled={isInvalid || updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Zapisz
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default UserManagementUpdate;