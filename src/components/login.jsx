import React, { Component } from 'react';
import styled from 'styled-components';
import { HeaderWithoutLogout } from './header';
import { login } from '../services/authService';
import { Navigate } from 'react-router-dom';



class Login extends Component {
  state = {
    email: '',
    senha: '',
    redirectToReferrer: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, senha } = this.state;
    try {
      const data = await login(email, senha);
      console.log('Login realizado com sucesso:', data);
      this.setState({ redirectToReferrer: true });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };
  
  render() {
    const { email, senha, redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Navigate to="/meus-alunos" />;
    }

    return (
      <>
        <HeaderWithoutLogout />
        <LoginContainer>
          <LoginForm onSubmit={this.handleSubmit}>
            <h2>Login - Sistema de Notas</h2>
            <Input
              type="text"
              name="email"
              value={email}
              onChange={this.handleChange}
              placeholder="E-mail"
              required
            />
            <Input
              type="password"
              name="senha"
              value={senha}
              onChange={this.handleChange}
              placeholder="Senha"
              required
            />
            <Button type="submit">Login</Button>
          </LoginForm>
        </LoginContainer>
      </>
    );
  }
}

export default Login;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  margin-top: 50px;
  background-color: #caf0f8;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;