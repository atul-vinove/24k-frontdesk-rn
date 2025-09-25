# Commit Guidelines

## Commit Message Format

Use the following format for commit messages:

```
type(scope): description

[optional body]

[optional footer]
```

## Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks, dependency updates

## Scopes

- **auth**: Authentication related changes
- **form**: Visitor form functionality
- **ui**: UI components and styling
- **api**: API integration
- **storage**: Data storage and persistence
- **theme**: Theme and styling changes
- **config**: Configuration changes

## Examples

```
feat(auth): add login screen with branch selection
fix(form): resolve signature capture issue on Android
docs(readme): update installation instructions
style(theme): update color palette for better contrast
refactor(api): simplify visitor submission logic
test(form): add unit tests for form validation
chore(deps): update react-hook-form to latest version
```

## Best Practices

- Keep commit messages concise but descriptive
- Use imperative mood ("add" not "added")
- Capitalize the first letter of the description
- Don't end with a period
- Reference issues when applicable: `fixes #123`
- Make atomic commits - one logical change per commit
