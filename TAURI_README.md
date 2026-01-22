# BCM Operate Display - Tauri Desktop App

This project has been configured to build as a desktop application using Tauri.

## App Details

- **Product Name**: BCM Operate Display
- **Bundle ID**: com.ey.bcmoperatedisplay
- **Window Size**: 1920x1080 (Full HD)

## Prerequisites

### macOS
```bash
# Install Xcode Command Line Tools
xcode-select --install

# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### Windows
1. Install [Microsoft Visual Studio C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
2. Install [Rust](https://www.rust-lang.org/tools/install)
3. Install [WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)

## Development

### Run in Development Mode
```bash
npm run tauri:dev
```

This will:
1. Start the React development server on `http://localhost:3000`
2. Launch the Tauri desktop window
3. Enable hot-reload for both frontend and Rust code

## Building

### Build Desktop Installers
```bash
npm run tauri:build
```

This will create installers in `src-tauri/target/release/bundle/`:

**macOS:**
- `BCM Operate Display.app` - Application bundle
- `BCM Operate Display.dmg` - Disk image installer

**Windows:**
- `BCM Operate Display.msi` - MSI installer
- `BCM Operate Display.exe` - NSIS installer

**Linux:**
- `.deb` and `.AppImage` packages

## Configuration

The Tauri configuration is located at `src-tauri/tauri.conf.json`:

```json
{
  "productName": "BCM Operate Display",
  "identifier": "com.ey.bcmoperatedisplay",
  "build": {
    "frontendDist": "../build",
    "devUrl": "http://localhost:3000"
  }
}
```

## Project Structure

```
operate-experience/
├── src/                    # React source code
├── public/                 # Static assets
├── src-tauri/             # Tauri Rust backend
│   ├── src/               # Rust source code
│   ├── icons/             # App icons
│   ├── Cargo.toml         # Rust dependencies
│   └── tauri.conf.json    # Tauri configuration
└── package.json           # Node dependencies
```

## Troubleshooting

### macOS: "App is damaged" error
```bash
xattr -cr "/Applications/BCM Operate Display.app"
```

### Windows: Missing WebView2
Download and install from: https://developer.microsoft.com/en-us/microsoft-edge/webview2/

### Build fails
1. Ensure Rust is installed: `rustc --version`
2. Update Rust: `rustup update`
3. Clear build cache: `rm -rf src-tauri/target`

## Resources

- [Tauri Documentation](https://tauri.app)
- [Tauri API Reference](https://tauri.app/v1/api/js/)
- [Rust Documentation](https://doc.rust-lang.org/)
