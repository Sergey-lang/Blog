import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginFormSchema } from '../../../utils/validations';
import { FormField } from '../../FormField';
import { LoginDto } from "../../../utils/api/types";
import Alert from '@material-ui/lab/Alert';
import { UserApi } from "../../../utils/api/user";
import { setCookie } from "nookies";
import { useAppDispatch } from "../../../redux/hooks";
import { setUserData } from "../../../redux/slices/user";
import { Api } from "../../../utils/api";

interface LoginFormProps {
  onOpenRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onOpenRegister }) => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState('')
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = async (dto: LoginDto) => {
    try {
      const data = await Api().user.login(dto)
      setCookie(null, 'rtoken', data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      })
      setErrorMessage('')
      dispatch(setUserData(data))
    } catch (err) {
      console.warn('Register error', err);
      if (err.response) {
        setErrorMessage(err.response.data.message)
      }
    }
  };

  console.log(form.formState.errors);

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField name="email" label="Почта" />
          <FormField name="password" label="Пароль" />
          {errorMessage && <Alert severity="error" className='mb-20'>{errorMessage}</Alert>}
          <div className="d-flex align-center justify-between">
            <Button disabled={!form.formState.isValid || form.formState.isSubmitting} type="submit" color="primary"
                    variant="contained">
              Войти
            </Button>
            <Button onClick={onOpenRegister} color="primary" variant="text">
              Регистрация
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
