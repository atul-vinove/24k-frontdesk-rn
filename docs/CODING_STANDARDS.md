# Coding Standards

## General Principles

- Write **clean, simple, and readable** code
- Implement features in the **simplest possible way**
- **Keep files small and focused**—avoid unnecessary complexity
- **Test after every meaningful change** to ensure functionality
- **Focus on core functionality before optimization**—don't optimize prematurely
- Use **clear, consistent, and descriptive naming** for variables, functions, and files
- Always **modularize** the code for better reusability and maintenance

## TypeScript Guidelines

- Use strict TypeScript mode
- Use path aliases for cleaner imports (e.g., `@/components`, `@/screens`)
- Define proper interfaces and types for all data structures
- Avoid `any` type - use proper typing
- Use const assertions where appropriate

## React Native Best Practices

- Use functional components with hooks
- Keep components small and focused on single responsibility
- Use proper prop types and interfaces
- Implement proper error boundaries
- Use responsive design patterns with `react-native-responsive-screen`

## File Organization

- Group related files in appropriate folders
- Use index files for clean exports
- Keep component files under 200 lines when possible
- Separate business logic from UI components

## Naming Conventions

- Use PascalCase for components: `VisitorForm.tsx`
- Use camelCase for functions and variables: `handleSubmit`
- Use UPPER_SNAKE_CASE for constants: `API_BASE_URL`
- Use descriptive names that explain intent

## Error Handling

- Always handle errors gracefully
- Provide meaningful error messages to users
- Log errors appropriately for debugging
- Use try-catch blocks for async operations

## Performance

- Use React.memo for expensive components
- Implement proper list virtualization for large datasets
- Optimize images and assets
- Avoid unnecessary re-renders
