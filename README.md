# Engine

**Engine** is an open-source, block-based 3D coding environment designed to make spatial programming intuitive and accessible. By leveraging a visual interface, it allows users to build and manipulate 3D worlds without needing to master complex syntax first.

---

### Key Features

* **Visual 3D Logic:** Use familiar block-based programming to control objects, physics, and environments in a 3D space.
* **Real-time Rendering:** See your code come to life instantly in the integrated 3D viewport.
* **Modular Design:** Built with extensibility in mind, allowing for custom blocks and workspace configurations.
* **Web-Based:** Runs entirely in the browser, requiring no complex installation or local environment setup.

---

### Wiki / Documentation

For detailed guides on how to use the tool, create custom workspaces, or contribute to the engine, please visit our **[Wiki](_docs/Home.md)**.

### Getting Started

1. **Explore the Editor:** Open `index.md` (or the hosted GitHub Pages site) to launch the environment.
2. **Pick a Workspace:** Choose from pre-configured layouts in the `_workspaces` directory.
3. **Run Your Code:** Snap blocks together and hit play to see your 3D creation move.

---

### Technical Overview

The engine is built using a combination of Python for logic verification and JavaScript for the frontend experience.

* **Validation:** Uses `verify_collision.py` and `verify_popup_variables.py` to ensure workspace integrity.
* **Layouts:** Managed via Jekyll-style `_layouts` and `_config.yml` for easy web deployment.

### Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
