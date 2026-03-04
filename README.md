# Design Patterns in TypeScript

A hands-on demo project showcasing **15 classic GoF design patterns** implemented in TypeScript, alongside **functional programming equivalents** that solve the same problems with less code.

---

## 📦 Project Structure

```
src/
├── index.ts                  # Demo runner entry point
├── patterns/
│   ├── creational/           # Singleton, Factory Method, Abstract Factory, Builder, Prototype
│   ├── structural/           # Adapter, Decorator, Facade, Proxy, Composite
│   └── behavioral/           # Observer, Strategy, Command, State, Template Method
└── functional/               # FP equivalents of common patterns
    ├── strategy-fp.ts
    ├── factory-fp.ts
    ├── observer-fp.ts
    ├── command-fp.ts
    ├── decorator-fp.ts
    └── builder-fp.ts
```

---

## 🗂️ Patterns Covered

### Creational
| Pattern | Description |
|---|---|
| Singleton | Ensures a single global instance |
| Factory Method | Defers object creation to subclasses |
| Abstract Factory | Creates families of related objects |
| Builder | Constructs complex objects step by step |
| Prototype | Clones existing objects |

### Structural
| Pattern | Description |
|---|---|
| Adapter | Converts one interface into another |
| Decorator | Adds responsibilities dynamically |
| Facade | Simplifies access to a complex subsystem |
| Proxy | Controls access to an object |
| Composite | Treats individual and grouped objects uniformly |

### Behavioral
| Pattern | Description |
|---|---|
| Observer | Notifies multiple objects of state changes |
| Strategy | Swaps interchangeable algorithms at runtime |
| Command | Encapsulates requests as objects |
| State | Alters object behaviour based on internal state |
| Template Method | Defines an algorithm skeleton with customizable steps |

### Functional Equivalents (`src/functional/`)
Each pattern above has a functional counterpart demonstrating how closures, higher-order functions, and plain objects can replace class hierarchies.

---

## 🛠️ Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

---

## 🔧 Build

Install dependencies and compile TypeScript:

```bash
npm install
npm run build
```

Compiled output lands in `dist/`.

---

## 🚀 Running the Demos

### Run all OOP patterns
```bash
npm run demo
```

### Run all functional (FP) pattern equivalents
```bash
npm run demo:fp
```

### Run a specific pattern
```bash
# OOP patterns
npm run demo singleton
npm run demo factory-method
npm run demo abstract-factory
npm run demo builder
npm run demo prototype
npm run demo adapter
npm run demo decorator
npm run demo facade
npm run demo proxy
npm run demo composite
npm run demo observer
npm run demo strategy
npm run demo command
npm run demo state
npm run demo template-method

# Functional equivalents
npm run demo fp-strategy
npm run demo fp-factory
npm run demo fp-observer
npm run demo fp-command
npm run demo fp-decorator
npm run demo fp-builder
npm run demo fp-all
```

### Show available patterns
```bash
npm run demo:help
```
---

## ⚙️ Tech Stack

| Tool | Version |
|---|---|
| TypeScript | ^5.9 |
| Node.js module system | ESM (`"type": "module"`) |
| Compiler target | ESNext |
