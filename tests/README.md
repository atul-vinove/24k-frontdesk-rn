# Testing Guide

## Testing Setup

This project uses Jest and React Native Testing Library for testing.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Test Structure

```
/tests
  /components     → Component unit tests
  /hooks         → Custom hook tests
  /utils         → Utility function tests
  /integration   → Integration tests
  /__mocks__     → Mock files
```

## Writing Tests

### Component Tests

```typescript
import { render, fireEvent } from '@testing-library/react-native';
import { VisitorForm } from '@/components/VisitorForm';

describe('VisitorForm', () => {
  it('should render all form fields', () => {
    const { getByPlaceholderText } = render(<VisitorForm />);
    
    expect(getByPlaceholderText('Name')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Phone')).toBeTruthy();
  });

  it('should validate required fields', () => {
    const { getByText, getByTestId } = render(<VisitorForm />);
    
    fireEvent.press(getByTestId('submit-button'));
    
    expect(getByText('Name is required')).toBeTruthy();
  });
});
```

### Hook Tests

```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import { useAuthStore } from '@/state/authStore';

describe('useAuthStore', () => {
  it('should login user', () => {
    const { result } = renderHook(() => useAuthStore());
    
    act(() => {
      result.current.login({ id: '1', email: 'test@test.com', branch: 'main', token: 'token' });
    });
    
    expect(result.current.isAuthenticated).toBe(true);
  });
});
```

## Testing Best Practices

- Test user interactions, not implementation details
- Use meaningful test descriptions
- Keep tests simple and focused
- Mock external dependencies
- Test error scenarios
- Use proper cleanup in tests
