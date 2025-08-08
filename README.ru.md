# zero-guess-frontend

[![npm](https://img.shields.io/npm/v/zero-guess-frontend.svg?style=for-the-badge&logoColor=white)](https://www.npmjs.com/package/zero-guess-frontend)
[![downloads](https://img.shields.io/npm/dm/zero-guess-frontend?style=for-the-badge&logoColor=white)](https://www.npmjs.com/package/zero-guess-frontend)
[![github issues](https://img.shields.io/github/issues/LAYT73/zero-guess-frontend?&style=for-the-badge&color=E0AF68)](https://github.com/LAYT73/zero-guess-frontend/issues)
[![github last commits](https://img.shields.io/github/last-commit/LAYT73/zero-guess-frontend?style=for-the-badge&color=AD8EE6)](https://www.npmjs.com/package/zero-guess-frontend)
[![license](https://img.shields.io/npm/l/@nestjs/core.svg?style=for-the-badge&logoColor=white)](https://github.com/LAYT73/zero-guess-frontend?tab=MIT-1-ov-file)

**zero-guess-frontend** — это CLI-инструмент для быстрой и структурированной генерации React frontend проектов. Минимизирует шаблонный код, следует лучшим практикам и адаптируется под ваши задачи.

[Английская версия / English version](./README.md)

---

## 📑 Содержание

- [🚀 Возможности](#-возможности)
- [📦 Установка](#-установка)
- [⚡ Быстрый старт](#-быстрый-старт)
  - [Интерактивный режим](#вариант-1-интерактивный-режим)
  - [Опции CLI](#вариант-2-опции-cli)
- [🆘 Помощь CLI](#-помощь-cli)
- [🛠️ Создание собственных шаблонов компонентов](#️-создание-собственных-шаблонов-компонентов)
  - [1. Создать конфиг](#1-создать-конфиг)
  - [2. Создать шаблон](#2-создать-шаблон)
  - [3. Структура `.zgf.yaml`](#3-структура-zgfyaml)
  - [4. Генерация компонента](#4-генерация-компонента)
- [🏗️ Структура проекта](#️-структура-проекта)
- [❓ FAQ](#-faq)
- [📚 Документация и поддержка](#-документация-и-поддержка)
- [🧑‍💻 Автор](#-автор)
- [💡 Вклад в развитие](#-вклад-в-развитие)

---

## 🚀 Возможности

- **Инициализация React проекта** с выбором архитектуры: Feature-Sliced Design (FSD), Atomic Design или пустой.
- **Выбор языка:** TypeScript (рекомендуется) или JavaScript.
- **Автоматическая настройка** package.json, Vite, Git, .gitignore и других файлов.
- **Поддержка популярных менеджеров пакетов:** npm, yarn, pnpm.
- **Добавление шаблонов маршрутизации:** можно добавить react-router-dom с шаблонами для вашего проекта.
- **Добавление менеджера состояния с шаблонами:** Redux (Toolkit) или MobX без дополнительных действий.
- **Расширяемые шаблоны:** легко добавить свои шаблоны в папку [`templates/`](templates/).
- **Пресеты:** создавать свои пресеты через `zgf-preset` и применять их командой `zgf --preset=имя-пресета`.
- **Генерация кастомных компонентов:** создавайте файл `.zgfconfig.json` и шаблон `{componentTemplate}.zgf.yaml`, затем генерируйте компоненты в нужную папку командой `zgf g componentTemplate @alias`.
- **В планах:** Storybook, тесты, UI Kit, линтеры и другое.
- **Документация:** [Современная и полезная документация](https://layt73.github.io/zero-guess-frontend-docs/).

---

## 📦 Установка

```bash
npm install -g zero-guess-frontend
```

---

## ⚡ Быстрый старт

### Вариант 1: Интерактивный режим

```bash
zgf
```

![Demo](https://github.com/LAYT73/zero-guess-frontend-docs/blob/main/static/img/setup.gif)

Следуйте подсказкам:

- Название проекта
- Менеджер пакетов
- Язык (TypeScript / JavaScript)
- Архитектура (FSD / Atomic / Empty)
- Маршрутизация (опционально с приватными роутами)
- Менеджер состояния (RTK / Mobx / None)

### Вариант 2: Опции CLI

```bash
zgf --name=my-app --pm=yarn --lang=ts --arch=fsd --routing --private --sm=redux
```

| Опция           | Алиас | Тип     | Описание                                     |
| --------------- | ----- | ------- | -------------------------------------------- |
| `--name`        | `-n`  | string  | Название проекта                             |
| `--pm`          |       | string  | Менеджер пакетов (`npm`, `yarn`, `pnpm`)     |
| `--lang`        |       | string  | Язык (`ts`, `js`)                            |
| `--arch`        |       | string  | Архитектура (`fsd`, `atomic`, `empty`)       |
| `--routing`     |       | boolean | Добавить `react-router-dom`                  |
| `--private`     |       | boolean | Добавить приватные маршруты                  |
| `--sm`          |       | string  | Менеджер состояния (`redux`, `mobx`, `none`) |
| `--help`        |       | boolean | Показать помощь                              |
| `--version`     |       | boolean | Показать версию CLI                          |
| `--preset`      |       | string  | Создать проект по пресету                    |
| `--preset-list` |       | boolean | Вывести список пресетов                      |

---

## 🆘 Помощь CLI

Чтобы увидеть все опции CLI, выполните:

```bash
zgf --help
```

Чтобы узнать установленную версию:

```bash
zgf --version
```

Пример вывода:

```bash
Usage: zgf [options]

Options:
  --name                  Название проекта
  --pm                    Менеджер пакетов         [выбор: "npm", "yarn", "pnpm"]
  --lang                  Язык программирования    [выбор: "ts", "js"]
  --arch                  Тип архитектуры          [выбор: "fsd", "atomic", "empty"]
  --routing               Добавить react-router-dom
  --private               Добавить приватные/публичные маршруты
  --sm                    Менеджер состояния       [выбор: "redux", "mobx", "none"]
  --help                  Показать помощь
  --version               Показать версию CLI
  --preset                Создать проект по пресету
  --preset-list           Вывести список пресетов

Примеры:
  zgf --name=my-app --pm=yarn --lang=ts --arch=fsd --routing --private --sm=redux
```

Создайте свой пресет для ускорения инициализации:

```bash
zgf-preset
```

Внимание! Для корректной работы пресетов и других функций надо установить CLI глобально, как было описано раннее.

---

## 🛠️ Создание собственных шаблонов компонентов

[Пример](https://github.com/LAYT73/zero-guess-frontend/tree/main/examples)

Zero Guess Frontend позволяет создавать кастомные компоненты через шаблоны `{componentTemplate}.zgf.yaml`.

### 1. Создать конфиг

Добавьте `.zgfconfig.json` в корень проекта:

```json
{
  "components.zgf": {
    "path": "./templates/"
  },
  "alias": {
    "@components": "./src/components/"
  }
}
```

- `components.zgf.path` — путь к вашим `.zgf.yaml` шаблонам.
- `alias` — алиасы для папок вывода (можно несколько).

---

### 2. Создать шаблон

В указанной папке (например, `./templates/`) создайте файл:

```bash
{componentTemplate}.zgf.yaml
```

Пример:

```bash
ui-component.zgf.yaml
```

---

### 3. Структура `.zgf.yaml`

```yaml
params:
  componentName:
    placeholder: "Введите имя компонента"
    type: string
    default: "MyComponent"
    validator: "UpperCamelCase"

  componentStyleExtension:
    placeholder: "Выберите расширение стилей"
    type: enum
    values:
      - css
      - scss
      - module.scss
      - module.css
    default: "css"

  addPublicApi:
    placeholder: "Добавить публичный Api?"
    type: boolean
    default: true

files:
  - name: "{{=componentName}}.tsx"
    content: |
      import "./{{=componentName}}.{{=componentStyleExtension}}";
      import React from "react";

      interface {{=componentName}}Props {
        children: React.ReactNode;
      }

      const {{=componentName}}: React.FC<{{=componentName}}Props> = ({ children }) => {
        return <div>{children}</div>;
      };

      export default {{=componentName}};

  - name: "{{=componentName}}.{{=componentStyleExtension}}"
    content: ""

  - name: "index.ts"
    when: "{{=addPublicApi}}"
    content: |
    export { default as {{=componentName}} } from "./{{=componentName}}";
```

**Ключевые элементы:**

- `params` — параметры, запрошенные в CLI.
- `files` — файлы, сгенерированные с использованием параметров.
- `{{=paramName}}` — подстановка параметра в имена файлов/содержимое.
- `condition` — создавать файл только если выражение истинно.

#### Хуки (опционально)

Можно запускать команды до/после генерации и для каждого созданного файла через секцию `hooks` в `.zgf.yaml`.

Поддерживаемые хуки:

- `preGenerate` — выполняется до создания любых файлов.
- `afterEach` — выполняется после создания каждого файла. Доп. переменные: `fileName`, `filePath`.
- `postGenerate` — выполняется после создания всех файлов. Доп. переменная: `createdFiles` (JSON-строка массива объектов `{ filename, fullPath }`).

Форматы шагов:

- Строка — интерпретируется как shell-команда.
- Объект — `{ run, cwd?, shell?, continueOnError?, condition?, timeout?, env?, onError? }`

Контекстные переменные в хуках:

- Все ваши `params` (например, `{{=componentName}}`).
- `outputDir` — конечная папка генерации.
- `templateDir` — папка, где лежит `.zgf.yaml`.

Контекст ошибки (доступен внутри `onError` шагов):

- `errorMessage` — текст ошибки
- `exitCode` — код выхода процесса (если есть)
- `stdout` / `stderr` — доступные потоки

Пример:

```yaml
hooks:
  preGenerate:
    - run: "echo Start scaffolding in {{=outputDir}}"

  afterEach:
    - run: "echo Created {{=fileName}} at {{=filePath}}"
    - run: "npx prettier --write {{=filePath}}"
      condition: "{{=addPublicApi}}" # условие (опционально)
      timeout: 20000 # мс (опционально)
      env: # переменные окружения с шаблонами
        COMPONENT: "{{=componentName}}"
        FILE: "{{=fileName}}"
      onError:
        - run: "echo 'Prettier failed for {{=fileName}}: {{=errorMessage}}' >&2"
        - run: "node ./scripts/report-hook-failure.js --file='{{=filePath}}' --code='{{=exitCode}}'"
          cwd: "{{=templateDir}}"
      continueOnError: true

  postGenerate:
    - run: "npx eslint --fix ."
      cwd: "{{=outputDir}}" # рабочая директория команды
      timeout: 30000 # мс (опционально)
      env:
        GEN_OUT_DIR: "{{=outputDir}}"
      onError: "echo 'ESLint failed with code {{=exitCode}}' >&2"
    - run: "node ./scripts/index-files.js --files='{{=createdFiles}}'"
      cwd: "{{=templateDir}}"
      continueOnError: true # не падать, если шаг завершился с ошибкой
```

Заметки:

- По умолчанию `cwd` — `{{=outputDir}}`. Генератор гарантирует, что папка существует до запуска `preGenerate`.
- `shell` по умолчанию `true`, чтобы команды в строковом формате корректно работали кроссплатформенно.
- Если используете инструменты типа `prettier`/`eslint`, убедитесь, что они доступны в целевом проекте (например, установлены локально, чтобы `npx` их нашёл).
- `onError` запускается при падении шага. Если `continueOnError: true`, генерация продолжается после выполнения `onError`; иначе — ошибка пробрасывается после `onError`.
- `condition` управляет выполнением шага. Выражение вычисляется относительно контекста хука.

---

### 4. Генерация компонента

Команда для генерации:

```bash
zgf g ui-component @components
```

- `ui-component` — имя вашего шаблона (файла без расширения `.zgf.yaml`)
- `@components` — алиас папки назначения из `.zgfconfig.json`

Эта комманда сгенерирует компонент в alias папке используя ваш шаблон.

Эта фича в разработке! Если вы столкнулись с проблемой — прошу создать [issue](https://github.com/LAYT73/zero-guess-frontend/issues)

---

## 🏗️ Структура проекта

```bash
├── .github/             # GitHub Actions для деплоя npm
├── bin/                 # Точка входа CLI
├── config/              # Конфигурация для зависимостей (react-router-dom, mobx и т.п.)
├── core/                # Основная логика CLI
│   ├── setup/           # Основные модули
│   └── scaffold/        # Модули генерации (React и т.д.)
├── examples/            # Пример .zgfconfig.json, демонстрационный компонент.zgf.yaml и папка /components
├── helpers/             # Вспомогательные функции
├── parser/              # Парсер Yaml для ваших кастомных компонентов
├── presets/             # Пресеты для инициализации проекта
├── templates/           # Шаблоны проектов (React/FSD, Atomic, пустой, React-Router-Dom, менеджеры состояния)
├── tests/               # Тесты
├── utils/               # Утилиты (fs, запросы пользователя)
├── package.json
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
└── SECURITY.md
```

---

## ❓ FAQ

### ❓ В чем разница между архитектурой FSD и Atomic?

**FSD (Feature-Sliced Design)** ориентирована на масштабируемость и структуру, основанную на предметной области. Идеально подходит для крупных проектов с четким разграничением доменов.
**Atomic Design** ориентирована на UI, разбивая компоненты на атомы, молекулы, организмы и т.д., лучше подходит для дизайн-систем и проектов малого и среднего размера.

---

### ❓ Можно ли использовать этот инструмент с существующим React-проектом?

Не напрямую. `zero-guess-frontend` оптимизирован для инициализации новых проектов с нуля.
Однако вы можете создавать шаблоны и генераторы компонентов для использования в вашем существующем проекте при необходимости.

---

### ❓ Как добавить свои шаблоны компонентов?

1. Добавить `.zgfconfig.json` в корень проекта.
2. Создать файлы `{your-template}.zgf.yaml` в указанной папке.
3. Использовать алиасы для указания папок вывода.
4. Выполнить команду:

   ```bash
   zgf g your-template @yourAlias
   ```

---

### ❓ Какие менеджеры пакетов поддерживаются?

- `npm`
- `yarn`
- `pnpm`

Вы можете выбрать один интерактивно или указать через опцию `--pm`.

---

### ❓ Можно ли использовать JavaScript вместо TypeScript?

Да. Поддерживаются оба варианта — JavaScript и TypeScript. При инициализации проекта используйте опцию `--lang=js`.

---

### ❓ Что если мне не нужен роутинг или менеджер состояния?

Без проблем! Вы можете пропустить их в интерактивной настройке или не указывать флаги `--routing` и `--sm` в CLI.

---

### ❓ Как работают пресеты?

Вы можете сохранить предпочитаемую конфигурацию как **пресет**. Создать его можно командой:

```bash
zgf-preset
```

А затем использовать повторно с помощью:

```bash
zgf --preset=my-preset
```

Пресеты экономят время при повторной настройке.

---

### ❓ Куда сообщать об ошибках или предлагать функции?

Пожалуйста, создавайте issue на [GitHub Issues](https://github.com/LAYT73/zero-guess-frontend/issues).

---

### ❓ Это open-source и под какой лицензией?

Да, это open-source проект под лицензией [MIT License](https://github.com/LAYT73/zero-guess-frontend/blob/main/LICENSE).

---

## 📚 Документация и поддержка

- [Документация](https://layt73.github.io/zero-guess-frontend-docs/)
- [GitHub Репозиторий](https://github.com/LAYT73/zero-guess-frontend)
- [Npm](https://www.npmjs.com/package/zero-guess-frontend)
- [Создать Issue](https://github.com/LAYT73/zero-guess-frontend/issues)

---

## 🧑‍💻 Автор

**Никита Шипилов**
[GitHub](https://github.com/LAYT73)
Лицензия: ISC

---

## 💡 Вклад в развитие

Если этот проект помог вам — можете поставить звезду на репозиторий в GitHub или сделать PR с улучшениями.

Буду рад любой помощи!
