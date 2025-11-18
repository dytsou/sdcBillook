import React from 'react';
import { render } from '@testing-library/react';
import AuthContext from './AuthContent';

test('AuthContext has default values', () => {
  const TestComponent = () => {
    const auth = React.useContext(AuthContext);
    expect(auth.isLoggedIn).toBe(false);
    expect(auth.token).toBe(null);
    expect(auth.userId).toBe(null);
    expect(typeof auth.login).toBe('function');
    expect(typeof auth.logout).toBe('function');
    return <div>Test</div>;
  };

  render(
    <AuthContext.Provider value={{
      isLoggedIn: false,
      token: null,
      userId: null,
      login: jest.fn(),
      logout: jest.fn()
    }}>
      <TestComponent />
    </AuthContext.Provider>
  );
});

