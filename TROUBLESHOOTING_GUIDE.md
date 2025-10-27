# Troubleshooting npm run dev Issues

## Common Issues After Package Upgrades

### 1. Dependency Installation Issues

**Problem**: Packages not installed correctly after upgrades
**Solution**:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# If that fails, try with legacy peer deps
npm install --legacy-peer-deps

# Or force install
npm install --force
```

### 2. Webpack Configuration Issues

**Problem**: Webpack configs not compatible with new versions
**Solution**: Check these files for issues:

#### webpack/client.js
- Make sure `{ merge }` import is correct
- Check if all loaders are compatible with webpack 5

#### webpack/common.js
- Verify CopyWebpackPlugin uses `patterns` array
- Check if all plugins are webpack 5 compatible

### 3. Babel Configuration Issues

**Problem**: Babel not processing files correctly
**Solution**: Check `.babelrc`:
```json
{
    "presets": [
        ["@babel/preset-env", {
            "targets": { "node": "current", "browsers": ["last 2 versions", "IE 11"] },
            "useBuiltIns": "usage",
            "corejs": 3
        }],
        "@babel/preset-react"
    ],
    "plugins": [
        ["@babel/plugin-transform-class-properties", { "loose": true }],
        ["@babel/plugin-transform-private-methods", { "loose": true }],
        ["@babel/plugin-transform-runtime"],
        "@babel/plugin-syntax-dynamic-import"
    ]
}
```

### 4. React Router v6 Issues

**Problem**: React Router v6 breaking changes
**Solution**: Make sure all route components are updated:

#### Check src/client/index.js
- Uses `Routes` instead of `Switch`
- Uses `element` prop instead of `component`
- Uses `BrowserRouter` instead of `Router`

#### Check src/server/index.js
- Uses `Routes` instead of `Switch`
- Uses `element` prop instead of `component`
- Uses `StaticRouter` correctly

### 5. React Helmet Async Issues

**Problem**: React Helmet not working with React 18
**Solution**: Make sure HelmetProvider is wrapped around the app:

```javascript
import { HelmetProvider } from 'react-helmet-async';

// In both client and server
<HelmetProvider>
  <Provider store={store}>
    {/* App content */}
  </Provider>
</HelmetProvider>
```

### 6. Missing Dependencies

**Problem**: Some packages might be missing after upgrades
**Solution**: Add these if missing:

```bash
npm install --save-dev @babel/plugin-transform-runtime
npm install --save-dev webpack-merge
npm install --save-dev cross-env
npm install --save-dev npm-run-all
```

### 7. Node.js Version Issues

**Problem**: Node.js version not compatible
**Solution**: 
```bash
# Check Node version (should be 16+)
node --version

# If using nvm, switch to compatible version
nvm use 18
```

### 8. Port Conflicts

**Problem**: Port 8080 already in use
**Solution**:
```bash
# Check what's using port 8080
netstat -ano | findstr :8080

# Kill the process (Windows)
taskkill /PID <PID> /F
```

## Step-by-Step Fix Process

### Step 1: Clean Install
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Step 2: Test Individual Components
```bash
# Test babel
npx babel src/index.js --out-file test.js

# Test webpack config
npx webpack --config webpack/client.js --dry-run
```

### Step 3: Check for Syntax Errors
```bash
# Check JavaScript syntax
npx eslint src/**/*.js --fix

# Check for missing imports
grep -r "import.*from" src/ | grep -v "node_modules"
```

### Step 4: Test Alternative Commands
```bash
# Try watch instead of dev
npm run watch

# Try app-start directly
npm run app-start

# Try with nodemon
npx nodemon src/index.js
```

### Step 5: Check Environment Variables
```bash
# Set NODE_ENV if not set
set NODE_ENV=development

# Check if it's set
echo %NODE_ENV%
```

## Common Error Messages and Solutions

### "Cannot resolve module"
- Check if package is installed
- Check import paths
- Check if package name is correct

### "Unexpected token"
- Check Babel configuration
- Check if babel plugins are installed
- Check for syntax errors

### "Module not found"
- Check if file exists
- Check import paths
- Check if webpack loaders are configured

### "merge is not a function"
- Update webpack-merge import to `{ merge }`

### "Cannot read property of undefined"
- Check if all required props are passed
- Check if components are properly imported

## Quick Fix Commands

```bash
# Complete reset
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run dev

# If still failing, try
npm run cleanpublic
npm run app-start

# Or use alternative
npm run watch
```

## Debug Mode

To get more detailed error information:
```bash
# Run with debug output
DEBUG=* npm run dev

# Or check webpack output
npx webpack --config webpack/client.js --verbose
```

## Final Checklist

- [ ] All dependencies installed
- [ ] Webpack configs updated for v5
- [ ] Babel config updated
- [ ] React Router v6 migration complete
- [ ] React Helmet Async setup
- [ ] No syntax errors
- [ ] Port 8080 available
- [ ] NODE_ENV set to development




